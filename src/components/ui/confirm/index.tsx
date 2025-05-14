import { Button, Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface IVnConfirm {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onOK?: () => void;
}

export function VnConfirm({
  openModal,
  setOpenModal,
  title,
  onOK,
}: IVnConfirm) {
  const handleConfirm = () => {
    setOpenModal(false);
    onOK?.();
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleConfirm}>
              Ok, Chắc chắn
            </Button>
            <Button color="default" onClick={() => setOpenModal(false)}>
              Không, Bỏ qua
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
