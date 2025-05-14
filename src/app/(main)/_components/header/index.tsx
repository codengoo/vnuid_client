import { VnInput } from "@/components";

export function Header() {
  return (
    <div className="p-6 py-4 flex justify-center w-full">
      <VnInput
        id="search"
        className="w-1/4 bg-red"
        placeholder="Search"
        // rightIcon={<LuSearch/}
      />
    </div>
  );
}
