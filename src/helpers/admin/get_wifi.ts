import { IWifi } from "@/types";
import { fetcher } from "../network/axios";

export async function getWifisAsAdmin(): Promise<IWifi[] | null> {
  try {
    const response = await fetcher.get("/admin/wifis");
    if (response.status === 200) return response.data.data as IWifi[];
    else return null;
  } catch (error) {
    return null;
  }
}
