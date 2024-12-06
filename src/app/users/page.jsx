"use client";
// search, filter, pagination
import { AddIcon, DeleteIcon, EditIcon } from "../Components/Icons";
import { DeleteModal, EditingModel } from "../Components/Modals";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../Components/SearchBar";
import { usersData } from "../utils/DummyData";
import clsx from "clsx";
function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState("");
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
      setFilteredUsers([
        ...filteredUsers,
        { ...user, id: filteredUsers.length + 1 },
      ]);
      setIsAdding(false);
    } else {
      const updatedUsers = filteredUsers.map((u) =>
        u.id === user.id ? user : u
      );
      setFilteredUsers(updatedUsers);
    }
    setIsEditing(false);
    setEditingUser(null);
  };
  const handleDeleteUser = (userId) => {
    const updatedUsers = filteredUsers.filter((user) => user.id !== userId);
    setFilteredUsers(updatedUsers);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };
  const handleToggleStatus = (userId) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setFilteredUsers(updatedUsers);
  };
  const handleCancel = () => {
    setIsDeleting(false);
    setUserToDelete(null);
  };
  const handleEditCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: editingUser.id,
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
      status: "Active",
    };
    handleSaveUser(user);
  };

  useEffect(() => {
    const searchTerm = search.trim().toLowerCase();
    let result = usersData;
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    }
    setFilteredUsers(result);
  }, [search]);

  return (
    <div className={"p-2 md:ml-44"}>
      <div className="flex justify-between px-4">
        <SearchBar handleSearch={handleSearch} search={search} />
        <button
          onClick={() => {
            setIsAdding(true);
            setIsEditing(true);
            setEditingUser({
              name: "",
              email: "",
              role: "Viewer",
              status: "Active",
            });
          }}
          className="mb-4 flex float-right gap-1 items-center bg-accent text-white px-4 py-2 rounded-full"
        >
          <AddIcon height={20} width={20} />
          Add User
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
                {user.name}
                <dl className="lg:hidden">
                  <dd>{user.email}</dd>
                  <dd className="sm:hidden">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={clsx(
                        "px-2  rounded-full gap-1  font-semibold flex items-center text-white",
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
                      {user.status}
                    </button>
                  </dd>
                </dl>
              </td>
              <td className="px-4 py-2 border-b hidden lg:table-cell">
                {user.email}
              </td>
              <td className="px-4 py-2 border-b">
                <span
                  className={clsx(
                    "px-2 py-1 border-b rounded-full",
                    user.role === "Admin"
                      ? "bg-violet-200 text-violet-700 text-sm font-semibold"
                      : user.role === "Editor"
                      ? "bg-blue-100 text-blue-700 text-sm font-semibold"
                      : "bg-yellow-200 text-yellow-600 text-sm font-semibold"
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
                  onClick={() => handleDeletion(user)}
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
          what={"user"}
          del={"User"}
          handleCancel={handleCancel}
          handleDelete={handleConfirmDeletion}
        />
      )}

      {isEditing && (
        <EditingModel
          role={editingUser.role}
          isAdding={isAdding}
          name={editingUser.name}
          handleSubmit={handleEditSubmit}
          cancel={handleEditCancel}
          email={editingUser.email}
        />
      )}
    </div>
  );
}

export default UserManagement;
