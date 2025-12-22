export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Appointment {
  clientId: { _id: string; name: string; email: string };
  businessId: { _id: string; name: string; email: string };
  date: string;
  time: string;
  state?: "booked" | "available";
}

export interface Client {
  name?: string;
  email: string;
  password?: string;
}

export interface Business {
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
