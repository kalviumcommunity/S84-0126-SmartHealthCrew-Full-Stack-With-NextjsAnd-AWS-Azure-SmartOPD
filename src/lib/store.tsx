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
    doctor: Omit<Doctor, "id" | "status" | "isQueuePaused" | "userId">,
    password?: string
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
  updateDoctorStatus: (doctorId: string, status: DoctorStatus) => void;
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
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Hydrate from localStorage AFTER mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUsers = localStorage.getItem("opd_users");
    const savedDoctors = localStorage.getItem("opd_doctors");
    const savedTokens = localStorage.getItem("opd_tokens");
    const savedCurrentUser = localStorage.getItem("opd_current_user");

    // Default users that must always exist
    const defaultUsers: User[] = [
      {
        id: "admin-1",
        name: "Super Admin",
        email: "admin@hospital.com",
        role: Role.ADMIN,
      },
      {
        id: "doctor-1",
        name: "Dr. Emily",
        email: "emily@hospital",
        role: Role.DOCTOR,
      },
    ];

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers) as User[];
      const mergedUsers = [...defaultUsers];
      parsedUsers.forEach((savedUser) => {
        if (!mergedUsers.find((u) => u.id === savedUser.id)) {
          mergedUsers.push(savedUser);
        }
      });

      setUsers(mergedUsers);
    } else {
      setUsers(defaultUsers);
    }

    if (!savedDoctors) {
      setDoctors([
        {
          id: "d-emily",
          userId: "doctor-1",
          name: "Dr. Emily",
          email: "emily@hospital",
          specialization: "General Medicine",
          experience: "10 years",
          department: "General Medicine",
          status: DoctorStatus.APPROVED,
          isQueuePaused: false,
        },
      ]);
    } else {
      setDoctors(JSON.parse(savedDoctors));
    }

    if (savedTokens) setTokens(JSON.parse(savedTokens));

    if (savedCurrentUser) setCurrentUser(JSON.parse(savedCurrentUser));

    setIsHydrated(true);
  }, []);

  // ✅ Persist changes safely
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    localStorage.setItem("opd_users", JSON.stringify(users));
    localStorage.setItem("opd_doctors", JSON.stringify(doctors));
    localStorage.setItem("opd_tokens", JSON.stringify(tokens));
    if (currentUser) {
      localStorage.setItem("opd_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("opd_current_user");
    }
  }, [users, doctors, tokens, currentUser, isHydrated]);

  // ---------------- Doctor Registration ----------------

  const registerDoctor = (
    doctorData: Omit<Doctor, "id" | "status" | "isQueuePaused" | "userId">,
    password?: string
  ) => {
    const timestamp = Date.now();
    const newUserId = `u-${timestamp}`;
    const newDoctorId = `d-${timestamp}`;

    const newUser: User = {
      id: newUserId,
      name: doctorData.name,
      email: doctorData.email,
      role: Role.DOCTOR,
      password: password || "1234567890", // Default password if none provided
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
    setDoctors((prev) => {
      const updatedDoctors = prev.map((d) =>
        d.id === id ? { ...d, status: DoctorStatus.APPROVED } : d
      );

      // Also update the corresponding user's role/status if needed
      const doctor = updatedDoctors.find((d) => d.id === id);
      if (doctor) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === doctor.userId ? { ...u, role: Role.DOCTOR } : u
          )
        );
      }

      return updatedDoctors;
    });
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

  const updateDoctorStatus = (doctorId: string, status: DoctorStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, status } : d))
    );
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
        updateDoctorStatus,
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
