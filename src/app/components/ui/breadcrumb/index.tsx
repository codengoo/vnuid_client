import { usePathname } from "next/navigation";
import { VnBreadcrumbItem, VnBreadcrumbSplitter } from "./components";

export function VnBreadCrumb() {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean).splice(1);

  return (
    <div className="flex gap-1 items-center">
      {section.length === 0 && <VnBreadcrumbItem isMain label="" />}
      {section.map((item, index) => {
        if (index === 0) {
          return (
            <>
              <VnBreadcrumbItem isMain label={item} />
              <VnBreadcrumbSplitter />
            </>
          );
        } else if (index === section.length - 1) {
          return <VnBreadcrumbItem label={item} />;
        } else {
          return (
            <>
              <VnBreadcrumbItem label={item} />
              <VnBreadcrumbSplitter />
            </>
          );
        }
      })}
    </div>
  );
}
