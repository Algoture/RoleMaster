"use client";

import { useEffect, useState } from "react";
import { roleStyles } from "./util";
import clsx from "clsx";

export default function Home() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((er) => console.log("Error fetching users", er));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/roles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        return response.json();
      })
      .then((data) => {
        setRoles(data);
      })
      .catch((er) => console.log("Error fetching roles", er));
  }, []);
  const totalActiveUsers = data.filter(
    (user) => user.status === "Active"
  ).length;
  const totalInActiveUsers = data.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div className="p-4 md:ml-44">
      <div className="flex flex-wrap md:mt-0 mt-12 justify-around gap-4 bg-gray-50 rounded-lg ">
        <div className="statsDiv">
          <h3 className="statsH3">Total Users</h3>
          <p className="statsP text-accent">{data.length}</p>
        </div>
        <div className="statsDiv">
          <h3 className="statsH3">Active Users</h3>
          <p className="statsP text-green-600">{totalActiveUsers}</p>
        </div>
        <div className="statsDiv">
          <h3 className="statsH3">Inactive Users</h3>
          <p className="statsP text-red-600 text-nowrap">
            {totalInActiveUsers}
          </p>
        </div>
        <div className="statsDiv">
          <h3 className="statsH3">Total Roles</h3>
          <p className="statsP text-accent">{roles.length}</p>
        </div>
      </div>

      <div className="mt-4 ">
        <table className="min-w-full bg-clip-border shadow-lg rounded-lg mt-2 table-auto text-left border-collapse">
          <thead>
            <tr>
              <th className="rounded-tl-lg">Role</th>
              <th>Users Count</th>
              <th className="  rounded-tr-lg">Permissions Count</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rolesData) => {
              const count = data.filter(
                (user) => user.role === rolesData.role
              ).length;

              const permissionCount = rolesData.permissions.length;
              return (
                <tr key={rolesData.id}>
                  <td className="statsTD">
                    <span
                      className={clsx(
                        "px-2 py-1 border-b rounded-full text-sm font-semibold",
                        roleStyles[rolesData.role]
                          ? `${roleStyles[rolesData.role].bg} ${
                              roleStyles[rolesData.role].text
                            }`
                          : `${roleStyles.Default.bg} ${roleStyles.Default.text}`
                      )}
                    >
                      {rolesData.role}
                    </span>
                  </td>
                  <td className="statsTD">
                    <span className="text-lg ">{count}</span>
                  </td>
                  <td className="statsTD">
                    <span className="text-lg ">{permissionCount}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
