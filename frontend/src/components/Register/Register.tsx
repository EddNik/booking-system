import { useState } from "react";
import css from "./LogInPage.module.css";
import { useNavigate } from "react-router-dom";
import { clientRegisterLogin } from "../../services/appointService";
import type { UserRole, UserState } from "../../types/appointTypes";

function Register() {
  const naigete = useNavigate();
  const [error, setError] = useState("");
  const setUser = useAuthStore(state => state.setUser);

  async function handleSubmit(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const response = await register(formValues);
      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  }

  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className={css.input}
              required
            />
          </div>

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
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default SignUpPage;
