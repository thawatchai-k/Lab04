import { Form, useActionData, useNavigation, json } from "@remix-run/react";
import React, { useState, useRef } from "react";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebase";

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

const MyPetForm = () => {
  const actionData = useActionData<{ error?: string; success?: boolean }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(value);
    setPhoneError(
      value.length > 0 && value.length < 10
        ? "Phone number must be 10 digits"
        : null
    );
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      const docRef = await addDoc(collection(db, "pets"), petData);
      await updateDoc(docRef, { petID: docRef.id });

      setSuccessMessage("เพิ่มข้อมูลเรียบร้อยแล้ว! 🎉");

      formRef.current?.reset();
      setImagePreview(null);
      setUploadedImageUrl(null);
      setPhoneNumber("");
      setPhoneError(null);

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error adding pet:", error);
      setErrorMessage("เกิดข้อผิดพลาดในการเพิ่มข้อมูล ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Add New Pet
      </h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <Form
        ref={formRef}
        method="post"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Pet Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="petName"
                className="block mb-2 font-medium text-gray-700"
              >
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                required
              />
            </div>

            <div>
              <label
                htmlFor="birthDate"
                className="block mb-2 font-medium text-gray-700"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                required
              />
            </div>

            <div>
              <label
                htmlFor="petCategory"
                className="block mb-2 font-medium text-gray-700"
              >
                Pet Category
              </label>
              <select
                id="petCategory"
                name="petCategory"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
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

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-800">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="mr-2"
                    required
                  />
                  Male
                </label>
                <label className="flex items-center text-gray-800">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="mr-2"
                    required
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                placeholder="Enter a description about your pet"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="ownerName"
                className="block mb-2 font-medium text-gray-700"
              >
                OwnerName
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="ownerEmail"
                className="block mb-2 font-medium text-gray-700"
              >
                OwnerEmail
              </label>
              <input
                type="text"
                id="ownerEmail"
                name="ownerEmail"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="ownerPhone"
                className="block mb-2 font-medium text-gray-700"
              >
                Owner Phone
              </label>
              <input
                type="tel"
                id="ownerPhone"
                name="ownerPhone"
                placeholder="Enter phone number"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !!phoneError}
            className="px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="reset"
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
