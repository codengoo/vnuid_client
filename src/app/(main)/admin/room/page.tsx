"use client";

import { getRoomsAsAdmin } from "@/actions/admin";
import { defaultRoomValue } from "@/configs";
import { useSetup } from "@/hooks";
import { RoomInfo, RoomTable } from "./_components";

export default function AddRoom() {
  const { handleRowClick, preload, value, values } = useSetup({
    defaultValues: defaultRoomValue,
    preloadFn: getRoomsAsAdmin,
  });

  return (
    <div className="grid grid-cols-2 gap-12">
      <RoomTable values={values} onRowClick={handleRowClick} />
      <RoomInfo values={values} value={value} onChange={preload} />
    </div>
  );
}
