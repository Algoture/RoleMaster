"use client";
import Link from "next/link";
import { DashboardIcon, LogoutIcon, SettingsIcon, UserIcon } from "./Icons";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = () => {
  const currentPath = usePathname();
  return (
    <div className="py-4 fixed left-0 top-0 flex flex-col h-screen bg-primary2 text-secondary shadow-lg w-56">
      <div className="flex items-center justify-center py-4 text-2xl font-bold">
        <span>Admin Panel</span>
      </div>
      <div className="flex flex-col space-y-2 px-4">
        <SidebarItem
          href="/"
          currentPath={currentPath}
          icon={<DashboardIcon height={25} width={25} />}
          label="Dashboard"
        />
        <SidebarItem
          href="/users"
          currentPath={currentPath}
          icon={<UserIcon height={25} width={25} />}
          label="Users"
        />
        <SidebarItem
          href="/settings"
          currentPath={currentPath}
          icon={<SettingsIcon height={25} width={25} />}
          label="Settings"
        />
        <SidebarItem
          href="/logout"
          currentPath={currentPath}
          icon={<LogoutIcon height={25} width={25} />}
          label="Logout"
        />
        {/* Roles, Permissions remaining.. */}
      </div>
    </div>
  );
};

const SidebarItem = ({
  href,
  currentPath,
  icon,
  label,
  activeClassName = "bg-accent text-white",
  baseClassName = "text-left w-full flex gap-2 items-center py-2 px-4 rounded-md",
}) => {
  return (
    <Link
      href={href}
      className={clsx(currentPath === href && activeClassName, baseClassName)}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Sidebar;
