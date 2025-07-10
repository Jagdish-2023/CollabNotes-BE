#  CollabNotes – Backend (Express + MongoDB + Socket.IO)

This is the backend server for the **CollabNotes** app — a real-time collaborative note-taking platform.

It is built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO** to support real-time editing between multiple users.

---

## Live Server

🔗 [Backend API](https://collabnotes-be.onrender.com)

---

## Features

- Create, update, and fetch notes from MongoDB
- Real-time syncing using WebSockets (Socket.IO)
- Auto-save updates from clients every few seconds
- Supports multiple users editing the same note

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/collabnotes-backend.git
cd collabnotes-backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set up environment variables
```bash
PORT=3000
MONGO_URI=mongodb-connection-string
```
### 3. Run the server
```bash
node index.js
```
