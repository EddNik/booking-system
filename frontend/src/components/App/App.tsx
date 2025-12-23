import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import BusinessDashboard from "../BusinessDashboard/BusinessDashboard";
import {
  clientRegisterLogin,
  businessRegisterLogin,
} from "../../services/appointService";
import type { UserRole, UserState } from "../../types/appointTypes";

// CSS для форми (inline для зручності)
const formStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "30px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  background: "white",
};

function App() {
  const [user, setUser] = useState<UserState | null>(null);

  // Стейт форми
  const [role, setRole] = useState<UserRole>("client");
  const [isLogin, setIsLogin] = useState(true);

  // Дані форми
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Клієнтська валідація перед відправкою
    if (formData.password.length < 8) {
      setError("Пароль має містити мінімум 8 символів");
      return;
    }
    if (!isLogin && formData.name.length < 2) {
      setError("Ім'я має містити мінімум 2 символи");
      return;
    }

    try {
      const path = isLogin ? "login" : "register";

      // Формуємо payload
      const payload: any = {
        email: formData.email,
        password: formData.password,
      };

      // Додаємо ім'я тільки при реєстрації і якщо воно не пусте
      if (!isLogin && formData.name) {
        payload.name = formData.name;
      }

      console.log(`Sending request to /${role}/${path}`, payload);

      let res;
      if (role === "client") {
        res = await clientRegisterLogin(payload, path);
        // Важливо: перевірте структуру відповіді бекенду (res.name чи res.client.name)
        // Згідно з вашим останнім кодом appointService, це просто res.name
        setUser({ role: "client", name: res.name || res.email, id: res._id });
      } else {
        res = await businessRegisterLogin(payload, path);
        setUser({ role: "business", name: res.name || res.email, id: res._id });
      }
    } catch (err: any) {
      console.error("Auth Error:", err);

      // Спроба дістати точне повідомлення про помилку від сервера
      const serverMessage =
        err.response?.data?.message || err.response?.data?.error;

      if (serverMessage) {
        setError(`Помилка сервера: ${serverMessage}`);
      } else if (err.status === 400) {
        setError(
          "Невірні дані (Помилка 400). Перевірте правильність email та довжину пароля."
        );
      } else {
        setError("Сталася невідома помилка. Перевірте консоль.");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <BrowserRouter>
      <Header role={user?.role || null} onLogout={handleLogout} />

      <main style={{ minHeight: "80vh", background: "#fdfdfd" }}>
        {!user ? (
          <div style={formStyle}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              {isLogin ? "Вхід" : "Реєстрація"}
            </h2>

            {/* Таби вибору ролі */}
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
              }}
            >
              <button
                onClick={() => setRole("client")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "none",
                  border: "none",
                  borderBottom: role === "client" ? "2px solid blue" : "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Я Клієнт
              </button>
              <button
                onClick={() => setRole("business")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "none",
                  border: "none",
                  borderBottom: role === "business" ? "2px solid blue" : "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Я Бізнес
              </button>
            </div>

            <form
              onSubmit={handleAuth}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Ваше ім'я / Назва бізнесу"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />

              <input
                type="password"
                placeholder="Пароль (мін. 8 символів)"
                required
                minLength={8}
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />

              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.9em",
                    background: "#ffe6e6",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                style={{
                  padding: "12px",
                  background: "#333",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {isLogin ? "Увійти" : "Зареєструватися"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "15px" }}>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {isLogin ? "Створити акаунт" : "Увійти в існуючий"}
              </button>
            </p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                user.role === "client" ? (
                  <ClientDashboard userId={user.id} />
                ) : (
                  <BusinessDashboard />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
