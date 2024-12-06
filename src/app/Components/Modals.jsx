"use client";
import { useEffect, useState } from "react";
import { WarningIcon } from "./Icons";

export const DeleteModal = ({ del, what, handleDelete, handleCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="text-center bg-slate-100 w-fit flex flex-col p-8 items-center justify-center rounded-xl">
        <div className="bg-red-300 rounded-full mb-4 p-4 w-fit">
          <WarningIcon width={50} height={50} />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Delete {del}</h1>
        <p>
          You're going to delete this {what}.
          <br /> Are you sure?
        </p>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-8 py-2 rounded-full"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-full"
          >
            Yes, Delete!
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditingModal = ({
  isAdding,
  name,
  email,
  status,
  role,
  handleSubmit,
  cancel,
}) => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/roles", {})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        return response.json();
      })
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-xl font-semibold mb-4">
          {isAdding ? "Add User" : "Edit User"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              defaultValue={status}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              defaultValue={role}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            >
              {roles.map((data) => (
                <option key={data.id} value={data.role}>
                  {data.role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-full"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={cancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
