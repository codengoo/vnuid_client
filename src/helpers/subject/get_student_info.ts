import { IStudent, ISubject } from "../../types";
import { fetcher } from "../network/axios";

export async function getStudentInfo(
  studentId: string,
  subjectId: string,
) {
  try {
    const response = await fetcher.get(
      `/subject/class/${subjectId}/${studentId} `,
    );
    if (response.status === 200) return response.data.data as IStudent;
    else return;
  } catch (error) {
    console.log(error);
    return;
  }
}
