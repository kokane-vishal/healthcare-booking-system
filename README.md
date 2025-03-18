## Healthcare Booking System

A Healthcare Booking System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This system allows patients to book appointments with doctors, while doctors manage their availability. An admin oversees user management, including doctor registrations and appointment monitoring.

---

### Features

#### Patient Features
- **Register/Login:** Secure user authentication.
- **Browse Doctors:** Search for doctors by specialization.
- **View Profiles & Availability:** Check detailed doctor profiles and available time slots.
- **Appointment Booking:** Book and cancel appointments.

#### Doctor Features
- **Register/Login:** Secure doctor authentication.
- **Manage Availability:** Set and update available time slots.
- **Appointment Management:** View and manage booked appointments.
- **Profile Update:** Update personal and professional information.

#### Admin Features
- **Doctor Registration Approval:** Approve or reject doctor registrations.
- **User Management:** Oversee all users (patients and doctors).
- **Appointment Overview:** Access all appointments in the system.

---

### Technologies Used

- **Frontend:** React.js, Vite, CSS, React Router.
- **Backend:** Node.js, Express.js, JWT, bcrypt.js.
- **Database:** MongoDB.

---

### Installation

#### Prerequisites
- Node.js
- MongoDB 
- npm

#### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
    ```bash
    npm install
3. Create a `.env` file with the following environment variables:
    ```bash 
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development #production
    CLIENT_URL=http://frontend-domain.com
4. Create an admin account (check `createAdmin.js` file).
    ```bash
    node createAdmin.js
5. Start the backend server:
    ```bash
    npm run dev
#### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
2. Install dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    npm run dev
Feel free to contribute or raise issues for improvements.