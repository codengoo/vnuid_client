import { IExtraUser } from "@/types";
import { fetcher } from "../network/axios";

export async function getUsersAsAdmin(): Promise<IExtraUser[] | null> {
  try {
    const response = await fetcher.get("/admin/users");
    if (response.status === 200) return response.data.data as IExtraUser[];
    else return null;
  } catch (error) {
    return null;
  }
}
