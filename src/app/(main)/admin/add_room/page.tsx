"use client";

import { IRoom } from "@/types";
import { useEffect, useState } from "react";

export default function AddRoom() {
  const [isLoading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [room, setRoom] = useState<IRoom | null>(null);

  const preload = async () => {
    try {
      setLoading(true);
      //   const users = await getUsersAsAdmin();
      //   if (!users) return;
      //   setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (user: IRoom) => {
    // setUser(user);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-12">
      {/* <UserTable users={users} onRowClick={handleRowClick} /> */}
      {/* <UserInfo users={users} user={user} onChange={preload} /> */}
    </div>
  );
}
