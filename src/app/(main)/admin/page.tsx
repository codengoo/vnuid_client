"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/add_user");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <p>Redirecting...</p>
    </div>
  );
}
