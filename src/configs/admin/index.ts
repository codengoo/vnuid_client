import { ICourse, IExtraUser, IRoom, IWifi } from "@/types";

export const defaultWifiValue: IWifi = {
  id: "",
  mac: "",
  name: "",
};

export const defaultRoomValue: IRoom = {
  id: "",
  name: "",
  address: "",
  wifi: [],
};

export const defaultUserValue: IExtraUser = {
  id: "",
  address: "",
  department: "",
  email: "",
  name: "",
  official_class: "",
  phone: "",
  sid: "",
  dob: new Date(),
  gid: "",
  password: "",
  type: "student",
};

export const defaultCourseValue: ICourse = {
  id: "",
  code: "",
  description: "",
  end_time: new Date().toISOString(),
  name: "",
  is_done: false,
  opening_day: new Date().toISOString(),
  room_id: "",
  teacher_id: "",
  start_time: new Date().toISOString(),
};
