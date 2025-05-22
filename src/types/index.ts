export type IUserType = "admin" | "student" | "teacher";
export type IThreshold = "SMALLER" | "LARGER";
export interface IAuth {
  id: string;
  name: string;
  role: IUserType;
  email: string;
}

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

export interface IExtraUser extends IUser {
  gid: string;
  password: string;
  type: IUserType;
}

export interface ICourse {
  id: string;
  name: string;
  code: string;
  description: string;
  opening_day: string;
  start_time: string;
  end_time: string;
  room_id: string;
  is_done: boolean;
  teacher_id: string;
  _count?: {
    students: number;
    session: number;
  };
}

export interface ICourseDetails extends ICourse {
  session: ISession[];
  students: IUser[];
  teacher: IUser;
  room: IRoom;
}

export interface ISession {
  id: string;
  name: string;
  start: string;
  duration: number;
  repeat: string;
  course_id: string;
  course: ICourse;
}

export type IStudent = {
  student: IUser;
  checkins: ISession[];
};

export type IWifi = {
  id: string;
  mac: string;
  name: string;
};

export type IRoom = {
  id: string;
  name: string;
  address: string;
  wifi: {
    room_id: string;
    wifi_id: string;
    type: IThreshold;
    rssi: number;
  }[];
};

export type ISessionCycle = {
  id: string;
  start: string;
  session_id: string;
  course_id: string;
  attendances: IAttendance[];
  course: ICourse;
  session: ISession;
};

export type IAttendance = {
  id: string;
  time: string;
  verified: boolean;
  device_id: string;
  student_id: string;
  session_cycle_id: string;
  session_id: string;
  course_id: string;
  student: IUser;
};
