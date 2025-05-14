"use client";

import { VnInput, VnInputSuggest } from "@/components";
import { LuBook, LuClock, LuSearch } from "react-icons/lu";

export default function History() {
  const filterByCourse = (
    search: string,
    handleChange: (id: string) => void,
  ) => {
    return [];
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <VnInput
          id="search"
          label="Search"
          icon={LuSearch}
          className="w-64"
          placeholder="Search"
        />

        <VnInputSuggest
          id="course"
          label="Môn học"
          icon={LuBook}
          className="w-64"
          placeholder="Môn học"
          filterFn={filterByCourse}
        />

        <VnInput
          id="start"
          label="Bắt đầu từ"
          type="date"
          icon={LuClock}
          className="w-64"
          placeholder="Môn học"
        />

        <VnInput
          id="end"
          label="Kết thúc"
          type="date"
          icon={LuClock}
          className="w-64"
          placeholder="Môn học"
        />
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
