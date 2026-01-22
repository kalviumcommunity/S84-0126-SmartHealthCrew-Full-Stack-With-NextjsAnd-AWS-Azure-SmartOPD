import { Doctor, QueueStatus } from "./types";

export const SEED_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Mike Abrol",
    department: "General Medicine",
    email: "mikeabrol@smartopd.com",
    url: "/drmike.jpeg",
    queueStatus: QueueStatus.ACTIVE,
    avgTimePerPatient: 10,
  },
  {
    id: "doc-2",
    name: "Dr. Sunita Sharma",
    department: "Pediatrics",
    email: "sunita@hospital.com",
    url: "/drsunita.jpeg",
    queueStatus: QueueStatus.ACTIVE,
    avgTimePerPatient: 15,
  },
  {
    id: "doc-3",
    name: "Dr. Amit Patel",
    department: "Orthopedics",
    email: "amit@hospital.com",
    url: "/Doktor.jpeg",
    queueStatus: QueueStatus.ACTIVE,
    avgTimePerPatient: 12,
  },
];

export const APP_NAME = "SmartOPD";
