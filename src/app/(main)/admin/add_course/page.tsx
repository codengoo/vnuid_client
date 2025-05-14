"use client";

import { getCoursesAsAdmin } from "@/helpers/admin";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";
import { CourseInfo, CourseTable } from "./_components";

export default function AddCourse() {
  const [isLoading, setLoading] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [course, setCourse] = useState<ICourse | null>(null);

  const preload = async () => {
    try {
      setLoading(true);
      const courses = await getCoursesAsAdmin();
      if (!courses) return;
      setCourses(courses);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (user: ICourse) => {
    setCourse(user);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-12">
        <CourseTable courses={courses} onRowClick={handleRowClick} />
        <CourseInfo values={courses} value={course} onChange={preload} />
      </div>
    </div>
  );
}
