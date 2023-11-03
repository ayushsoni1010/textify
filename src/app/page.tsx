"use client";

import StatsCTA from "../components/StatsCTA";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import folder from "@/app/assets/folder.svg";
import text from "@/app/assets/text.svg";
import saved from "@/app/assets/saved.svg";
import DataTable from "../components/DataTable";
import TranscriberModal from "../components/TranscriberModal";
import { askGenie } from "../services/askGenie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Home = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [textResult, setTextResult] = useState<string>("");

  const handleClick = async () => {
    setLoading(true);
    console.log("Click");
    const response: string | any = await askGenie(prompt);
    setData(response);
    setLoading(false);
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrompt(e.target.value);
    console.log(prompt);
  };

  useEffect(() => {
    console.log(textResult);
  }, [textResult]);

  return (
    <div className="flex-1 md:flex h-screen relative ml-[270px]">
      <Header />
      <main className="bg-gray-50 py-6 px-9 mt-12 w-full h-fit flex flex-col gap-10">
        <section>
          <div className="user-welcome-wrapper flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-2xl text-black">
                Welcome Shakirat
              </h2>
              <p className="text-gray-600 text-sm">
                Upload your audio and Video to covert to text
              </p>
            </div>
            <TranscriberModal />
          </div>
        </section>
        <section>
          <div className="flex gap-4">
            <StatsCTA
              icon={folder}
              iconName="Folder Icon"
              stats="100"
              description="Uploaded Files"
            />
            <StatsCTA
              icon={text}
              iconName="Text Icon"
              stats="50"
              description="Transcribed"
            />
            <StatsCTA
              icon={saved}
              iconName="Saved Icon"
              stats="20"
              description="Saved"
            />
          </div>
        </section>
        <section>
          <DataTable />
        </section>
        <section>
          <div className="flex flex-col gap-2 justify-center w-full p-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <h1 className="text-2xl font-bold">
              Welcome to Next.js AI Chatbot!
            </h1>
            {loading && (
              <div className="text-center">
                <p>Generating...</p>
                {/* Improve the skeleton loading later */}
                <div className="flex flex-col gap-1 items-center">
                  <Skeleton className="w-[200px] h-[10px] rounded" />
                  <Skeleton className="w-[200px] h-[10px] rounded" />
                  <Skeleton className="w-[200px] h-[10px] rounded" />
                </div>
              </div>
            )}
            <p>
              {data
                ? data
                : "No data to show, ask genie to do some stuff for you :)"}
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type something..."
                className="shadow-sm"
                onChange={handleChange}
              />
              <Button className="bg-[#0048AD]" onClick={handleClick}>
                Generate
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
