"use client";
import React, { useState } from "react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  WarningIcon,
} from "../Components/Icons";
import clsx from "clsx";
import { usersData } from "../utils/DummyData";
import Image from "next/image";

function UserManagement() {
  const [users, setUsers] = useState(usersData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeletion = (user) => {
    setUserToDelete(user);
    setIsDeleting(true);
  };

  const handleConfirmDeletion = () => {
    if (userToDelete) {
      handleDeleteUser(userToDelete.id);
      setUserToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditingUser(user);
  };

  const handleSaveUser = (user) => {
    if (isAdding) {
      setUsers([...users, { ...user, id: users.length + 1 }]);
      setIsAdding(false);
    } else {
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
    }
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setIsAdding(true);
          setIsEditing(true);
          setEditingUser({
            name: "",
            email: "",
            role: "Viewer",
            img:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D",
            status: "Active",
          });
        }}
        className="mb-4 flex float-right gap-1 items-center bg-accent text-white px-4 py-2 rounded-full"
      >
        <AddIcon height={20} width={20} />
        Add User
      </button>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b">
                <div className="flex items-center">
                  <Image
                    src={user.img}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px] mr-2 object-cover"
                  />
                  {user.name}
                </div>
              </td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={clsx(
                    "px-2 py-1 border-b rounded-full",
                    user.role === "Admin"
                      ? "bg-violet-700 text-white"
                      : user.role === "Editor"
                      ? "bg-blue-500 text-white"
                      : "bg-orange-500 text-white"
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={clsx(
                    "px-3 py-1 rounded-full gap-2 flex items-center text-white",
                    user.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500"
                  )}
                >
                  <div
                    className={clsx(
                      "rounded-full size-2",
                      user.status === "Active" ? "bg-green-300" : "bg-red-300"
                    )}
                  ></div>
                  {user.status}
                </button>
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDeletion(user)}
                  className="text-black py-1"
                >
                  <DeleteIcon height={25} width={25} />
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-black px-3 py-1 rounded mr-2"
                >
                  <EditIcon height={25} width={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-center bg-slate-100 w-fit flex flex-col p-8 items-center justify-center rounded-xl">
            <div className="bg-red-300 rounded-full mb-4 p-4 w-fit">
              <WarningIcon width={50} height={50} />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Delete User</h1>
            <p>
              You're going to delete this user.
              <br /> Are you sure?
            </p>
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={() => {
                  setIsDeleting(false);
                  setUserToDelete(null);
                }}
                className="bg-gray-500 text-white px-8 py-2 rounded-full"
              >
                No
              </button>
              <button
                onClick={handleConfirmDeletion}
                className="bg-red-500 text-white px-6 py-2 rounded-full"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">
              {isAdding ? "Add User" : "Edit User"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const user = {
                  id: editingUser.id,
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                  img: ""||null,
                  status: "Active",
                };
                handleSaveUser(user);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingUser.name}
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
                  defaultValue={editingUser.email}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={editingUser.role}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-accent text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAdding(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
