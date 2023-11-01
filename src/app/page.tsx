import StatsCTA from "@/components/StatsCTA";
import Header from "@/components/Header";
import React from "react";
import folder from "@/app/assets/folder.svg";
import text from "@/app/assets/text.svg";
import saved from "@/app/assets/saved.svg";
import DataTable from "@/components/DataTable";
import TranscriberModal from "@/components/TranscriberModal";
import { askGenie } from "@/services/askGenie";

const Home = () => {
  // askGenie();

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
      </main>
    </div>
  );
};

export default Home;
