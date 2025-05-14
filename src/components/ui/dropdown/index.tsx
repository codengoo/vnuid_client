import { Dropdown, DropdownItem } from "flowbite-react";

interface IVnDropdownProps {
  values: {
    label: string;
    value: string;
  }[];
}
export function VnDropdown({ values = [] }: IVnDropdownProps) {
  return (
    <Dropdown label={"25 mục"} size="xs" color="alternative">
      {values.map((value, idx) => (
        <DropdownItem key={"option_" + idx} value={value.value}>
          {value.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
