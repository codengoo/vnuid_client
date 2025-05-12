import { getDeviceId, getDeviceName } from "@/utils";
import { AxiosError } from "axios";
import { fetcher } from "../network/axios";

export async function login(username: string, password: string) {
  try {
    const response = await fetcher.post("/auth/login_pass", {
      device_id: await getDeviceId(),
      device_name: await getDeviceName(),
      username,
      password,
    });
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
