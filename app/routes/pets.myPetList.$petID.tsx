import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { db } from "~/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Pet {
  id: string;
  petPhoto?: string;
  petName?: string;
  petCategory?: string;
  gender?: string;
  birthDate?: string;
  description?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

export async function loader({ params }: { params: { petID: string } }) {
  const { petID } = params;
  if (!petID) {
    throw new Response("Pet ID is required", { status: 400 });
  }

  try {
    const petRef = doc(db, "pets", petID);
    const petSnap = await getDoc(petRef);

    if (!petSnap.exists()) {
      throw new Response("Pet not found", { status: 404 });
    }

    const petData = petSnap.data() as Pet; // 🔹 บอก TypeScript ว่านี่คือ Pet
    return json({ pet: { ID: petSnap.id, ...petData } });
  } catch (error) {
    console.error("Error fetching pet details:", error);
    throw new Response("Error loading pet details", { status: 500 });
  }
}
export default function PetDetail() {
  const { pet } = useLoaderData<{ pet: Pet }>(); // ✅ ระบุ Type อย่างชัดเจน

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-700 rounded-xl shadow-lg text-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Pet Photo */}
        {pet.petPhoto && (
          <div className="shrink-0">
            <img
              src={pet.petPhoto}
              alt={pet.petName}
              className="h-48 w-48 object-cover rounded-xl border-4 border-gray-600"
            />
          </div>
        )}

        {/* Pet Details */}
        <div className="space-y-4 flex-1">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">
            {pet.petName}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">ประเภท</p>
              <p className="font-medium">{pet.petCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">เพศ</p>
              <p className="font-medium">{pet.gender}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-400">วันเกิด</p>
              <p className="font-medium">{pet.birthDate}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400">คำอธิบาย</p>
            <p className="font-medium text-gray-300">{pet.description}</p>
          </div>

          <div className="pt-4 border-t border-gray-600">
            <p className="text-3xl text-lime-500 font-bold">
              เจ้าของ {pet.ownerName}
            </p>
            <div className="space-y-1">
              <p className="text-gray-400">📞 {pet.ownerPhone}</p>
              <p className="text-gray-400">✉️ {pet.ownerEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
