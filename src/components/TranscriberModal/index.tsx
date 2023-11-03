"use client";

import React from "react";
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
import Transcribe from "../Transcribe";
import { formStateAtom } from "@/services/transcription";
import { useAtomValue } from "jotai";

const TranscriberModal = () => {
  const formState = useAtomValue(formStateAtom);
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button className="bg-[#0048AD] px-6 py-4">Transcribe file</Button>
      </ModalTrigger>
      <ModalContent className="py-6 px-8 w-12">
        <ModalHeader className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <ModalTitle>Transcribe File</ModalTitle>
            <ModalCancel>&#x2715;</ModalCancel>
          </div>
          <Transcribe />
        </ModalHeader>
        {formState === "translate" && (
          <ModalFooter>
            <ModalAction>Go back to transcribe file</ModalAction>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TranscriberModal;
