import { useQuery } from "@tanstack/react-query";
import { fetchBusinessAppointments } from "../../services/appointService";
import css from "./BusinessDashboard.module.css";

export default function BusinessDashboard() {
  const { data } = useQuery({
    queryKey: ["business-appointments"],
    queryFn: () => fetchBusinessAppointments({}),
  });

  const appointments = data?.appointments || [];

  return (
    <div className={css.container}>
      <h2>Calendar</h2>

      {appointments.length === 0 ? (
        <div className={css.noData}>No active appointments yet.</div>
      ) : (
        <div className={css.tableWrapper}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app._id}>
                  <td>
                    {(app.clientId as any)?.name ||
                      (app.clientId as any)?.email ||
                      "Client"}
                  </td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>
                    {new Date(app.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
