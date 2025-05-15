import { ICourse, ISession, ISessionCycle } from "@/types";
import { fetcher } from "../network/axios";

export async function getSessionCycleDetails(sessionID: string) {
  try {
    const response = await fetcher.get(`/subject/session/${sessionID}/cycle`);
    if (response.status === 200) return response.data.data as ISessionCycle;
    else return;
  } catch (error) {
    console.log(error);
    return;
  }
}
