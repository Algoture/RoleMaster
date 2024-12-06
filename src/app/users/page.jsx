"use client";

import { AddIcon, DeleteIcon, EditIcon } from "../Components/Icons";
import { DeleteModal, EditingModal } from "../Components/Modals";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../Components/SearchBar";
import { toast } from "react-hot-toast";
import clsx from "clsx";

function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const searchTerm = search.trim().toLowerCase();
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(result);
  }, [search, users]);

  const handleAddUser = () => {
    setIsAdding(true);
    setIsEditing(true);
    setEditingUser({
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    });
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleSaveUser = (user) => {
    if (isAdding) {
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((newUser) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
        })
        .catch((error) => console.error("Error adding user:", error));
      setIsAdding(false);
    } else {
      fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
        })
        .catch((error) => console.error("Error updating user:", error));
    }
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, { method: "DELETE" })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleConfirmDeletion = () => {
    if (userToDelete) {
      handleDeleteUser(userToDelete.id);
      setUserToDelete(null);
      setIsDeleting(false);
      toast.success("User Deleted !");
    }
  };

  const handleToggleStatus = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const updatedStatus = user.status === "Active" ? "Inactive" : "Active";
      handleSaveUser({ ...user, status: updatedStatus });
    }
  };

  return (
    <div className="p-2 md:ml-44">
      <div className="m-4 flex flex-col sm:flex-row sm:flex-wrap  justify-between gap-4 items-center">
        <SearchBar
          handleSearch={(e) => setSearch(e.target.value)}
          search={search}
          className="flex-1 w-full sm:w-auto"
        />
        <button
          onClick={handleAddUser}
          className="flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-full sm:w-auto"
        >
          <AddIcon height={20} width={20} /> Add User
        </button>
      </div>

      <table className="min-w-full shadow-lg rounded-xl table-auto text-left border-collapse">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden lg:table-cell">Email</th>
            <th>Role</th>
            <th className="theader hidden sm:table-cell">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b">
                <div className="flex items-center gap-2">
                  {user.name}
                  <dd className="sm:hidden">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={clsx(
                        "px-2  rounded-full gap-1 size-4  font-semibold flex items-center text-white",
                        user.status === "Active"
                          ? "bg-green-500  "
                          : "bg-red-500"
                      )}
                    >
                      <div
                        className={clsx(
                          "rounded-full size-2",
                          user.status === "Active"
                            ? "bg-green-300"
                            : "bg-red-300"
                        )}
                      ></div>
                    </button>
                  </dd>
                </div>
                <dl className="lg:hidden">
                  <dd>{user.email}</dd>
                </dl>
              </td>
              <td className="px-4 py-2 border-b hidden lg:table-cell">
                {user.email}
              </td>
              <td className="px-4 py-2 border-b">
                <span
                  className={clsx(
                    "px-2 py-1 border-b rounded-full text-sm font-semibold",
                    user.role === "Admin"
                      ? "bg-violet-200 text-violet-700"
                      : user.role === "Editor"
                      ? "bg-blue-100 text-blue-700"
                      : user.role === "Viewer"
                      ? "bg-yellow-200 text-yellow-600 "
                      : "bg-slate-700 text-white"
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-2 border-b hidden sm:table-cell">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={clsx(
                    "px-3 py-1 rounded-full gap-2 text-sm font-semibold flex items-center text-white",
                    user.status === "Active" ? "bg-green-500  " : "bg-red-500"
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
              <td className="border-b">
                <button
                  onClick={() => setUserToDelete(user) || setIsDeleting(true)}
                  className="text-black py-1 hover:transition-transform"
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
        <DeleteModal
          what="user"
          del={"User"}
          handleCancel={() => setIsDeleting(false)}
          handleDelete={handleConfirmDeletion}
        />
      )}

      {isEditing && (
        <EditingModal
          isAdding={isAdding}
          name={editingUser.name}
          email={editingUser.email}
          role={editingUser.role}
          status={editingUser.status}
          handleSubmit={(e) => {
            e.preventDefault();
            const user = {
              id: editingUser.id,
              name: e.target.name.value,
              email: e.target.email.value,
              role: e.target.role.value,
              status: e.target.status.value,
            };
            handleSaveUser(user);
          }}
          cancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default UserManagement;
