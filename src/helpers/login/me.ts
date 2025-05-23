import { IUser } from "@/types";
import { fetcher } from "../network/axios";

export async function getProfile(): Promise<IUser | null> {
  try {
    const response = await fetcher.get("/user/me");
    if (response.status === 200) return response.data.data as IUser;
    else return null;
  } catch (error) {
    return null;
  }
}
