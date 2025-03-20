/*ธวัชชัย ครุธนวม 026740491802-6*/
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Pet {
  id: string;
  petName: string;
  petPhoto?: string;
  petCategory: string;
  gender: string;
  birthDate: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    // ตรวจสอบ parameter
    if (!params.petID) {
      throw new Error("Pet ID is missing");
    }

    // ดึงข้อมูลจาก Firestore โดยใช้ document ID
    const petDoc = await getDoc(doc(db, "pets", params.petID));

    if (!petDoc.exists()) {
      throw new Error("Pet not found");
    }

    const petData = petDoc.data() as Pet;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (
      !petData.petName ||
      !petData.petCategory ||
      !petData.gender ||
      !petData.birthDate ||
      !petData.description ||
      !petData.ownerName ||
      !petData.ownerEmail ||
      !petData.ownerPhone
    ) {
      throw new Error("Incomplete pet data");
    }

    return json({
      pet: petData,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching pet:", error);
    return json({
      pet: null,
      error:
        error instanceof Error ? error.message : "Failed to load pet details",
    });
  }
}

export default function PetDetails() {
  const { pet, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!pet) {
    return <div className="text-gray-500 p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/pets" className="text-blue-500 hover:underline">
        &larr; Back to Pets
      </Link>
      <h1 className="text-2xl font-bold mb-4">{pet.petName}</h1>
      {pet.petPhoto && (
        <img
          src={pet.petPhoto}
          className="w-32 h-32 rounded-full"
          alt={pet.petName}
        />
      )}
      <p>Category: {pet.petCategory}</p>
      <p>Gender: {pet.gender}</p>
      <p>Birth Date: {pet.birthDate}</p>
      <p>Description: {pet.description}</p>
      <p>Owner: {pet.ownerName}</p>
      <p>Email: {pet.ownerEmail}</p>
      <p>Phone: {pet.ownerPhone}</p>
    </div>
  );
}
