"use client";

import { ICourse } from "@/types";
import { useEffect, useState } from "react";
import { SubjectInfo, SubjectTable } from "./_components";

export default function AddCourse() {
  const [isLoading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<ICourse[]>([]);
  const [subject, setSubject] = useState<ICourse | null>(null);

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

  const handleRowClick = async (user: ICourse) => {
    setSubject(user);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-12">
        <SubjectTable subjects={subjects} onRowClick={handleRowClick} />
        <SubjectInfo courses={subjects} course={subject} onChange={preload} />
      </div>
    </div>
  );
}
