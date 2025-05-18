import { IRoom, IWifi } from "@/types";
import { fetcher } from "@/helpers";

export async function getRoomsAsAdmin(): Promise<IRoom[] | null> {
  try {
    const response = await fetcher.get("/admin/rooms");
    if (response.status === 200) return response.data.data as IRoom[];
    else return null;
  } catch (error) {
    return null;
  }
}
