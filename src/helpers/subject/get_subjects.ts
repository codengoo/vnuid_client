import { ISubject } from "../../types";
import { fetcher } from "../network/axios";

export async function getSubjects() {
  try {
    const response = await fetcher.get("/subject/classes");
    if (response.status === 200) return response.data.data as ISubject[];
    else return [];
  } catch (error) {
    console.log(error);
    return []
  }
}