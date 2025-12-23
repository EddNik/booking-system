import { useState } from "react";
import {
  clientRegisterLogin,
  businessRegisterLogin,
} from "../../services/appointService";
import type { UserRole, UserState } from "../../types/appointTypes";
import css from "./AuthForm.module.css";

interface AuthFormProps {
  role: UserRole;
  mode: "login" | "register";
  onSuccess: (user: UserState) => void;
}

export const AuthForm = ({ role, mode, onSuccess }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const payload: any = {
        email: formData.email,
        password: formData.password,
      };

      if (!isLogin && formData.name) {
        payload.name = formData.name;
      }

      console.log(`Sending request to /${role}/${mode}`, payload);

      let res;
      if (role === "client") {
        res = await clientRegisterLogin(payload, mode);
        onSuccess({ role: "client", name: res.name || res.email, id: res._id });
      } else {
        res = await businessRegisterLogin(payload, mode);
        onSuccess({
          role: "business",
          name: res.name || res.email,
          id: res._id,
        });
      }
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  const title = `${isLogin ? "Login" : "Register"} (${
    role === "client" ? "Client" : "Business"
  })`;

  return (
    <div>
      <h2 className={css.authFormTitle}>{title}</h2>
      <form onSubmit={handleSubmit} className={css.authForm}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Client Name / Business Name"
            required
            minLength={2}
            value={formData.name}
            onChange={event =>
              setFormData({ ...formData, name: event.target.value })
            }
            className={css.authFormInput}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={event =>
            setFormData({ ...formData, email: event.target.value })
          }
          className={css.authFormInput}
        />

        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          value={formData.password}
          onChange={event =>
            setFormData({ ...formData, password: event.target.value })
          }
          className={css.authFormInput}
        />

        {error && <p>{error}</p>}

        <button className={css.authFormButton} type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};
