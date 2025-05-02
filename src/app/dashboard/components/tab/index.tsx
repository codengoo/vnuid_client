import { default as cn } from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface ITab {
  icon: IconType;
  label: string;
  url: string;
}

export function Tab({ icon: Icon, label, url }: ITab) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link href={url}>
      <div
        className={cn("gap-4 flex p-3 px-4 items-center", {
          "bg-secondary border rounded-lg border-tertiary text-tertiary-800 shadow-2xl":
            isActive,
        })}
      >
        <Icon size={20} />
        <span>{label}</span>
      </div>
    </Link>
  );
}
