export const SOCKET_join_session = "joinCheckinSession";
export const SOCKET_update_session = "updateCheckinSession";
export const SOCKET_room_session = (sessionID: string) => "checkin_" + sessionID;