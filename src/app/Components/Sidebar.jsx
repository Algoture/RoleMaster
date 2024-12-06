"use client";

import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";
import clsx from "clsx";
import {
  DashboardIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
} from "./Icons";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useSidebar();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <CloseIcon height={24} width={24} />
        ) : (
          <MenuIcon height={24} width={24} />
        )}
      </button>

      <div
        className={clsx(
          "fixed left-0 top-0 h-screen bg-white md:translate-x-0 md:z-auto md:w-auto shadow-lg p-4 flex flex-col gap-2 transition-transform",
          mobileMenuOpen ? "translate-x-0 z-40" : "-translate-x-full z-[-1]"
        )}
      >
        <div className="flex justify-between items-center w-full gap-5 mb-4 overflow-hidden">
          <h1 className={"font-bold text-2xl text-center"}>Admin Panel</h1>
        </div>
        <SidebarItem
          href={""}
          label={"Dashboard"}
          icon={<DashboardIcon height={25} width={25} />}
        />
        <SidebarItem
          href={"users"}
          label={"Users"}
          icon={<UserIcon height={25} width={25} />}
        />
        <SidebarItem
          href={"settings"}
          label={"Settings"}
          icon={<SettingsIcon height={25} width={25} />}
        />
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

const SidebarItem = ({ href, label, icon }) => {
  const path = usePathname();

  return (
    <Link
      href={`/${href}`}
      className={clsx(
        path === `/${href}` ? "bg-accent text-white" : "",
        "flex items-center gap-2 p-2 transition-all rounded-xl"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
