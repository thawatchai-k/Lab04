/*ธวัชชัย ครุธนวม 026740491802-6*/
// ===== Import Dependencies =====
import { Form, useActionData, useNavigation, json } from "@remix-run/react"; // Remix utilities สำหรับ form และการนำทาง
import React, { useState, useRef } from "react"; // React hooks
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage สำหรับอัพโหลดไฟล์
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"; // Firestore สำหรับเพิ่มเอกสาร
import { storage, db } from "~/lib/firebase"; // เชื่อมต่อ Firebase config

// ===== TypeScript Interface สำหรับข้อมูล Pet =====
interface PetData {
  petID?: string;
  petName: string;
  birthDate: string;
  petCategory: string;
  gender: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  petPhoto: string;
}

// ===== Functional Component =====
const MyPetForm = () => {
  // ======= ใช้ ActionData เพื่อตรวจสอบ error/success =======
  const actionData = useActionData<{ error?: string; success?: boolean }>();

  // ======= ใช้ Navigation เพื่อตรวจสอบสถานะฟอร์ม =======
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // ======= State สำหรับจัดการรูปภาพและข้อมูล =======
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview รูป
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // URL หลัง upload
  const [isUploading, setIsUploading] = useState(false); // สถานะ upload
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error Message (ยังไม่ใช้จริงจัง)

  // ======= Refs =======
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref สำหรับ input file
  const formRef = useRef<HTMLFormElement>(null); // Ref สำหรับฟอร์ม (ใช้ reset)

  // ======= Phone Number State & Validation =======
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // ======= จัดการการเปลี่ยนแปลงหมายเลขโทรศัพท์ =======
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // เอาเฉพาะตัวเลขสูงสุด 10 หลัก
    setPhoneNumber(value);
    setPhoneError(
      value.length > 0 && value.length < 10
        ? "Phone number must be 10 digits"
        : null
    );
  };

  // ======= จัดรูปแบบหมายเลขโทรศัพท์ (XXX-XXX-XXXX) =======
  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  };

  // ======= ล้างรูปภาพที่เลือก =======
  const handleClearImage = () => {
    setImagePreview(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ======= จัดการ Submit ฟอร์ม =======
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ===== สร้าง Object PetData =====
    const petData: PetData = {
      petName: event.currentTarget.petName.value,
      birthDate: event.currentTarget.birthDate.value,
      petCategory: event.currentTarget.petCategory.value,
      gender: event.currentTarget.gender.value,
      description: event.currentTarget.description.value,
      ownerName: event.currentTarget.ownerName.value,
      ownerEmail: event.currentTarget.ownerEmail.value,
      ownerPhone: phoneNumber,
      petPhoto: uploadedImageUrl || "",
    };

    try {
      // ===== เพิ่มข้อมูล Pet ไปยัง Firestore =====
      const docRef = await addDoc(collection(db, "pets"), petData);

      // ===== อัปเดตเอกสาร เพิ่ม petID =====
      await updateDoc(docRef, {
        petID: docRef.id,
      });

      // ===== Reset Form และ State ต่าง ๆ =====
      formRef.current?.reset();
      setImagePreview(null);
      setUploadedImageUrl(null);
      setPhoneNumber("");
      setPhoneError(null);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Add New Pet
      </h1>

      {/* ====== แสดง Error หรือ Success Message ====== */}
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {actionData.error}
        </div>
      )}
      {actionData?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Pet added successfully!
        </div>
      )}

      {/* ====== ฟอร์มสำหรับกรอกข้อมูล ====== */}
      <Form
        method="post"
        className="space-y-6"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        ref={formRef} // ใช้สำหรับ reset
      >
        <input type="hidden" name="imageUrl" value={uploadedImageUrl || ""} />

        {/* ======= ส่วนกรอกข้อมูลสัตว์ ======= */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Pet Information
          </h2>

          {/* ======= ฟิลด์ข้อมูลสัตว์ ======= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pet Name */}
            <div>
              <label htmlFor="petName" className="block mb-2 font-medium text-gray-700">
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block mb-2 font-medium text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Pet Category */}
            <div>
              <label htmlFor="petCategory" className="block mb-2 font-medium text-gray-700">
                Pet Category
              </label>
              <select
                id="petCategory"
                name="petCategory"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a category</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-800">
                  <input type="radio" name="gender" value="Male" className="mr-2" required />
                  Male
                </label>
                <label className="flex items-center text-gray-800">
                  <input type="radio" name="gender" value="Female" className="mr-2" required />
                  Female
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter a description about your pet"
              />
            </div>

            {/* Owner Name */}
            <div className="md:col-span-2">
              <label htmlFor="ownerName" className="block mb-2 font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Owner Email */}
            <div className="md:col-span-2">
              <label htmlFor="ownerEmail" className="block mb-2 font-medium text-gray-700">
                Owner Email
              </label>
              <input
                type="text"
                id="ownerEmail"
                name="ownerEmail"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Owner Phone */}
            <div className="md:col-span-2">
              <label htmlFor="ownerPhone" className="block mb-2 font-medium text-gray-700">
                Owner Phone
              </label>
              <input
                type="tel"
                id="ownerPhone"
                name="ownerPhone"
                placeholder="Enter phone number"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>
          </div>
        </div>

        {/* ======= ปุ่ม Submit และ Reset ======= */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isUploading || !!phoneError}
            className="px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            {isSubmitting
              ? "Submitting..."
              : isUploading
              ? "Uploading Image..."
              : "Submit"}
          </button>
          <button
            type="reset"
            onClick={handleClearImage}
            className="px-6 py-3 ml-4 bg-yellow-400 text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </Form>
    </div>
  );
};

export default MyPetForm;
