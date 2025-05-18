import { AxiosError } from "axios";
import { fetcher } from "@/helpers";

export async function delRoom(id: string): Promise<boolean> {
  try {
    const response = await fetcher.delete("/admin/room/" + id);
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
