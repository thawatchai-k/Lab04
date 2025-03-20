import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="container mx-auto p-4 bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Pet Hospital Management</h1>
      <nav className="flex gap-4">
        <Link
          to="/pets/MyPetForm"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Pet
        </Link>
        <Link
          to="/pets/MyPetList"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Pet List
        </Link>
      </nav>
    </div>
  );
}
