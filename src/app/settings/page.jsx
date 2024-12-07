"use client";
import React, { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "../Components/Icons";
import { DeleteModal, RoleModal, PermissionModal } from "../Components/Modals";
import { toast } from "react-hot-toast";
import clsx from "clsx";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [permission, setPermission] = useState("");
  const [permissionToDel, setPermissionToDel] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleltingPerm, setIsDeletingPerm] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [formData, setFormData] = useState({ roleName: "", permissions: [] });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = () => {
    fetch("http://localhost:3001/roles")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch roles");
        return response.json();
      })
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error fetching roles:", error));
  };

  const fetchPermissions = () => {
    fetch("http://localhost:3001/permissions")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch permissions");
        return response.json();
      })
      .then((data) => setPermissions(data))
      .catch((error) => console.error("Error fetching permissions:", error));
  };

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

  const handleSubmitRole = () => {
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
        toast.success(editingRole ? "Role Updated!" : "Role Added!");
        resetForm();
        setIsRoleModalOpen(false);
      })
      .catch((error) => console.error("Error saving role:", error));
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({ roleName: role.role, permissions: role.permissions });
    setIsRoleModalOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (roleToDelete) {
      fetch(`http://localhost:3001/roles/${roleToDelete}`, { method: "DELETE" })
        .then(() => {
          setRoles((prev) => prev.filter((role) => role.id !== roleToDelete));
          setIsDeletingRole(false);
          setRoleToDelete(null);
          toast.success("Role Deleted!");
        })
        .catch((error) => console.error("Error deleting role:", error));
    } else {
      fetch(`http://localhost:3001/permissions/${permissionToDel}`, {
        method: "DELETE",
      })
        .then(() => {
          setPermissions((prev) =>
            prev.filter((perm) => perm.id !== permissionToDel)
          );
          setPermissionToDel(null);
          setIsDeletingPerm(false);
          toast.success("Permission Deleted!");
        })
        .catch((er) => {
          console.error("Error deleting permission:", er);
          toast.error("Couldn't Delete Permission");
        });
    }
  };

  const handleAddPermission = (newPermission) => {
    fetch("http://localhost:3001/permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ permission: newPermission }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPermissions((prev) => [...prev, data]);
        toast.success("Permission Added!");
        setIsPermissionModalOpen(false);
      })
      .catch((error) => console.error("Error adding permission:", error));
  };

  const resetForm = () => {
    setEditingRole(null);
    setFormData({ roleName: "", permissions: [] });
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-44">
      <div className="mb-4 flex justify-end items-center">
        <button
          onClick={() => setIsRoleModalOpen(true)}
          className="bg-accent flex items-center text-white p-2 rounded-lg"
        >
          <AddIcon height={20} width={20} />
          Add Role
        </button>
        <button
          onClick={() => setIsPermissionModalOpen(true)}
          className="ml-2 flex items-center bg-accent text-white p-2 rounded-lg"
        >
          <AddIcon height={20} width={20} />
          Add Permission
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <table className="w-full sm:w-fit h-fit bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th>Roles</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td>
                  <span
                    className={clsx(
                      "px-2 py-1 border-b rounded-full text-sm font-semibold ",
                      role.role === "Admin"
                        ? "bg-violet-200 text-violet-700"
                        : role.role === "Editor"
                        ? "bg-blue-100 text-blue-700"
                        : role.role === "Viewer"
                        ? "bg-yellow-200 text-yellow-600 "
                        : "bg-slate-700 text-slate-200"
                    )}
                  >
                    {role.role}
                  </span>
                </td>
                <td>{role.permissions.join(", ")}</td>
                <td className="flex gap-2 py-3">
                  <button
                    onClick={() => {
                      setRoleToDelete(role.id);
                      setIsDeletingRole(true);
                    }}
                  >
                    <DeleteIcon height={25} width={25} />
                  </button>
                  <button onClick={() => handleEditRole(role)}>
                    <EditIcon height={25} width={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-full sm:w-fit h-fit p-4 bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id} className="border-t">
                <td>{perm.permission}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setPermissionToDel(perm.id);
                      setIsDeletingPerm(true);
                    }}
                  >
                    <DeleteIcon height={25} width={25} />
                  </button>
                  <button>
                    <EditIcon height={25} width={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isRoleModalOpen && (
        <RoleModal
          editingRole={editingRole}
          formData={formData}
          handleInputChange={handleInputChange}
          permissions={permissions}
          handleSubmit={handleSubmitRole}
          handlePermissionToggle={handlePermissionToggle}
          resetForm={() => {
            setIsRoleModalOpen(false);
            resetForm();
          }}
        />
      )}

      {isPermissionModalOpen && (
        <PermissionModal
          permission={permission}
          cancel={() => setIsPermissionModalOpen(false)}
          handleSubmit={(e) => {
            e.preventDefault();
            handleAddPermission(e.target.name.value);
          }}
        />
      )}

      {(isDeletingRole || isDeleltingPerm) && (
        <DeleteModal
          what={isDeletingRole ? "role" : "permission"}
          del={isDeletingRole ? "Role" : "Permission"}
          handleDelete={handleConfirmDeletion}
          handleCancel={() => {
            if (isDeletingRole) {
              setIsDeletingRole(false);
              setIsDeletingPerm(null);
            } else {
              setIsDeletingPerm(false);
              setIsDeletingRole(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default RoleManagement;
