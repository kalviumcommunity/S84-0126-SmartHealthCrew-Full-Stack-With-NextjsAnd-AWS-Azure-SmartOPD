import { Doctor, DoctorStatus } from "./types";

export const SEED_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    userId: "user-doc-1",
    name: "Dr. Mike Abrol",
    email: "mikeabrol@smartopd.com",
    phone: "9876543210",
    url: "/drmike.jpeg",
    department: "General Medicine",
    licenseNo: "GEN-10234",
    experience: 12,
    status: DoctorStatus.APPROVED,
    isQueuePaused: false,
  },
  {
    id: "doc-2",
    userId: "user-doc-2",
    name: "Dr. Sunita Sharma",
    email: "sunita@hospital.com",
    phone: "9123456789",
    url: "/drsunita.jpeg",
    department: "Pediatrics",
    licenseNo: "PED-88921",
    experience: 8,
    status: DoctorStatus.APPROVED,
    isQueuePaused: false,
  },
  {
    id: "doc-3",
    userId: "user-doc-3",
    name: "Dr. Amit Patel",
    email: "amit@hospital.com",
    phone: "9988776655",
    url: "/Doktor.jpeg",
    department: "Orthopedics",
    licenseNo: "ORT-55672",
    experience: 15,
    status: DoctorStatus.APPROVED,
    isQueuePaused: false,
  },
];

export const APP_NAME = "SmartOPD";
