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
  FolderIcon,
  TeamIcon,
  Logo,
  HeadsetIcon,
} from "./Icons";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useSidebar();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? (
          <CloseIcon height={24} width={24} />
        ) : (
          <MenuIcon height={24} width={24} />
        )}
      </button>

      <div
        className={clsx(
          "fixed left-0 top-0 h-full bg-slate-400/20 backdrop-blur-md md:translate-x-0 md:z-auto shadow-lg p-3 flex flex-col gap-2 transition-transform",
          mobileMenuOpen ? "translate-x-0 z-40" : "-translate-x-full z-[-1]"
        )}>
        <div className="flex justify-between items-center gap-1 md:mt-0 mt-12 w-full md:mb-4 overflow-hidden">
          <Logo height={35} width={35} />
          <h1 className={"font-semibold text-xl text-center"}>Role Master</h1>
        </div>
        <div className="h-screen flex flex-col justify-between ">
          <div className="">
            <SidebarItem
              href={""}
              label={"Dashboard"}
              icon={<DashboardIcon height={22} width={22} />}
            />
            <SidebarItem
              href={"projects"}
              label={"Projects"}
              icon={<FolderIcon height={22} width={22} />}
            />
            <SidebarItem
              href={"users"}
              label={"Users"}
              icon={<UserIcon height={22} width={22} />}
            />
            <SidebarItem
              href={"teams"}
              label={"Teams"}
              icon={<TeamIcon height={22} width={22} />}
            />
          </div>
          <div className="">
            <SidebarItem
              href={"settings"}
              label={"Settings"}
              icon={<SettingsIcon height={22} width={22} />}
            />
            <SidebarItem
              href={"support"}
              label={"Support"}
              icon={<HeadsetIcon height={22} width={22} />}
            />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}></div>
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
        path === `/${href}` ? "bg-white text-black" : "text-slate-600",
        "flex items-center gap-3 p-2 transition-all rounded-lg"
      )}>
      {icon}
      {label}
    </Link>
  );
};
