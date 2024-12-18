"use client";

import { AddIcon, DeleteIcon, EditIcon, SortIcon } from "../Components/Icons";
import { DeleteModal, EditingModal } from "../Components/Modals";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../Components/SearchBar";
import { toast } from "sonner";
import clsx from "clsx";
import { roleStyles } from "../util";
function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [userToDelete, setUserToDelete] = useState(null);
  const statusOrder = { Active: 1, Inactive: 2 };

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
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error(`Failed to fetch users`);
        toast.error(`Maybe Server is offline`);
      });
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

  const sortUsersByStatus = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortDirection === "asc") {
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      } else {
        return (statusOrder[b.status] || 0) - (statusOrder[a.status] || 0);
      }
    });
    setFilteredUsers(sortedUsers);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleAddUser = () => {
    setIsAdding(true);
    setIsEditing(true);
    setEditingUser({
      name: "",
      email: "",
      role: "",
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
          toast.success(`User ${newUser.name} Added!`);
          setUsers((prevUsers) => [...prevUsers, newUser]);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          toast.error(`Failed to add user`);
        });
      setIsAdding(false);
    } else {
      fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          toast.success(`User ${updatedUser.name} updated!`);
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          toast.error(`Failed to update user`);
        });
    }
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, { method: "DELETE" })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error(`Failed to delete user`);
      });
  };

  const handleConfirmDeletion = () => {
    if (userToDelete) {
      handleDeleteUser(userToDelete.id);
      setUserToDelete(null);
      setIsDeleting(false);
      toast.success(`User ${userToDelete.name} Deleted`);
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
    <div className="p-4 md:ml-44">
      <div className="flex items-center gap-2 justify-between">
        <SearchBar
          placeholder={"Search by name or email.."}
          handleSearch={(e) => setSearch(e.target.value)}
          search={search}
        />
        <button
          onClick={handleAddUser}
          className="flex items-center text-nowrap justify-center gap-2 shadow-sh bg-primary px-4 py-2 rounded-lg 
              sm:ml-auto sm:mr-0 mx-auto sm:static"
        >
          <AddIcon height={20} width={20} /> Add User
        </button>
      </div>

      <table className="min-w-full bg-clip-border shadow-md rounded-lg mt-2 table-auto text-left border-collapse">
        <thead className="bg-thead">
          <tr>
            <th className="rounded-tl-lg ">Name</th>
            <th className="hidden lg:table-cell">Email</th>
            <th>Role</th>
            <th className="theader hidden sm:table-cell ">
              <div className="flex items-center gap-1">
                Status
                <button onClick={sortUsersByStatus}>
                  <SortIcon height={20} width={20} asc={sortDirection} />
                </button>
              </div>
            </th>
            <th className="rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3 border-b-2">
                <div className="flex items-center gap-2">
                  <p>{user.name}</p>
                  <dd className="sm:hidden">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={clsx(
                        "px-2  rounded-full gap-1 size-4  font-semibold flex items-center text-white",
                        user.status === "Active"
                          ? "bg-green-500  "
                          : "bg-red-500"
                      )}
                    ></button>
                  </dd>
                </div>
                <dl className="lg:hidden">
                  <dd>{user.email}</dd>
                </dl>
              </td>
              <td className="px-4 py-3 border-b-2 hidden lg:table-cell">
                {user.email}
              </td>
              <td className="px-4 py-2 border-b-2">
                <span
                  className={clsx(
                    "px-2 py-1 border-b rounded-full text-sm font-semibold",
                    roleStyles[user.role]
                      ? `${roleStyles[user.role].bg} ${
                          roleStyles[user.role].text
                        }`
                      : `${roleStyles.Default.bg} ${roleStyles.Default.text}`
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-2 py-1 border-b-2 hidden sm:table-cell">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={clsx(
                    "px-2 py-1 rounded-full gap-2 text-sm font-semibold flex items-center text-white",
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
              <td className="border-b-2 flex gap-2 py-3">
                <div className="has-tooltip">
                  <button
                    className="text-red-500"
                    onClick={() => setUserToDelete(user) || setIsDeleting(true)}
                  >
                    <DeleteIcon height={25} width={25} />
                  </button>
                  <span className="tooltip rounded shadow-sh py-1 px-2 bg-slate-900 text-white -mt-9 -ml-2">
                    Delete User
                  </span>
                </div>
                <div className="has-tooltip">
                  <button onClick={() => handleEditUser(user)}>
                    <EditIcon height={25} width={25} />
                  </button>
                  <span className="tooltip rounded shadow-lg py-1 px-2 bg-slate-900 text-white -mt-9 -ml-8">
                    Edit User
                  </span>
                </div>
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
