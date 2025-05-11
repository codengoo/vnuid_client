import { ISession } from "@/types";

export const AddSessionDefaultValue: Partial<ISession> = {
    name: "Checkin",
    duration: 5,
    repeat: "Weekly",
    start: new Date().toISOString()
}