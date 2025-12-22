import axios from "axios";
import type {
  Appointment,
  Business,
  Client,
  NewAppointment,
} from "../types/appointTypes";

export const apiBaseRequestOptions = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface ClientRegLoginResponse {
  client: {
    _id: string;
    email: string;
    name: string;
  };
}

export interface BusinessRegLoginResponse {
  business: {
    _id: string;
    email: string;
    name: string;
  };
}

export async function clientRegisterLogin(
  clientProfile: Client,
  path: string
): Promise<ClientRegLoginResponse> {
  try {
    const response = await apiBaseRequestOptions.post<ClientRegLoginResponse>(
      `/client/${path}`,
      clientProfile
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function businessRegisterLogin(
  clientProfile: Business,
  path: string
): Promise<BusinessRegLoginResponse> {
  try {
    const response = await apiBaseRequestOptions.post<BusinessRegLoginResponse>(
      `/business/${path}`,
      clientProfile
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface FetchBusinessResponse {
  businesses: Business[];
  totalPages: number;
  totalBusinesses: number;
  page: number;
  perPage?: number;
}

export async function fetchBusinesses(
  query: string,
  page: number
): Promise<FetchBusinessResponse> {
  const options = {
    params: {
      ...(query.trim() !== "" && { search: query.trim() }),
      page: page,
      perPage: 10,
    },
  };
  try {
    const { data } = await apiBaseRequestOptions.get<FetchBusinessResponse>(
      "/businesses",
      options
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAvailableAppoint(businessId: string, date: string) {
  const options = {
    params: { businessId, date },
  };
  try {
    const { data } = await apiBaseRequestOptions.get<string[]>(
      "/appointments/available",
      options
    );

    return data;
  } catch (error) {
    throw error;
  }
}

interface BookAppointmentResponse {
  _id: string;
  clientId: string;
  businessId: string;
  date: string;
  time: string;
  state?: "booked" | "available";
}

export async function bookAppointment(
  bookingData: NewAppointment
): Promise<BookAppointmentResponse> {
  try {
    const { data } = await apiBaseRequestOptions.post<BookAppointmentResponse>(
      "/bookAppointment",
      bookingData
    );

    return data;
  } catch (error) {
    throw error;
  }
}

interface FetchClientAppointmentsResponse {
  appointments: Appointment[];
  totalPages: number;
  totalAppointments: number;
  page: number;
  perPage: number;
}

export async function fetchClientAppointments(params: {
  state?: string;
  page?: number;
  perPage?: number;
}): Promise<FetchClientAppointmentsResponse> {
  try {
    const { data } =
      await apiBaseRequestOptions.get<FetchClientAppointmentsResponse>(
        "/appointments/client",
        { params }
      );

    return data;
  } catch (error) {
    throw error;
  }
}

export interface FetchBusinessAppointmentsResponse {
  totalAppointments: number;
  totalPages: number;
  appointments: Appointment[];
  page: number;
  perPage: number;
}

export async function fetchBusinessAppointments(params: {
  state?: string;
  page?: number;
  perPage?: number;
}): Promise<FetchBusinessAppointmentsResponse> {
  try {
    const { data } =
      await apiBaseRequestOptions.get<FetchBusinessAppointmentsResponse>(
        "/appointments/business",
        { params }
      );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function cancelAppointment(
  appointmentId: string
): Promise<Appointment> {
  try {
    const { data } = await apiBaseRequestOptions.patch<Appointment>(
      `/appointments/reject/${appointmentId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
