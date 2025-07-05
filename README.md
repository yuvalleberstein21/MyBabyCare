# 👶 MY BABY CARE

#### RESTful API for tracking baby care activities such as sleeping, feeding, and diaper changes.

Designed for use with a frontend client , to allow parents and caregivers to monitor their baby's routine.

## ✨ Features

- User authentication with secure cookie-based login.
- Create your own baby/babies with (name,gender,birthDate)
- Track sleep sessions (start & end times).
- Log feedings with type, amount, and time.
- Record diaper changes with type and time.
- Filter and paginate records by date range.

## 📷 Screenshot

![App Screenshot](./assets/screenshot.png)

## ⚙️ Available Endpoints

### 🔐 Authentication

- `POST /auth/login` – Login
- `GET /auth/signup` – Sign Up
- `PUT /auth/refresh-token` – Get another token
- `DELETE /auth/logout` – Logout

### 👶🏼 Baby

- `POST /babies` – Add a new baby
- `GET /babies` – Get babies list
- `GET /babies/:babyId` – Get single baby
- `PUT /babies/:babyId` – Edit baby details
- `DELETE /babies/:babyId` – Delete Baby

### 💤 Sleeping

- `POST /sleep/:babyId/start` – Start a new sleep session
- `POST /sleep/:babyId/end` – End the current sleep session
- `PUT /sleep/:sleepingId` – Edit sleep session
- `DELETE /sleep/:sleepingId` – Delete a sleep session

### 🍼 Feeding

- `POST /feed/:babyId` – Add a new feeding
- `GET /feed/:babyId` – Get feeding list
- `PUT /feed/:feedingId` – Edit feeding
- `DELETE /feed/:feedingId` – Delete feeding

### 💩 Diapers

- `POST /diaper/:babyId` – Add a diaper change
- `GET /diaper/:babyId` – Get diaper changes with filters
- `PUT /diaper/:diaperId` – Edit diaper change
- `DELETE /diaper/:diaperId` – Delete diaper change

## 🛠️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yuvalleberstein21/MyBabyCare.git
   cd MyBabyCare
   ```
2. npm install

3. Set up environment variables

- Create a .env file with the following:

  PORT=8005 <br>
  MONGO_URI <br>
  ACCESS_TOKEN_SECRET <br>
  REFRESH_TOKEN_SECRET

4. Run the server

`npm run dev`

## 🧱 Tech Stack

Backend: Node.js, Express.js, MongoDB, Mongoose, TypeScript

Auth: Cookie-based JWT authentication

Validation: Custom Validator / Custom middleware

Docs: Swagger
