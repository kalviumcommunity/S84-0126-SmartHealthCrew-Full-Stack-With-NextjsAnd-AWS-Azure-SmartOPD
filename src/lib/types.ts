export enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum DoctorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum TokenStatus {
  WAITING = "WAITING",
  CALLED = "CALLED",
  COMPLETED = "COMPLETED",
  MISSED = "MISSED",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  email: string;
  url: string;
  phone: string;
  department: string;
  licenseNo: string;
  experience: number;
  status: DoctorStatus;
  isQueuePaused: boolean;
}

export interface Token {
  id: string;
  tokenNumber: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  symptoms: string;
  department: string;
  preferredDoctorId?: string;
  status: TokenStatus;
  createdAt: number;
  servedAt?: number;
}

export const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gastroenterology",
  "Neurology",
];

export const DEPT_PREFIXES: Record<string, string> = {
  "General Medicine": "GEN",
  Cardiology: "CAR",
  Pediatrics: "PED",
  Orthopedics: "ORT",
  Dermatology: "DER",
  Gastroenterology: "GAS",
  Neurology: "NEU",
};
