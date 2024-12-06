"use client";
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../Components/Icons";
import { DeleteModal } from "../Components/Modals";
import { toast } from "react-hot-toast";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [formData, setFormData] = useState({ roleName: "", permissions: [] });

  useEffect(() => {
    fetch("http://localhost:3001/roles")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch roles");
        return response.json();
      })
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error fetching roles:", error));

    fetch("http://localhost:3001/permissions")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch permissions");
        return response.json();
      })
      .then((data) => setPermissions(data))
      .catch((error) => console.error("Error fetching permissions:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: isSelected
          ? prev.permissions.filter((perm) => perm !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const handleSubmit = () => {
    const method = editingRole ? "PUT" : "POST";
    const url = editingRole
      ? `http://localhost:3001/roles/${editingRole.id}`
      : "http://localhost:3001/roles";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: formData.roleName,
        permissions: formData.permissions,
      }),
    })
      .then((response) => response.json())
      .then((updatedRole) => {
        if (editingRole) {
          setRoles((prev) =>
            prev.map((role) =>
              role.id === updatedRole.id ? updatedRole : role
            )
          );
        } else {
          setRoles((prev) => [...prev, updatedRole]);
        }
        toast.success("Role Updated !");
        resetForm();
      })
      .catch((error) => console.error("Error saving role:", error));
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({ roleName: role.role, permissions: role.permissions });
  };

  const handleConfirmDeletion = () => {
    if (roleToDelete) {
      handleDelete(roleToDelete);
      setIsDeletingRole(false);
      setRoleToDelete(null);
    }
    toast.success("Role Deleted !");
  };
  const handleDelete = (roleId) => {
    fetch(`http://localhost:3001/roles/${roleId}`, { method: "DELETE" })
      .then(() => {
        setRoles((prev) => prev.filter((role) => role.id !== roleId));
      })
      .catch((error) => console.error("Error deleting role:", error));
  };

  const resetForm = () => {
    setEditingRole(null);
    setFormData({ roleName: "", permissions: [] });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-44 sm:mt-4">
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
              <td className="px-4 py-2">{role.role}</td>
              <td className="px-4 py-2">{role.permissions.join(", ")}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="text-black px-3 py-1 rounded mr-2"
                >
                  <EditIcon height={25} width={25} />
                </button>
                <button
                  onClick={() =>
                    setRoleToDelete(role.id) || setIsDeletingRole(true)
                  }
                  className="text-black py-1"
                >
                  <DeleteIcon height={25} width={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 bg-white p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold mb-3">
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
              className="w-full p-2 border border-gray-300 rounded"
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

          <button
            onClick={handleSubmit}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary"
          >
            {editingRole ? "Update Role" : "Add Role"}
          </button>
          {editingRole && (
            <button
              onClick={resetForm}
              className="ml-4 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {isDeletingRole && (
        <DeleteModal
          what={"role"}
          del={"Role"}
          handleDelete={handleConfirmDeletion}
          handleCancel={() => setIsDeletingRole(false)}
        />
      )}
    </div>
  );
};

export default RoleManagement;
