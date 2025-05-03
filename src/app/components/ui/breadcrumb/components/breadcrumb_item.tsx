import { default as cn } from "classnames";
import { LuHouse } from "react-icons/lu";
import { VnBreadcrumbSplitter } from "./breadcrumb_splitter";

interface IVnBreadcrumbItem {
  isMain?: boolean;
  label: string;
  url?: string;
}

export function VnBreadcrumbItem({ label, isMain, url }: IVnBreadcrumbItem) {
  return (
    <div
      className={cn("flex items-center capitalize text-gray-600 text-sm", {
        "bg-gray-100 py-0.5 px-2 rounded-lg border border-gray-300": isMain,
      })}
    >
      {isMain && (
        <div className="flex items-center">
          <LuHouse size={16} />
          <VnBreadcrumbSplitter />
        </div>
      )}
      <span className={cn({ "font-semibold": isMain })}> {label}</span>
    </div>
  );
}
