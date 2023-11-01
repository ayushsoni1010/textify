"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const StatsCTA = ({
  icon,
  iconName,
  stats,
  description,
}: {
  icon: any;
  iconName: string;
  stats: string;
  description: string;
}) => {
  return (
    <Card className="p-4 w-full">
      <div className="flex flex-col gap-4 items-start">
        <div className="h-10 w-10 p-2 border border-gray-200 shadow-sm rounded-full">
          <Image src={icon} alt={iconName} className="w-[22px] h-[22px]" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl text-[#344054]">{stats}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCTA;
