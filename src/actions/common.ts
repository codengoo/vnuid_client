import { AxiosError, AxiosResponse } from "axios";

export async function fetchCatch<T>(
  fn: () => Promise<AxiosResponse<T>>,
): Promise<T | null> {
  try {
    const response = await fn();
    if (response.status === 200) return response.data as T;
    else return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
