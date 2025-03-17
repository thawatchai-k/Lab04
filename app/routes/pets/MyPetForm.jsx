import { Form } from "@remix-run/react";

export default function MyPetForm() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Pet</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Pet Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block mb-1">Pet Type</label>
          <select 
            id="type" 
            name="type" 
            className="w-full p-2 border rounded"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Pet
        </button>
      </Form>
    </div>
  );
}