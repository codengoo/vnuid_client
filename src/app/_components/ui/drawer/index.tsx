import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface IVnDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode[] | ReactNode;
}
export function VnDrawer({ isOpen, setIsOpen, children }: IVnDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      style={{ height: "auto", display: "flex", flexDirection: "column" }}
      theme={{
        root: {
          base: "rounded-2xl h-auto mb-0",
          position: {
            right: {
              on: "right-5 top-5 bottom-5",
            },
          },
        },
      }}
    >
      <DrawerHeader title="Danh sách sinh viên" />
      <DrawerItems style={{}}>{children}</DrawerItems>
    </Drawer>
  );
}
