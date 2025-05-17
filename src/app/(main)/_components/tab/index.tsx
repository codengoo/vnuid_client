import { default as cn } from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface ITab {
  icon: IconType;
  label: string;
  url: string;
  isCollapsed: boolean;
}

export function Tab({ icon: Icon, label, url, isCollapsed }: ITab) {
  const pathname = usePathname();
  const isActive = pathname.includes(url);

  return (
    <Link href={url}>
      <div
        className={cn(
          "gap-4 flex p-3 px-4 items-center text-gray-500 border rounded-lg hover:bg-gray-200  hover:border-gray-300 border-transparent",
          {
            "bg-secondary hover:bg-secondary !border-tertiary text-tertiary-800 shadow-2xl":
              isActive,
          },
        )}
      >
        <Icon size={20} className="h-6" />
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
