export type IUserType = "admin" | "student" | "teacher";
export type IThreshold = "SMALLER" | "LARGER";
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
  subject: ICourse;
}

export type IStudent = {
  student: IUser;
  checkins: ISession[];
};

export type ICheckin = {
  id: string;
  name: string;
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
