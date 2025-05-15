import { ISession } from "@/types";
import { fetcher } from "../network/axios";

export async function getSessionDetails(sessionID: string) {
  try {
    const response = await fetcher.get(`/subject/session/${sessionID}`);
    if (response.status === 200) return response.data.data as ISession;
    else return;
  } catch (error) {
    console.log(error);
    return;
  }
}
