import { useState } from "react";
import css from "./LogInPage.module.css";
import { useNavigate } from "react-router-dom";
import { clientRegisterLogin } from "../../services/appointService";
import type { UserRole, UserState } from "../../types/appointTypes";

function LogInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserState | null>(null);

  // Стейт форми
  const [role, setRole] = useState<UserRole>("client");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await clientRegisterLogin("login", client);

    if (response.ok) {
      navigate("/dashboard");
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  }

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default LogInPage;
