/*ธวัชชัย ครุธนวม 026740491802-6*/
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react"; // นำเข้า Link สำหรับ navigation และ useNavigate
import { db } from "~/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Firestore methods
import { useEffect, useState } from "react"; // React Hooks

// กำหนด interface สำหรับข้อมูล Pet
interface Pet {
  petID: string;
  petPhoto?: string;
  petName?: string;
  petCategory?: string;
  gender?: string;
  birthDate?: string;
  description?: string;
  ownerName?: string;
  ownerEmail?: string;
}

type LoaderData = {
  pets: Pet[];
  error?: string;
};

// ** หมายเหตุ: ส่วน loader function ถูก comment ไว้เพราะตอนนี้ใช้ client-side fetching แทน **

// Component หลัก
export default function MyPetList() {
  // ใช้ useState สำหรับเก็บข้อมูล pets, loading state และ error state
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect ใช้โหลดข้อมูลเมื่อ component โหลดครั้งแรก
  useEffect(() => {
    async function fetchPets() {
      try {
        // ดึงข้อมูล collection "pets" จาก Firestore
        const petsCollection = collection(db, "pets");
        const petsSnapshot = await getDocs(petsCollection);
        const petsData = petsSnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID จาก Firestore
          ...(doc.data() as Pet), // รวมข้อมูล pet ทั้งหมด
        }));
        setPets(petsData); // เซ็ตข้อมูล
        setLoading(false); // ปิด loading
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets"); // เซ็ต error
        setLoading(false); // ปิด loading
      }
    }
    fetchPets(); // เรียกใช้งาน function
  }, []);

  const navigate = useNavigate(); // สำหรับ redirect หลังจากลบข้อมูล

  // ฟังก์ชันสำหรับลบ pet
  const handleDeletePet = async (petID: string) => {
    try {
      if (confirm("Are you sure you want to delete this pet?")) {
        await deleteDoc(doc(db, "pets", petID)); // ลบเอกสารจาก Firestore
        navigate(".", { replace: true }); // reload หน้า
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  // ส่วนแสดงผล UI
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-700 font-bold mb-6">Pet List</h1>

      {/* กรณี error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* กรณียังโหลดข้อมูลอยู่ */}
      {loading ? (
        <p className="text-center text-gray-500">Loading pets...</p>
      ) : pets.length === 0 ? ( // กรณีไม่มีข้อมูล
        <p className="text-center text-gray-500">No pets available.</p>
      ) : (
        // ตารางแสดงข้อมูล
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left text-white">Photo</th>
                <th className="py-3 px-4 text-left text-white">Name</th>
                <th className="py-3 px-4 text-left text-white">Category</th>
                <th className="py-3 px-4 text-left text-white">Gender</th>
                <th className="py-3 px-4 text-left text-white">Birth Date</th>
                <th className="py-3 px-4 text-left text-white">Description</th>
                <th className="py-3 px-4 text-left text-white">Owner</th>
                <th className="py-3 px-4 text-left text-white">Email</th>
                <th className="py-3 px-4 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-800">
              {pets.map((pet) => (
                <tr key={pet.petID} className="hover:bg-yellow-400">
                  <td className="py-4 px-4">
                    {pet.petPhoto ? (
                      <Link to={`/pets/myPetList/${pet.petID}`}>
                        <img
                          src={pet.petPhoto}
                          alt={pet.petName}
                          className="h-16 w-16 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
                        />
                      </Link>
                    ) : (
                      // กรณีไม่มีรูป
                      <div className="h-16 w-16 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      to={`/pets/myPetList/${pet.petID}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {pet.petName}
                    </Link>
                  </td>
                  <td className="py-4 px-4">{pet.petCategory}</td>
                  <td className="py-4 px-4">{pet.gender}</td>
                  <td className="py-4 px-4">{pet.birthDate}</td>
                  <td className="py-4 px-4">{pet.description}</td>
                  <td className="py-4 px-4">{pet.ownerName}</td>
                  <td className="py-4 px-4">{pet.ownerEmail}</td>
                  <td className="py-4 px-4">
                    {/* ปุ่มลบ */}
                    <button
                      onClick={() => handleDeletePet(pet.petID)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
