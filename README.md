# Assured Contract Farming

A digital platform connecting farmers and buyers for secure, fixed-price crop contracts.

## Project Structure

- **client/**: React + Vite + Tailwind CSS Frontend
- **server/**: Node.js + Express + MongoDB Backend

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally on port 27017)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:5173`.

## Features

- **Authentication**: Role-based login for Farmers and Buyers.
- **Buyer Dashboard**: Create new crop contracts.
- **Farmer Dashboard**: View and accept available contracts.
- **Real-time Status**: Track contract status (Open, Accepted, Completed).

## Database

The application uses a local MongoDB database named `assured_contract_farming`.
Connection string: `mongodb://localhost:27017/assured_contract_farming`

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/contracts` - Get contracts
- `POST /api/contracts` - Create contract (Buyer)
- `PUT /api/contracts/:id/accept` - Accept contract (Farmer)
