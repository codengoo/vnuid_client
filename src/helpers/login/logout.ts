import { AxiosError } from "axios";
import { fetcher } from "../network/axios";

export async function logout() {
  try {
    const response = await fetcher.post("/auth/logout");
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
