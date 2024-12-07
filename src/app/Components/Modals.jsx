"use client";
import { useEffect, useState } from "react";
import { WarningIcon } from "./Icons";

export const DeleteModal = ({ del, what, handleDelete, handleCancel }) => {
  return (
    <div className="modal">
      <div className="text-center bg-slate-100 w-fit flex flex-col p-8 items-center justify-center rounded-lg">
        <div className="bg-red-300 rounded-full mb-4 p-4 w-fit">
          <WarningIcon width={50} height={50} />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Delete {del}</h1>
        <p>
          You're going to delete this {what}.
          <br /> Are you sure?
        </p>
        <div className="btns mt-4">
          <button onClick={handleCancel} className="bg-gray-500 btn">
            No
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500  text-nowrap btn"
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
    <div className="modal">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {isAdding ? "Add User" : "Edit User"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" name="name" defaultValue={name} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" defaultValue={email} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              defaultValue={status}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none"
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
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            >
              {roles.map((data) => (
                <option key={data.id} value={data.role}>
                  {data.role}
                </option>
              ))}
            </select>
          </div>
          <div className="btns">
            <button type="button" onClick={cancel} className="bg-gray-500 btn">
              Cancel
            </button>
            <button type="submit" className="bg-accent btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const PermissionModal = ({ permission, cancel, handleSubmit }) => {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-center font-medium text-gray-700">
              Add Permission
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter permission"
              defaultValue={permission}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="btns">
            <button
              type="button"
              onClick={cancel}
              className="bg-gray-500 btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-accent btn"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RoleModal = ({
  editingRole,
  formData,
  handleInputChange,
  permissions,
  handleSubmit,
  handlePermissionToggle,
  resetForm,
}) => {
  return (
    <div className="modal">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-xl text-center font-semibold mb-3">
          {editingRole ? "Edit Role" : "Add Role"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Role Name</label>
            <input
              type="text"
              name="roleName"
              value={formData.roleName}
              onChange={handleInputChange}
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Permissions</label>
            <div className="space-y-2">
              {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`perm-${perm.id}`}
                    checked={formData.permissions.includes(perm.permission)}
                    onChange={() => handlePermissionToggle(perm.permission)}
                  />
                  <label htmlFor={`perm-${perm.id}`} className="ml-2">
                    {perm.permission}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="btns">
            <button onClick={resetForm} className="bg-gray-500 btn">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-accent btn text-nowrap"
            >
              {editingRole ? "Update Role" : "Add Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
