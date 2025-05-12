"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { VnBreadcrumbItem, VnBreadcrumbSplitter } from "./components";

const generateBreadCrumb = (sections: string[]) => {
  const components: ReactNode[] = [];

  let link = "";
  for (let index = 0; index < sections.length; index++) {
    const item = sections[index];
    link = `${link}/${item}`;

    const component = (
      <div key={"br_idx" + index} className="flex items-center">
        <VnBreadcrumbItem isMain={index === 0} label={item} url={link} />
        {index !== sections.length - 1 && <VnBreadcrumbSplitter />}
      </div>
    );

    components.push(component);
  }

  return components;
};

export function VnBreadCrumb() {
  const pathname = usePathname();
  const sections = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-1 items-center">
      {generateBreadCrumb(sections)}
    </div>
  );
}
