import { exportCourse } from "@/actions/course";
import { VnButton, VnPopup } from "@/components";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface IExportModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  courseID: string;
}
export function ExportModal({ isOpen, setOpen, courseID }: IExportModalProps) {
  const [isLoading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      await exportCourse(courseID);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VnPopup
      openModal={isOpen}
      setOpenModal={setOpen}
      hasCloseButton
      title="Export"
    >
      <div className="flex justify-between">
        <h1 className="text-gray-800">Danh sách điểm danh</h1>
        <VnButton label="Export" disabled={isLoading} onClick={handleExport} />
      </div>
    </VnPopup>
  );
}
