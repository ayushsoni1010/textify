"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarOptions } from "@/data/__sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import rocket from "@/app/assets/rocket.svg";
import { Button } from "@/components/ui/button";

const Sidebar: React.FunctionComponent = () => {
  const path = usePathname();

  return (
    <nav className="flex w-[272px] bg-white h-screen p-6 fixed">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl text-[#0048AD] font-bold mt-2 px-6">
            abc firm
          </h1>
          <ul className="px-2 flex flex-col gap-1">
            {sidebarOptions.map((navItem) => {
              return (
                <Link
                  href={navItem.link}
                  key={navItem.key}
                  className={cn(
                    "px-4 py-3 rounded items-center",
                    path === navItem.link
                      ? "bg-[#E0EDFF] shadow-sm border border-[#E0EDFF]"
                      : "hover:bg-[#E0EDFF] hover:shadow-sm"
                  )}
                >
                  <li className="flex gap-3 justify-start items-center">
                    <Image
                      src={navItem.icon}
                      alt={navItem.title}
                      className="w-5 h-5"
                    />
                    <p
                      className={cn(
                        "text-sm",
                        path === navItem.link
                          ? "text-gray-900 font-medium"
                          : "text-gray-700 font-normal "
                      )}
                    >
                      {navItem.title}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="p-4 bg-[#E0EDFF] rounded-md flex flex-col gap-4 items-center justify-center">
          <Image src={rocket} alt="Rocket Icon" className="w-6 h-6" />
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-gray-900 font-semibold text-sm">
              Upgrade Account
            </h3>
            <p className="text-gray-600 text-xs font-normal">
              Access to Unlimited Transcription
            </p>
          </div>
          <Button className="w-full bg-[#0048AD]">Upgrade</Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
