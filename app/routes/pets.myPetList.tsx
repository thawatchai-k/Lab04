/*ธวัชชัย ครุธนวม 026740491802-6*/
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "~/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

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

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const petsCollection = collection(db, "pets");
    const petsSnapshot = await getDocs(petsCollection);

    const petsData = petsSnapshot.docs.map((doc) => {
      const petData = doc.data() as Pet;
      return {
        ...petData, // ดึงข้อมูล pet ทั้งหมด
        petID: doc.id, // กำหนด petID จาก Firestore (ต้องทำหลังจาก spread)
      };
    });

    return json<LoaderData>({ pets: petsData });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return json<LoaderData>({ pets: [], error: "Failed to load pets" });
  }
}

export default function MyPetList() {
  const { pets: initialPets, error: loaderError } =
    useLoaderData<typeof loader>();
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(loaderError || null);
  const navigate = useNavigate();

  const handleDeletePet = async (petID: string) => {
    try {
      if (confirm("Are you sure you want to delete this pet?")) {
        await deleteDoc(doc(db, "pets", petID)); // 🔹 ใช้ `id` แทน `petID`
        setPets((prevPets) => prevPets.filter((pet) => pet.petID !== petID)); // อัปเดต state
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      setError("Failed to delete pet");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-700 font-bold mb-6">Pet List</h1>

      {error && <p className="text-red-500">{error}</p>}

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
