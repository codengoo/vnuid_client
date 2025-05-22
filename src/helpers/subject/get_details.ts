import { fetchCatch } from "@/actions/common";
import { ICourseDetails } from "../../types";
import { fetcher } from "../network/axios";

export async function getCourseDetails(courseID: string) {
  const result = await fetchCatch(() =>
    fetcher.get(`/subject/class/${courseID}`),
  );
  return result.data as ICourseDetails;
}
