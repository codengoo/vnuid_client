import { usePathname } from "next/navigation";
import { VnBreadcrumbItem, VnBreadcrumbSplitter } from "./components";

export function VnBreadCrumb() {
  const pathname = usePathname();
  const sections = pathname.split("/").filter(Boolean);
  const baseurl = sections.shift();

  console.log(sections, baseurl);
  
  return (
    <div className="flex gap-1 items-center">
      {sections.length === 0 && (
        <VnBreadcrumbItem isMain label="" url={baseurl || "/"} />
      )}
      {sections.map((item, index) => {
        if (index === 0) {
          return (
            <>
              <VnBreadcrumbItem isMain label={item} url="" />
              <VnBreadcrumbSplitter />
            </>
          );
        } else if (index === sections.length - 1) {
          return <VnBreadcrumbItem label={item} url="" />;
        } else {
          return (
            <>
              <VnBreadcrumbItem label={item} url="" />
              <VnBreadcrumbSplitter />
            </>
          );
        }
      })}
    </div>
  );
}
