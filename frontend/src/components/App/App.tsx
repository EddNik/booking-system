import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import BusinessDashboard from "../BusinessDashboard/BusinessDashboard";
import css from "./App.module.css";
import type { UserRole, UserState } from "../../types/appointTypes";
import Modal from "../Modal/Modal";
import { AuthForm } from "../AuthForm/AuthForm";

interface ModalState {
  isOpen: boolean;
  role: UserRole;
  mode: "login" | "register";
}

function App() {
  const [user, setUser] = useState<UserState | null>(null);

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    role: "client",
    mode: "login",
  });

  const handleOpenModal = (role: UserRole, mode: "login" | "register") => {
    setModal({ isOpen: true, role, mode });
  };

  const handleCloseModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleAuthSuccess = (userData: UserState) => {
    setUser(userData);
    handleCloseModal();
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={css.appWrapper}>
      <BrowserRouter>
        <Header
          role={user?.role || null}
          onLogout={handleLogout}
          onOpenModal={handleOpenModal}
        />

        <main className={css.app}>
          <div className={css.appContainer}>
            {!user ? (
              <h2 className={css.title}>Booking System</h2>
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
          </div>
        </main>
        {modal.isOpen && (
          <Modal onClose={handleCloseModal}>
            <AuthForm
              role={modal.role}
              mode={modal.mode}
              onSuccess={handleAuthSuccess}
            />
          </Modal>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
