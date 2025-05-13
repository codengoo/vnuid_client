import { ToggleSwitch, ToggleSwitchProps } from "flowbite-react";

interface IVnWitch extends ToggleSwitchProps {}
export function VnSwitch(props: IVnWitch) {
  return (
    <ToggleSwitch
      {...props}
      theme={{
        toggle: {
          base: "group-focus:ring-2",
          checked: {
            color: {
              default: "bg-tertiary group-focus:ring-secondary",
            },
          },
        },
      }}
    />
  );
}
