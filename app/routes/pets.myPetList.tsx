import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, replace, useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "~/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { query } from "express";
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

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     const petsCollection = collection(db, "pets");
//     const petsSnapshot = await getDocs(petsCollection);

//     // 2. แก้ไขการ map ข้อมูลให้มีทั้ง id และ petID
//     const petsData = petsSnapshot.docs.map((doc) => ({
//       documentID: doc.id, // Document ID จาก Firestore
//       ...(doc.data() as Pet), // ข้อมูลอื่นๆ รวมถึง petID จากฟิลด์
//     }));
//     return json<LoaderData>({ pets: petsData });
//   } catch (error) {
//     console.error("Error fetching pets:", error);
//     return json<LoaderData>({ pets: [], error: "Failed to load pets" });
//   }
// }

export default function MyPetList() {
  // const { pets, error } = useLoaderData<typeof loader>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchPets() {
      try {
        const petsCollection = collection(db, "pets");
        const petsSnapshot = await getDocs(petsCollection);
        const petsData = petsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Pet),
        }));
        setPets(petsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets");
        setLoading(false);
      }
    }
    fetchPets();
  }, []);
  const navigate = useNavigate();
  const handleDeletePet = async (petID: string) => {
    try {
      if (confirm("Are you sure you want to delete this pet?")) {
        await deleteDoc(doc(db, "pets", petID)); // ลบเอกสาร
        navigate(".", { replace: true });
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-700 font-bold mb-6">Pet List</h1>

      {/* {error && <p className="text-red-500">{error}</p>} */}

      {pets.length === 0 ? (
        <p className="text-center text-gray-500">No pets available.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Birth Date</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Owner</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Actions</th>
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
