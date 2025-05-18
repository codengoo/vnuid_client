import { ICourse } from "@/types";
import { fetcher } from "../../../helpers/network/axios";

export async function getCoursesAsAdmin(): Promise<ICourse[] | null> {
  try {
    const response = await fetcher.get("/admin/courses");
    if (response.status === 200) return response.data.data as ICourse[];
    else return null;
  } catch (error) {
    return null;
  }
}
