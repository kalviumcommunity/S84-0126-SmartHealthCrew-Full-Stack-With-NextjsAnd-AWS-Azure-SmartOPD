/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "QueueToken" (
    "id" SERIAL NOT NULL,
    "token" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "QueueToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QueueToken_patientId_idx" ON "QueueToken"("patientId");

-- CreateIndex
CREATE INDEX "QueueToken_token_idx" ON "QueueToken"("token");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_token_key" ON "Patient"("token");

-- CreateIndex
CREATE INDEX "Patient_token_idx" ON "Patient"("token");

-- CreateIndex
CREATE INDEX "Patient_phone_idx" ON "Patient"("phone");

-- AddForeignKey
ALTER TABLE "QueueToken" ADD CONSTRAINT "QueueToken_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
