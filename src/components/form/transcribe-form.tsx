"use client";

import { FormEvent, useState } from "react";
import {
  apiKeyAtom,
  fileNameAtom,
  fileTypeAtom,
  handlingAtom,
  transcriptionHandlerAtom,
} from "@/services/transcription";
import { useAtomValue, useSetAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const TranscribeForm = () => {
  const handling = useAtomValue(handlingAtom);
  const submitHandler = useSetAtom(transcriptionHandlerAtom);
  const setFileName = useSetAtom(fileNameAtom);
  const setFileType = useSetAtom(fileTypeAtom);
  const setAPIKey = useSetAtom(apiKeyAtom);
  const { toast } = useToast();

  const [files, setFiles] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
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

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget, "file selected");
        const formData = new FormData(e.currentTarget);
        try {
          await submitHandler(formData);
        } catch (error: any) {
          console.log(error);
          toast({
            title: "Error",
            description: error?.message,
          });
        }
      }}
      className="space-y-6"
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <div className="space-y-4">
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
                  The maximum file size is 1GB for audio and 10GB for videos.
                </p>
                <p className="text-gray-400 text-xs">
                  Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv,
                  m4a, mov, wmv, wma
                </p>
              </span>
              {selectedFile && (
                <p className="mt-4 -mb-4 text-sm">{selectedFile?.name}</p>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFileName(e?.target?.files?.[0]?.name as string);
            setSelectedFile(e?.target?.files?.[0]);
          }}
          type="file"
          max={25 * 1024 * 1024}
          accept="audio/*,video/*"
          name="file"
          className="hidden"
          ref={inputRef}
          multiple={true}
        />
      </div>
      <div className="grid w-full md:hidden items-center gap-1.5">
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
      <div className="flex items-center gap-2 md:hidden">
        <Checkbox id="speaker" />
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Speaker identification
        </label>
      </div>
      <div className="space-y-4">
        <Label>
          Write a propmt{" "}
          <span className="text-xs text-neutral-500">
            You can improve your transcription with a prompt.
          </span>
        </Label>
        <Input name="prompt" placeholder="Next.js, Typescript..." />
      </div>
      <div className="space-y-4">
        <Label>
          Choose a response type{" "}
          <span className="text-xs text-neutral-500">
            You choose SRT or VTT.
          </span>
        </Label>
        <Select
          onValueChange={(value) => {
            setFileType(value as "vtt" | "srt");
          }}
          defaultValue="vtt"
          name="response_format"
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a response type." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vtt">VTT</SelectItem>
            <SelectItem value="srt">SRT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4 hidden">
        <Label>
          OpenAI API Key{" "}
          <span className="text-xs text-neutral-500">
            You key will not be stored anywhere.{" "}
            <a
              className="dark:text-neutral-200 text-neutral-700"
              href="https://platform.openai.com/account/api-keys"
            >
              Get your key ↗
            </a>
          </span>
        </Label>
        <Input
          onChange={(e) => {
            setAPIKey(e.target.value);
          }}
          type="password"
          name="api_key"
          placeholder="sk-QT"
          value={process.env.NEXT_PUBLIC_OPENAI_API_KEY}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="bg-[#0048AD] w-full">
          {!handling ? (
            "Transcribe File"
          ) : (
            <span className="animate-pulse">Transcribing...</span>
          )}{" "}
        </Button>
      </div>
    </form>
  );
};

export default TranscribeForm;
