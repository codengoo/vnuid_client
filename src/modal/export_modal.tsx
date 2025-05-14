import { VnPopup } from "@/components/ui";
import { Dispatch, SetStateAction } from "react";

interface IExportModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  subjectID: string;
}
export function ExportModal({ isOpen, setOpen }: IExportModalProps) {
  return (
    <VnPopup openModal={isOpen} setOpenModal={setOpen} hasCloseButton title="Export">
    </VnPopup>
  );
}
