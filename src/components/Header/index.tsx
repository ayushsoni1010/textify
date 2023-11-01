import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bell from "@/app/assets/bell.svg";

const Header = () => {
  return (
    <header className="absolute flex justify-between w-full px-9 py-2 bg-white">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[300px] lg:w-[629px] shadow-sm bg-gray-50"
      />
      <div className="flex gap-3 items-center justify-center">
        <div className="p-2 w-10 h-10 rounded-full bg-gray-100">
          <Image src={bell} alt="Bell Icon" className="w-6 h-6" />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
