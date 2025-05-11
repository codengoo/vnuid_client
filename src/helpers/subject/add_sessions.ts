import { AxiosError } from "axios";
import { ISession } from "../../types";
import { fetcher } from "../network/axios";

export async function addSession(data: Partial<ISession>) {
  try {
    const response = await fetcher.post("/subject/session/", data);
    if (response.status === 200) return true;
    else false;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Unknown error");
    } else {
      throw new Error("Unknown error");
    }
  }
}