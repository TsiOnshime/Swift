# E-Scooter Rental Backend API

A robust RESTful API for user and admin management, scooter rental, payments, and rewards.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Admin Endpoints](#admin-endpoints)
  - [Scooter Endpoints](#scooter-endpoints)
  - [Payment Endpoints](#payment-endpoints)
  - [Reward Endpoints](#reward-endpoints)
- [Scheduled Jobs](#scheduled-jobs)
- [Security](#security)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Frontend Integration](#frontend-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


---

## Features

- User registration, login, profile, and email verification
- Password reset via email
- Admin registration, login, and scooter management
- Scooter CRUD, rental, and return
- Stripe payment integration
- Reward system with token transfer
- JWT authentication and token blacklisting
- Rate limiting, input validation, and sanitization
- Centralized error handling
- Automated tests with Jest and Supertest

---

## Tech Stack

- Node.js, Express 5
- MongoDB, Mongoose
- Stripe API
- JWT for authentication
- Joi for validation
- Validator.js for sanitization
- Jest & Supertest for testing

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your `.env` file:**  
   Copy `.env.example` to `.env` and fill in your secrets.

4. **Start the server:**
   ```sh
   npm start
   ```

5. **Run tests:**
   ```sh
   npm test
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```
PORT=4001
DB_CONNECT=mongodb://127.0.0.1:27017/Escooter-backend
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
MJ_APIKEY_PUBLIC=your_mailjet_public
MJ_APIKEY_PRIVATE=your_mailjet_private
MJ_SENDER_EMAIL=your_email@example.com
STRIPE_SECRET_KEY=your_stripe_secret
TOKEN_MINT=your_token_mint
REWARD_WALLET_SECRET=[...]
```

---

## Authentication

- JWT is used for authentication.
- For protected routes, include the token in the `Authorization` header:  
  `Authorization: Bearer <token>`

---

## API Endpoints

### User Endpoints

- **POST** `/api/v1/users/register`  
  Register a new user.

- **POST** `/api/v1/users/login`  
  Login user.

- **GET** `/api/v1/users/profile`  
  Get user profile (protected).

- **PUT** `/api/v1/users/edit-profile`  
  Update user profile (protected).

- **GET** `/api/v1/users/logout`  
  Logout user (protected).

- **GET** `/api/v1/users/verify-email`  
  Verify user email.

- **GET** `/api/v1/users/my-packages`  
  Get user's rental history (protected).

- **DELETE** `/api/v1/users/my-packages/:id`  
  Delete a rental package (protected).

- **POST** `/api/v1/users/forgot-password`  
  Request a password reset link (sends email).

- **POST** `/api/v1/users/reset-password`  
  Reset password using token from email.

---

### Admin Endpoints

- **POST** `/api/v1/admin/register`  
  Register a new admin.

- **POST** `/api/v1/admin/login`  
  Login admin.

- **GET** `/api/v1/admin/profile`  
  Get admin profile (protected).

- **GET** `/api/v1/admin/logout`  
  Logout admin (protected).

- **POST** `/api/v1/admin/`  
  Add a new scooter (protected).

- **PUT** `/api/v1/admin/:id`  
  Update scooter info (protected).

- **DELETE** `/api/v1/admin/:id`  
  Delete a scooter (protected).

- **PATCH** `/api/v1/admin/:qrCode/battery`  
  Update scooter battery level (protected).

---

### Scooter Endpoints

- **GET** `/api/v1/scooters`  
  List available scooters (optionally by location).

- **GET** `/api/v1/scooters/:id`  
  Get scooter by ID.

- **GET** `/api/v1/scooters/qr/:qrCode`  
  Get scooter by QR code.

- **PATCH** `/api/v1/scooters/:id/available`  
  Update scooter availability (protected).

- **POST** `/api/v1/scooters/:qrCode/return`  
  Return a scooter (protected).

---

### Payment Endpoints

- **POST** `/api/v1/payments/create-payment-intent`  
  Create a Stripe payment intent.

- **POST** `/api/v1/payments/confirm-payment`  
  Confirm payment and book scooter (protected).

---

### Reward Endpoints

- **POST** `/api/v1/rewards/transfer`  
  Transfer tokens between users (protected).

- **POST** `/api/v1/rewards/reward`  
  (Admin/cron) Reward a user with tokens (internal use).

---

## Scheduled Jobs

- **Reward Finished Rentals:**  
  The backend runs a cron job every 5 minutes to reward users whose rentals have ended.  
  See [`cron.js`](./cron.js) and [`services/rewardJob.js`](./services/rewardJob.js).

---

## Security

- All incoming requests are sanitized using a custom middleware based on `validator.js` to prevent XSS and injection attacks.
- Rate limiting and helmet are enabled for enhanced security.
- Sensitive data is managed via environment variables.

---

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages in JSON format:
  ```json
  { "message": "Error description" }
  ```

---

## Testing

- Run all tests:
  ```sh
  npm test
  ```
- Tests are located in the `tests/` directory and use Jest + Supertest.

---

## Frontend Integration

- The backend is designed to work with the [E-Scooter Frontend](../front-end/).
- Make sure to set `VITE_BASE_URL` in your frontend `.env` to match the backend URL.

---

## Troubleshooting

- **Mailjet 401/Blocked:**  
  If you see `Your account has been temporarily blocked`, contact Mailjet support or use another email provider for development.

- **Connection Refused:**  
  Ensure the backend server is running and the port matches your frontend config.

- **400 Bad Request:**  
  Check that your frontend sends all required fields and types as specified in the API docs.

---
## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

## Contact

For questions or support, please open an issue or contact the maintainer at [tsionshimelis900@gmail.com].

---

