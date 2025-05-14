import Image from "next/image";

export function LangButton() {
  return (
    <button className="rounded-full overflow-hidden p-1 w-8 h-8 cursor-pointer">
      <Image
        src={"/images/flag_vn.png"}
        alt="flag_en"
        width={100}
        height={100}
        className="rounded-full object-cover h-full"
      />
    </button>
  );
}
