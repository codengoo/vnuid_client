import { fetchCatch } from "@/actions/common";
import { ISessionCycle } from "@/types";
import { fetcher } from "../network/axios";

export async function getSessionCycleDetails(sessionID: string) {
  const result = await fetchCatch(() =>
    fetcher.get(`/subject/session/${sessionID}/cycle`),
  );
  return result.data as ISessionCycle;
}
