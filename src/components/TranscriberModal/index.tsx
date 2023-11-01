import React from "react";
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const TransscriberModal = () => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button className="bg-[#0048AD] px-6 py-4">Transcribe file</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you absolutely sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalCancel>Cancel</ModalCancel>
          <ModalAction className="bg-[#0048AD]">Continue</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransscriberModal;
