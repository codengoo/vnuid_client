import { AxiosError } from "axios";
import { fetcher } from "../network/axios";

export async function delUser(id: string): Promise<boolean> {
  try {
    const response = await fetcher.post("/manage/remove_many", {
      ids: [id],
    });
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Unknown error");
    } else {
      throw new Error("Unknown error");
    }
  }
}
