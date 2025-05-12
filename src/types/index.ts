export interface IUser {
  id: string;
  sid: string;
  email: string;
  dob?: Date;
  official_class: string;
  name: string;
  phone: string;
  address: string;
  department: string;
}

export interface ISubject {
  id: string;
  name: string;
  code: string;
  description: string;
  opening_day: string;
  start_time: string;
  end_time: string;
  address: string;
  is_done: string;
  teacher_id: string;
  session: ISession[];
  students: IUser[];
  teacher: IUser;
  _count: {
    students: number;
    session: number;
  };
}

export interface ISession {
  id: string;
  name: string;
  start: string;
  duration: number;
  repeat: string;
  subjectId: string;
  subject: ISubject;
}

export type IStudent = {
  student: IUser;
  checkins: ISession[];
};
