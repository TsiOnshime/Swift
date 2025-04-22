# E-Scooter Rental API

A RESTful API for user and admin management, scooter rental, and scooter management.

---

## Authentication

- **JWT** is used for authentication.
- For protected routes, include the token in the `Authorization` header:  
  `Authorization: Bearer <token>`

---

## User Endpoints

### Register User

- **POST** `/users/register`
- **Body:**
    ```json
    {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
- **Response:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john@example.com",
        ...
      }
    }
    ```

---

### Login User

- **POST** `/users/login`
- **Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
- **Response:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john@example.com",
        ...
      }
    }
    ```

---

### Get User Profile

- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    ```json
    {
      "_id": "user_id",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com",
      ...
    }
    ```

---

### Logout User

- **GET** `/users/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    ```json
    { "message": "Logged out" }
    ```

---

## Admin Endpoints

### Register Admin

- **POST** `/admin/register`
- **Body:**
    ```json
    {
      "fullname": { "firstname": "Admin", "lastname": "User" },
      "email": "admin@example.com",
      "password": "adminpassword"
    }
    ```
- **Response:**
    ```json
    {
      "token": "jwt_token_here",
      "admin": {
        "_id": "admin_id",
        "firstname": "Admin",
        "lastname": "User",
        "email": "admin@example.com",
        "role": "admin",
        ...
      }
    }
    ```

---

### Login Admin

- **POST** `/admin/login`
- **Body:**
    ```json
    {
      "email": "admin@example.com",
      "password": "adminpassword"
    }
    ```
- **Response:**
    ```json
    {
      "token": "jwt_token_here",
      "admin": {
        "_id": "admin_id",
        "firstname": "Admin",
        "lastname": "User",
        "email": "admin@example.com",
        "role": "admin",
        ...
      }
    }
    ```

---

### Get Admin Profile

- **GET** `/admin/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    ```json
    {
      "_id": "admin_id",
      "firstname": "Admin",
      "lastname": "User",
      "email": "admin@example.com",
      "role": "admin",
      ...
    }
    ```

---

### Logout Admin

- **GET** `/admin/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    ```json
    { "message": "Logged out" }
    ```

---

### Admin Scooter Management (Protected)

#### Add a New Scooter

- **POST** `/admin/`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
    ```json
    {
      "qrCode": "unique-code",
      "location": { "type": "Point", "coordinates": [38.763611, 9.005401] },
      "batteryLevel": 100,
      "rentalPricePerMinute": 2
    }
    ```
- **Response:**
    ```json
    {
      "_id": "scooter_id",
      "qrCode": "unique-code",
      "location": { "type": "Point", "coordinates": [38.763611, 9.005401] },
      "batteryLevel": 100,
      "isAvailable": true,
      "rentalPricePerMinute": 2,
      ...
    }
    ```

#### Update Scooter

- **PUT** `/admin/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**  
  ```json
  {
    "qrCode": "new-unique-code",
    "location": { "type": "Point", "coordinates": [38.763611, 9.005401] },
    "batteryLevel": 90,
    "rentalPricePerMinute": 3,
    "isAvailable": true
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "scooter_id",
    "qrCode": "new-unique-code",
    "location": { "type": "Point", "coordinates": [38.763611, 9.005401] },
    "batteryLevel": 90,
    "rentalPricePerMinute": 3,
    "isAvailable": true,
    ...
  }
  ```

#### Delete Scooter

- **DELETE** `/admin/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:**
    ```json
    { "message": "Scooter deleted" }
    ```

#### Update Battery Level

- **PATCH** `/admin/:qrCode/battery`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
  ```json
  { "batteryLevel": 80 }
  ```
- **Response:** Updated scooter object
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**
    ```json
    { "batteryLevel": 80 }
    ```
- **Response:** Updated scooter object

---

## Scooter Endpoints

### List Available Scooters

- **GET** `/scooters`
- **Query (optional):** `lng`, `lat`, `maxDistance`
- **Response:** Array of scooters

---

### Get Scooter by ID

- **GET** `/scooters/:id`
- **Response:** Scooter object

---

### Rent a Scooter (Protected)

- **POST** `/scooters/:qrCode/rent`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Scooter object or rental info

---

### Return a Scooter (Protected)

- **POST** `/scooters/:qrCode/return`
- **Headers:** `Authorization: Bearer <token>`
- **Body (optional):**
    ```json
    {
      "lng": 38.763611,
      "lat": 9.005401
    }
    ```
- **Response:** Scooter object or rental info

---

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages in JSON format.

---

## Example Usage Flow

1. Register or login as a user or admin.
2. Use the returned token for protected endpoints.
3. Users can rent/return scooters.
4. Admins can manage scooters.

---

## Notes

- All protected routes require a valid JWT token.
- Admin routes require the user to have admin privileges.
- For geospatial queries, provide `lng`, `lat`, and `maxDistance` as query parameters.

---

## License

MIT