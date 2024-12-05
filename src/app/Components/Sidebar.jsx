"use client";
import Link from "next/link";
import {
  DashboardIcon,
  LeftSideIcon,
  LogoutIcon,
  RightSideIcon,
  SettingsIcon,
  UserIcon,
  HamburguerIcon,
  CloseIcon,
} from "./Icons";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useContext, createContext, useState } from "react";

export const SideBarContext = createContext();
export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white  rounded-full"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <CloseIcon height={24} width={24} />
        ) : (
          <HamburguerIcon height={24} width={24} />
        )}
      </button>

      <div
        className={clsx(
          "fixed left-0 top-0 h-screen bg-white shadow-lg p-4 flex flex-col gap-2 transition-transform",
          mobileMenuOpen ? "translate-x-0 z-40" : "-translate-x-full z-[-1]",
          expanded ? "w-64" : "w-16",
          "md:translate-x-0 md:z-auto md:w-auto"
        )}
      >
        <div className="flex justify-between items-center w-full gap-5 mb-4 overflow-hidden">
          <h1
            className={clsx(
              "font-bold text-2xl text-center text-nowrap",
              expanded ? "" : "sr-only"
            )}
          >
            Admin Panel
          </h1>

          <button
            className={clsx(expanded ? "" : "ml-1.5")}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? (
              <LeftSideIcon height={30} width={30} />
            ) : (
              <RightSideIcon height={30} width={30} />
            )}
          </button>
        </div>
        <SideBarContext.Provider value={{ expanded }}>
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
          <SidebarItem
            href={"logout"}
            label={"Logout"}
            icon={<LogoutIcon height={25} width={25} />}
          />
        </SideBarContext.Provider>
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
  const { expanded } = useContext(SideBarContext);
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
      {expanded && <span>{label}</span>}
    </Link>
  );
};
