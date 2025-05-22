import { fetcher } from "@/helpers";
import { IAuth } from "@/types";

export async function getProfile(): Promise<IAuth | null> {
  try {
    const response = await fetcher.get("/user/me");
    if (response.status === 200) return response.data.data as IAuth;
    else return null;
  } catch (error) {
    return null;
  }
}
