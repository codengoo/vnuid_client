import { fetcher } from "@/helpers";

export async function exportCourse(courseID: string) {
  if (!courseID) throw new Error("Course ID is required");
  const host = fetcher.defaults.baseURL;
  window.open(`${host}/subject/class/${courseID}/export`, "_blank");
  return true;
}
