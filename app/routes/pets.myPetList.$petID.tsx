/*ธวัชชัย ครุธนวม 026740491802-6*/
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
}

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    // ตรวจสอบ parameter
    if (!params.petID) {
      throw new Error("Pet ID is missing");
    }

    // ดึงข้อมูลจาก Firestore
    const petDoc = await getDoc(doc(db, "pets", params.petID));

    if (!petDoc.exists()) {
      throw new Error("Pet not found");
    }

    const petData = petDoc.data();
    return json({
      pet: {
        petID: petData.petID,
        petName: petData.petName,
        petPhoto: petData.petPhoto,
        petCategory: petData.petCategory,
        gender: petData.gender,
        birthDate: petData.birthDate,
        description: petData.description,
        ownerName: petData.ownerName,
        ownerEmail: petData.ownerEmail,
      },
      error: null,
    });
  } catch (error) {
    console.error("Error fetching pet:", error);
    return json({
      pet: null,
      error: "Failed to load pet details",
    });
  }
}

export default function PetDetails() {
  const { pet, error } = useLoaderData<typeof loader>();

  // ✅ ตรวจสอบ error ก่อน
  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  // ✅ ตรวจสอบ pet ไม่เป็น null/undefined
  if (!pet) {
    return <div className="text-gray-500 p-4">Pet data not found</div>;
  }

  // ✅ แสดงผลเมื่อมีข้อมูลครบ
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4" id={pet.petID}>
        {pet.petName}
      </h1>
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
    </div>
  );
}
