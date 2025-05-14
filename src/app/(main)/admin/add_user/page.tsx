"use client";

import { getUsersAsAdmin } from "@/helpers/admin";
import { IExtraUser } from "@/types";
import { useEffect, useState } from "react";
import { UserInfo, UserTable } from "./_components";

export default function AddUser() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<IExtraUser[]>([]);
  const [user, setUser] = useState<IExtraUser | null>(null);

  const preload = async () => {
    try {
      setLoading(true);
      const users = await getUsersAsAdmin();
      if (!users) return;
      setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (user: IExtraUser) => {
    setUser(user);
  }

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-12">
      <UserTable users={users} onRowClick={handleRowClick}/>
      <UserInfo values={users} value={user} onChange={preload}/>
    </div>
  );
}
