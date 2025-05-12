import { IMenuItemProps, VnMenuItem } from "./menu_item";

interface IMenuProps {
  menu: IMenuItemProps[];
}

export function VnMenu({ menu }: IMenuProps) {
  return (
    <div className="w-fit min-w-[150px] flex flex-col">
      {menu.map((item, idx) => (
        <VnMenuItem {...item} key={"menu__" + idx} />
      ))}
    </div>
  );
}
