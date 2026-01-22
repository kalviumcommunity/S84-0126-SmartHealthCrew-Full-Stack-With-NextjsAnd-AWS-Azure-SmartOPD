import { Url } from "next/dist/shared/lib/router/router";

export enum TokenStatus {
  WAITING = "waiting",
  SERVING = "serving",
  COMPLETED = "completed",
  SKIPPED = "skipped",
}

export enum QueueStatus {
  ACTIVE = "active",
  PAUSED = "paused",
}

export interface Doctor {
  id: string;
  name: string;
  url: Url;
  department: string;
  email: string;
  queueStatus: QueueStatus;
  avgTimePerPatient: number; // in minutes
}

export interface QueueToken {
  id: string;
  doctorId: string;
  tokenNumber: number;
  patientName: string;
  patientPhone: string;
  status: TokenStatus;
  createdAt: number;
}

export interface AppState {
  doctors: Doctor[];
  tokens: QueueToken[];
}
