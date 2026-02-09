/* eslint-disable prettier/prettier */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Doctor, Token, DoctorStatus, TokenStatus, Role } from "./types";

interface StoreContextType {
  users: User[];
  doctors: Doctor[];
  tokens: Token[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  registerDoctor: (
    doctor: Omit<Doctor, "id" | "status" | "isQueuePaused" | "userId">
  ) => void;
  approveDoctor: (id: string) => void;
  rejectDoctor: (id: string) => void;
  toggleDoctorActive: (id: string) => void;
  addToken: (
    token: Omit<Token, "id" | "tokenNumber" | "status" | "createdAt">
  ) => string;
  updateTokenStatus: (tokenId: string, status: TokenStatus) => void;
  pauseDoctorQueue: (doctorId: string, isPaused: boolean) => void;
  getDoctorByUserId: (userId: string) => Doctor | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // ✅ Server-safe initial states
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // ✅ Hydrate from localStorage AFTER mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUsers = localStorage.getItem("opd_users");
    const savedDoctors = localStorage.getItem("opd_doctors");
    const savedTokens = localStorage.getItem("opd_tokens");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(
      savedUsers
        ? JSON.parse(savedUsers)
        : [
            {
              id: "admin-1",
              name: "Super Admin",
              email: "admin@opdflow.com",
              role: Role.ADMIN,
            },
          ]
    );

    if (savedDoctors) setDoctors(JSON.parse(savedDoctors));
    if (savedTokens) setTokens(JSON.parse(savedTokens));
  }, []);

  // ✅ Persist changes safely
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("opd_users", JSON.stringify(users));
    localStorage.setItem("opd_doctors", JSON.stringify(doctors));
    localStorage.setItem("opd_tokens", JSON.stringify(tokens));
  }, [users, doctors, tokens]);

  // ---------------- Doctor Registration ----------------

  const registerDoctor = (
    doctorData: Omit<Doctor, "id" | "status" | "isQueuePaused" | "userId">
  ) => {
    const timestamp = Date.now();
    const newUserId = `u-${timestamp}`;
    const newDoctorId = `d-${timestamp}`;

    const newUser: User = {
      id: newUserId,
      name: doctorData.name,
      email: doctorData.email,
      role: Role.DOCTOR,
    };

    const newDoctor: Doctor = {
      ...doctorData,
      id: newDoctorId,
      userId: newUserId,
      status: DoctorStatus.PENDING,
      isQueuePaused: false,
    };

    setUsers((prev) => [...prev, newUser]);
    setDoctors((prev) => [...prev, newDoctor]);
  };

  // ---------------- Admin Actions ----------------

  const approveDoctor = (id: string) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: DoctorStatus.APPROVED } : d
      )
    );
  };

  const rejectDoctor = (id: string) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: DoctorStatus.REJECTED } : d
      )
    );
  };

  const toggleDoctorActive = (id: string) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, isQueuePaused: !d.isQueuePaused } : d
      )
    );
  };

  const pauseDoctorQueue = (doctorId: string, isPaused: boolean) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId ? { ...d, isQueuePaused: isPaused } : d
      )
    );
  };

  // ---------------- Token Logic ----------------

  const addToken = (
    tokenData: Omit<Token, "id" | "tokenNumber" | "status" | "createdAt">
  ) => {
    const id = `t-${Date.now()}`;
    const prefix = tokenData.department.substring(0, 3).toUpperCase();
    const count =
      tokens.filter((t) => t.department === tokenData.department).length + 1;

    const tokenNumber = `${prefix}-${count.toString().padStart(3, "0")}`;

    const newToken: Token = {
      ...tokenData,
      id,
      tokenNumber,
      status: TokenStatus.WAITING,
      createdAt: Date.now(),
    };

    setTokens((prev) => [...prev, newToken]);
    return id;
  };

  const updateTokenStatus = (tokenId: string, status: TokenStatus) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === tokenId
          ? {
              ...t,
              status,
              servedAt: status === TokenStatus.CALLED ? Date.now() : t.servedAt,
            }
          : t
      )
    );
  };

  const getDoctorByUserId = (userId: string) => {
    return doctors.find((d) => d.userId === userId);
  };

  return (
    <StoreContext.Provider
      value={{
        users,
        doctors,
        tokens,
        currentUser,
        setCurrentUser,
        registerDoctor,
        approveDoctor,
        rejectDoctor,
        toggleDoctorActive,
        addToken,
        updateTokenStatus,
        pauseDoctorQueue,
        getDoctorByUserId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
