import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { json } from "@remix-run/node";

export async function loader() {
  try {
    const petsCollection = collection(db, "pets");
    const petsSnapshot = await getDocs(petsCollection);
    const petsList = petsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      birthdate: doc.data().birthdate || ""
    }));
    
    return json({ pets: petsList });
  } catch (error) {
    return json({ pets: [], error: "Failed to load pets" });
  }
}

export default function MyPetList() {
  const { pets, error } = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet List</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <Link 
          to="/pets/MyPetForm" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add new pet
        </Link>
      </div>
      
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Photo</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Birthdate</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Sex</th>
            <th className="border p-2">Owner Name</th>
            <th className="border p-2">Owner E-mail</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.length === 0 ? (
            <tr>
              <td colSpan="8" className="border p-2 text-center">No pets found</td>
            </tr>
          ) : (
            pets.map(pet => (
              <tr key={pet.id}>
                <td className="border p-2">
                  {pet.photoUrl ? (
                    <img 
                      src={pet.photoUrl} 
                      alt={pet.name} 
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                      No image
                    </div>
                  )}
                </td>
                <td className="border p-2">{pet.name}</td>
                <td className="border p-2">
                  {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : ""}
                </td>
                <td className="border p-2">{pet.category}</td>
                <td className="border p-2">{pet.sex}</td>
                <td className="border p-2">{pet.owner?.name}</td>
                <td className="border p-2">{pet.owner?.email}</td>
                <td className="border p-2">
                  <Link 
                    to={`/pets/MyPetList/${pet.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    [View]
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}