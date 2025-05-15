import { ICourse, ISession, ISessionCycle } from "@/types";
import { fetcher } from "../network/axios";

export async function getCurrentSessions(courseID: string) {
  try {
    const response = await fetcher.get(`/subject/sessions/now`);
    if (response.status === 200) return response.data.data as ISession;
    else return;
  } catch (error) {
    console.log(error);
    return;
  }
}
