import { AxiosError } from "axios";
import { ISession } from "../../types";
import { fetcher } from "../network/axios";

export async function updateSession(data: Partial<ISession>) {
  try {
    const response = await fetcher.put("/subject/session/" + data.id, data);
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
