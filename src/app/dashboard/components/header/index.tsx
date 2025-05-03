import { VnInput } from "@/app/components/ui";
import { LuSearch } from "react-icons/lu";

export function Header() {
  return (
    <div className="p-6 flex justify-center w-full">
      <VnInput
        id="search"
        className="w-1/4 bg-red"
        placeholder="Search"
        rightIcon={LuSearch}
      />
    </div>
  );
}
