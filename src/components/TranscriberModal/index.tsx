"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

const TranscriberModal = ({
  text,
  setText,
  loading,
  setLoading,
}: {
  text: string;
  setText: any;
  loading: boolean;
  setLoading: any;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(_fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      console.log("Selected file");
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("model", "whisper-1");
      data.append("language", "en");
      setFormData(data);
      console.log(formData, "formData");
      console.log(selectedFile, "selectedFile");
      console.log(text, "text");
    }
  }, [selectedFile]);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submit");

    if (!selectedFile && files.length === 0) {
      console.log("No files selected");
      setLoading(false);
      return new Error("Please select a file to transcibe");
    }

    try {
      console.log("Fetching audio");

      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setText(data.text);
        setLoading(false);
        console.log("response is okay now waiting for response");
      } else {
        // Handle the error here
        console.error("Error occurred during conversion");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button className="bg-[#0048AD] px-6 py-4">Transcribe file</Button>
      </ModalTrigger>
      <ModalContent className="py-10 px-12 w-12">
        <ModalHeader className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <ModalTitle>Transcribe File</ModalTitle>
            <ModalCancel>&#x2715;</ModalCancel>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid w-full items-center gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Transcription Language
              </label>
              <Input type="email" id="email" placeholder="Default" />
            </div>
            <div className="max-w-2xl">
              <form
                onDragEnter={handleDragEnter}
                onSubmit={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
              >
                <div
                  className="flex justify-center w-full transition bg-white border-2 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-300 focus:outline-none px-4 py-10"
                  onClick={openFileExplorer}
                >
                  <span className="flex flex-col justify-center items-center gap-4">
                    <span className="w-12 h-12 p-3 rounded-full bg-[#E0EDFF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#0048AD"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </span>
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-semibold text-sm text-[#0048AD]">
                        Click to upload
                        <span className="text-gray-600 text-sm font-normal">
                          {" "}
                          or drag and drop
                        </span>
                      </span>
                      <span className="text-center mt-0.5">
                        <p className="text-gray-400 text-xs">
                          The maximum file size is 1GB for audio and 10GB for
                          videos.
                        </p>
                        <p className="text-gray-400 text-xs">
                          Supported formats: mp3, mp4, wav, caf, aiff, avi,
                          rmvb, flv, m4a, mov, wmv, wma
                        </p>
                      </span>
                      {selectedFile && (
                        <p className="mt-4 text-sm">{selectedFile?.name}</p>
                      )}
                      {files.length > 0 && (
                        <div className="flex flex-col items-center p-3">
                          {files.map((file: any, idx: number) => (
                            <div key={idx} className="flex flex-row space-x-5">
                              <span>{file.name}</span>
                              <span
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeFile(file.name, idx)}
                              >
                                remove
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </span>
                </div>
                <Input
                  className="hidden"
                  type="file"
                  name="audio"
                  accept="audio/*"
                  ref={inputRef}
                  multiple={true}
                  onChange={handleFileChange}
                />
              </form>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Import from Link
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Paste a Drobpox, Google Drive or Youtube URL here"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="speaker" />
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Speaker identification
              </label>
            </div>
          </div>
        </ModalHeader>
        <ModalFooter className="mt-4">
          {loading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
          <ModalAction className="bg-[#0048AD] w-full" onClick={handleSubmit}>
            Transcribe file
          </ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TranscriberModal;
