<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Amrutam Telemedicine Backend</h1>

<p align="center">
  A scalable, secure, and observable telemedicine platform built with NestJS for 100K+ daily consultations.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" />
  </a>
  <a href="https://github.com/your-username/amrutam-backend/actions" target="_blank">
    <img src="https://github.com/your-username/amrutam-backend/workflows/CI/badge.svg" alt="CI Pipeline" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
</p>

---

## 📌 Overview

**Amrutam** is a telemedicine platform enabling patients to:
- Discover and book doctors
- Attend virtual consultations
- Receive e-prescriptions
- View audit trails

Built for **scale (100K+ daily consultations)**, **security (RBAC, MFA, encryption)**, and **observability (logs, metrics, traces)**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| **Language** | TypeScript |
| **Framework** | NestJS (Modular, DI, Guards) |
| **Database** | PostgreSQL (RDS) |
| **Cache / Session** | Redis (ElastiCache) |
| **Auth** | JWT + MFA (TOTP) + RBAC |
| **API** | REST (OpenAPI 3.0) |
| **Infra** | AWS EKS, RDS, ElastiCache, S3 |
| **CI/CD** | GitHub Actions |
| **Observability** | OpenTelemetry + DataDog / CloudWatch |

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL (port 5433 or update `.env`)
- Redis (port 6379)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/amrutam-backend.git
cd amrutam-backend
npm install
