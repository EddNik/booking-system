import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBusinesses,
  fetchClientAppointments,
  bookAppointment,
  cancelAppointment,
} from "../../services/appointService";
import css from "./ClientDashboard.module.css";

interface ClientDashboardProps {
  userId: string;
}

export default function ClientDashboard({ userId }: ClientDashboardProps) {
  const queryClient = useQueryClient();
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [bookDate, setBookDate] = useState("");

  const { data: businessesData } = useQuery({
    queryKey: ["businesses", search],
    queryFn: () => fetchBusinesses(search, 1),
  });

  const { data: appointmentsData } = useQuery({
    queryKey: ["client-appointments"],
    queryFn: () => fetchClientAppointments({}),
  });

  const createMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      setSelectedBusinessId(null);
      setBookDate("");
      queryClient.invalidateQueries({ queryKey: ["client-appointments"] });
    },
    onError: (err: any) => alert(err.response?.data?.message || "Error"),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["client-appointments"] }),
  });

  const handleBook = () => {
    if (!selectedBusinessId || !bookDate) return alert("Select all fields");

    const [datePart, timePart] = bookDate.split("T");

    createMutation.mutate({
      clientId: userId,
      businessId: selectedBusinessId,
      date: datePart,
      time: timePart,
    } as any);
  };

  const businesses = businessesData?.businesses || [];
  const appointments = appointmentsData?.appointments || [];

  return (
    <div className={css.container}>
      <div className={css.headerRow}>
        <h1>Search services</h1>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={css.search}
        />
      </div>

      <div className={css.grid}>
        {businesses.map(biz => (
          <div key={biz._id} className={css.card}>
            <h3>{biz.name}</h3>
            <p>{biz.email}</p>

            {selectedBusinessId === biz._id ? (
              <div className={css.bookingForm}>
                <input
                  type="datetime-local"
                  value={bookDate}
                  onChange={e => setBookDate(e.target.value)}
                  className={css.inputDate}
                />
                <button onClick={handleBook} className={css.btnPrimary}>
                  Approve
                </button>
                <button
                  onClick={() => setSelectedBusinessId(null)}
                  className={css.btnSecondary}
                >
                  Reject
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedBusinessId(biz._id)}
                className={css.btnPrimary}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>

      <h2 className={css.sectionTitle}>Мої записи</h2>
      <ul className={css.appointmentList}>
        {appointments.map(app => (
          <li key={app._id} className={css.appointmentItem}>
            <div>
              <span>{(app.businessId as any)?.name || "Business"}</span>
              <br />
              <span>{new Date(app.date).toLocaleString()}</span>
            </div>
            <button
              onClick={() => cancelMutation.mutate(app._id)}
              className={css.btnCancel}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
