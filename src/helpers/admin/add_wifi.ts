import { IWifi } from "@/types";
import { AxiosError } from "axios";
import { fetcher } from "../network/axios";

export async function addWifi(data: Omit<IWifi, "id">): Promise<boolean> {
  try {
    const response = await fetcher.post("/admin/wifi", data);
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
