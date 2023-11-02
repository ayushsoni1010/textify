"use client";

import { formStateAtom } from "@/services/transcription";
import { useAtomValue } from "jotai";

import TranscribeForm from "../form/transcribe-form";
import TranscriptionEditForm from "../form/transcription-edit-form";

const Transcribe = () => {
  const formState = useAtomValue(formStateAtom);

  return (
    <div>
      {formState === "transcribe" ? (
        <TranscribeForm />
      ) : (
        <TranscriptionEditForm />
      )}
    </div>
  );
};

export default Transcribe;
