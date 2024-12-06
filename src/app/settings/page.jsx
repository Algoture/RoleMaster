"use client";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../Components/Icons";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      roleName: "Admin",
      permissions: ["Read", "Write", "Delete"],
    },
    {
      id: 2,
      roleName: "Editor",
      permissions: ["Read", "Write"],
    },
  ]);

  const [permissions] = useState([
    "Read",
    "Write",
    "Delete",
    "Manage Users",
    "Manage Roles",
  ]);
  const [formData, setFormData] = useState({ roleName: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "permissions") {
      setFormData((prev) => ({
        ...prev,
        permissions: checked
          ? [...prev.permissions, value]
          : prev.permissions.filter((perm) => perm !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (editingRole !== null) {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === editingRole ? { ...role, ...formData } : role
        )
      );
    } else {
      setRoles((prev) => [...prev, { id: prev.length + 1, ...formData }]);
    }
    setFormData({ roleName: "", permissions: [] });
    setEditingRole(null);
  };

  const handleEdit = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setFormData({ roleName: role.roleName, permissions: role.permissions });
      setEditingRole(roleId);
    }
  };

  const handleDelete = (roleId) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };
  return (
    <div className={"p-6 bg-gray-100 min-h-screen md:ml-44 sm:mt-4"}>
      <div className="mb-6 bg-white p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold mb-3">
          {editingRole ? "Edit Role" : "Add Role"}
        </h3>
        <div className="space-y-4 ">
          <div>
            <label className="block font-medium mb-1">Role Name</label>
            <input
              type="text"
              name="roleName"
              value={formData.roleName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Permissions</label>
            <div className="space-y-2">
              {permissions.map((perm) => (
                <div key={perm} className="flex items-center">
                  <input
                    type="checkbox"
                    name="permissions"
                    value={perm}
                    checked={formData.permissions.includes(perm)}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary"
          >
            {editingRole ? "Update Role" : "Add Role"}
          </button>
        </div>
      </div>

      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-t">
              <td className="px-4 py-2">{role.roleName}</td>
              <td className="px-4 py-2">{role.permissions.join(", ")}</td>
              <td className="">
                <button
                  onClick={() => handleDelete(role.id)}
                  className="text-black py-1"
                >
                  <DeleteIcon height={25} width={25} />
                </button>
                <button
                  onClick={() => handleEdit(role.id)}
                  className="text-black px-3 py-1 rounded mr-2"
                >
                  <EditIcon height={25} width={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
