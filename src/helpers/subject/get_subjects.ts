import { fetchCatch } from "@/actions/common";
import { ICourse } from "../../types";
import { fetcher } from "../network/axios";

export async function getSubjects() {
  const result = await fetchCatch(() => fetcher.get(`/subject/classes`));
  return result.data as ICourse[];
}
