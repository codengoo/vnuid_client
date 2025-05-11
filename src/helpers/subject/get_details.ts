import { ISubject } from "../../types";
import { fetcher } from "../network/axios";

export async function getSubjectDetails(id: string) {
  try {
    const response = await fetcher.get("/subject/class/" + id);
    if (response.status === 200) return response.data.data as ISubject;
    else return;
  } catch (error) {
    console.log(error);
    return;
  }
}
