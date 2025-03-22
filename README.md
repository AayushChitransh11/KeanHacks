# FOOD WASTE DONATION PLATFORM

A full-stack web application built using the **MEAN stack** (MongoDB, Express.js, Angular, Node.js) to reduce food waste by connecting donors (restaurants, stores) with receivers (NGOs, shelters, etc.).

## 🌟 Features

### ✅ MVP Features
- User authentication with JWT
- Role-based access: Donor / Receiver
- Geocoding (using OpenCage API) to convert addresses to coordinates
- Donation creation with pickup date and time
- Receivers can:
  - Browse food donations
  - Filter by distance (based on location)
  - Claim items
  - Add items to cart
  - Set pickup schedule
- View history of past and upcoming donations/pickups

### 🧠 Tech Stack

#### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- OpenCage Geocoding API
- Resend API for email (optional)
- JWT for authentication
- Multer for image uploads
- JOI for input validation

#### Frontend:
- Angular (CLI-based frontend)
- TailwindCSS (optional for styling)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/food-waste-app.git
cd food-waste-app
