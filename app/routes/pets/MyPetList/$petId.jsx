import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { json } from "@remix-run/node";

export async function loader({ params }) {
  const petId = params.petId;
  
  try {
    const petDoc = doc(db, "pets", petId);
    const petSnapshot = await getDoc(petDoc);
    
    if (!petSnapshot.exists()) {
      throw new Error("Pet not found");
    }
    
    return json({ 
      pet: {
        id: petSnapshot.id,
        ...petSnapshot.data(),
        birthdate: petSnapshot.data().birthdate || ""
      }
    });
  } catch (error) {
    return json({ error: "Failed to load pet details" }, { status: 404 });
  }
}

export default function PetDetail() {
  const { pet, error } = useLoaderData();

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link 
          to="/pets/MyPetList" 
          className="text-blue-500 hover:underline"
        >
          Back to Pet List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Details</h1>
      
      <div className="mb-4">
        <Link 
          to="/pets/MyPetList" 
          className="text-blue-500 hover:underline"
        >
          Back to Pet List
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {pet.photoUrl ? (
            <img 
              src={pet.photoUrl} 
              alt={pet.name} 
              className="w-full max-w-md object-cover rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
              No image available
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="font-bold">Name</h2>
            <p>{pet.name}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Birthdate</h2>
            <p>
              {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : "Not specified"}
            </p>
          </div>
          
          <div>
            <h2 className="font-bold">Category</h2>
            <p>{pet.category}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Sex</h2>
            <p>{pet.sex || "Not specified"}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Description</h2>
            <p>{pet.description}</p>
          </div>
          
          <div>
            <h2 className="font-bold">Owner</h2>
            <p>Name: {pet.owner?.name}</p>
            <p>Email: {pet.owner?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
