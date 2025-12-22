export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Appointment {
  _id: string;
  clientId: { _id: string; name: string; email: string };
  businessId: { _id: string; name: string; email: string };
  date: string;
  time: string;
  state?: "booked" | "available";
}

export interface Client {
  _id: string;
  name?: string;
  email: string;
  password?: string;
}

export interface Business {
  _id: string;
  name?: string;
  email: string;
  password: string;
}

export interface NewAppointment {
  clientId: string;
  businessId: string;
  date: string;
  time: string;
  state?: "booked" | "available";
}
