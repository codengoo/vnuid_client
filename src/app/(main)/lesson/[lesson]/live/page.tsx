"use client";

import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { ITableColumn, VnTable } from "@/components";
import { SOCKET_KEY } from "@/constants";
import { getCourseDetails } from "@/helpers/subject";
import { getSessionCycleDetails } from "@/helpers/subject/get_session_cycle_details";
import { useSocket } from "@/hooks";
import { IAttendance, ICourse, ISessionCycle } from "@/types";
import { formatDateTime, Paths } from "@/utils";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CourseInfo } from "../_components";

export default function Live() {
  const socket = useSocket();
  const { lesson } = useParams<{ lesson: string }>();
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("session");
  const [courseDetail, setCourseDetail] = useState<ICourse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [sessionCycle, setSessionCycle] = useState<ISessionCycle | null>(null);

  const column = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
      { label: "Name", value: "student.name", render: (value) => value },
      { label: "Email", value: "student.email", render: (value) => value },
      { label: "SID", value: "student.sid", render: (value) => value },
      { label: "Thời gian", value: "time", render: (value) => formatDateTime(value as string) },
    ] as ITableColumn<IAttendance, Paths<IAttendance>>[];
  }, []);

  const loadCycleDetails = async () => {
    try {
      setLoading(true);

      // Load sessions
      const sessionCycle = await getSessionCycleDetails(sessionID || "");
      setSessionCycle(sessionCycle || null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const loadCourseDetails = async () => {
    try {
      setLoading(true);

      // Load course
      const course = await getCourseDetails(lesson || "");
      setCourseDetail(course || null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket) return;
    const handleConnect = () => {
      console.log("Connected");

      if (sessionID) {
        console.log("Connect to session", sessionID);
        socket.emit(SOCKET_KEY.SOCKET_join_session, sessionID);
      }
    };

    if (socket.connected && sessionID) handleConnect();
    socket.on("connect", handleConnect);
    socket.on(SOCKET_KEY.SOCKET_update_session, loadCycleDetails);

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off(SOCKET_KEY.SOCKET_update_session);
    };
  }, [socket, sessionID]);

  useEffect(() => {
    loadCourseDetails();
    loadCycleDetails();
  }, []);
  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <CourseInfo course={courseDetail as ICourse} />
      </HeaderContentInfo>

      <div>
        <VnTable
          columns={column}
          columnRatios={[1, 3, 2, 1, 2]}
          values={sessionCycle?.attendances || []}
        />
      </div>
    </MainContentInfo>
  );
}
