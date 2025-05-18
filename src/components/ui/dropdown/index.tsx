import { Dropdown, DropdownItem } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

interface IVnDropdownProps<T> {
  options: {
    label: string;
    value: T;
  }[];

  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  label?: string;
}
export function VnDropdown<T>({
  options: values = [],
  value,
  setValue,
  label,
}: IVnDropdownProps<T>) {
  return (
    <Dropdown
      label={label || "Select"}
      size="xs"
      color="alternative"
      theme={{
        content: "p-2 min-w-[150px]",
        floating: {
          base: "rounded-lg",
          item: {
            base: "rounded-md",
          },
        },
      }}
    >
      {values.map((value, idx) => (
        <DropdownItem
          key={"option_" + idx}
          value={String(value.value)}
          onClick={() => setValue(value.value)}
        >
          {value.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
