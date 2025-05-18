"use client";

import { getUsersAsAdmin } from "@/actions/admin";
import { defaultUserValue } from "@/configs";
import { useSetup } from "@/hooks";
import { UserInfo, UserTable } from "./_components";

export default function AddUser() {
  const { handleRowClick, preload, value, values } = useSetup({
    defaultValues: defaultUserValue,
    preloadFn: getUsersAsAdmin,
  });

  return (
    <div className="grid grid-cols-3 gap-12">
      <UserTable users={values} onRowClick={handleRowClick} />
      <UserInfo values={values} value={value} onChange={preload} />
    </div>
  );
}
