import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";

interface IVnPopupProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode[] | React.ReactNode;
  title?: string;
  leftTitleComponent?: React.ReactNode;
  hasCloseButton?: boolean;
}
export function VnPopup({
  openModal,
  setOpenModal,
  children,
  title,
  leftTitleComponent,
  hasCloseButton,
}: IVnPopupProps) {
  const handleKeyEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenModal(false);
    }
  };

  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => setOpenModal(false)}
      theme={{
        content: { inner: "rounded-xl" },
        body: { base: "p-4" },
        header: { base: "border-0" },
      }}
      onKeyUp={handleKeyEsc}
    >
      {hasCloseButton && (
        <ModalHeader>
          {title && (
            <h1 className="text-xl font-medium text-gray-700">{title}</h1>
          )}
        </ModalHeader>
      )}

      <ModalBody className="space-y-4">
        {!hasCloseButton && title && (
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-700">{title}</h1>
            {leftTitleComponent}
          </div>
        )}
        {children}
      </ModalBody>
    </Modal>
  );
}
