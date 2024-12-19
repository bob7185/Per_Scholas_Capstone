
# TaskPal

TaskPal is a productivity application designed to streamline project and task management. This README covers both the frontend and backend of the TaskPal application.

---

## Features

### Frontend
- User authentication with **React Context API** for state management.
- Real-time updates using **axios**.
- Beautiful and responsive UI components powered by **Chakra UI**.
- Navigation between pages with **React Router DOM**.
- Notifications and alerts with **react-hot-toast**.

### Backend
- CRUD operations for managing users and tasks.
- Secure user authentication and password storage.
- Efficient database operations to handle user and task data.

---

## API Routes

### Users
| Method  | Endpoint                       | Description                                  | CRUD Functionality |
|---------|--------------------------------|----------------------------------------------|--------------------|
| `GET`   | `/users`                      | Retrieve all users                          | Read               |
| `POST`  | `/users`                      | Create a new user with basic validation     | Create             |
| `DELETE`| `/users/delete/:email`        | Delete a user by their email address        | Delete             |
| `PUT`   | `/users/update/:email`        | Update a user by their email address        | Update             |

### Tasks
| Method  | Endpoint                        | Description                                    | CRUD Functionality |
|---------|---------------------------------|------------------------------------------------|--------------------|
| `GET`   | `/tasks`                       | Retrieve all tasks                            | Read               |
| `POST`  | `/tasks/:email`                | Create a task for the user with the given email | Create             |
| `GET`   | `/tasks/user/:taskId`          | Retrieve a specific task by ID                | Read               |
| `POST`  | `/tasks/create/:email`         | Create a task and link it to the user with the given email | Create             |
| `DELETE`| `/tasks/delete/:taskId`        | Delete a task by ID                           | Delete             |
| `PUT`   | `/tasks/update/:taskId`        | Update a task by ID                           | Update             |

### Authentication
| Method  | Endpoint              | Description                 | CRUD Functionality |
|---------|-----------------------|-----------------------------|--------------------|
| `POST`  | `/auth/signup`       | Create a new user account  | Create             |

---

## Example Data

### Task
```json
{
  "_id": {
    "$oid": "6763214f6330fbe98d857377"
  },
  "name": "hakkf",
  "description": "elgnjgnjgrg",
  "priority": "urgent",
  "status": "open",
  "createdAt": "2024-12-18T19:23:59.634Z",
  "userEmail": "saury@mail.me"
}
```

### User
```json
{
  "_id": {
    "$oid": "6761246bb6da9fd9b4092e0f"
  },
  "name": "lamelo Ball",
  "username": "eli234",
  "email": "lamel@mail.com",
  "password": "$2b$10$zf1kFmleBfSN96xa2jcbHuOzkUTGWYD8l/Fwgbcpd6rXm7VB9s57y",
  "createdAt": "2024-12-17T07:12:43.872Z"
}
```

---

## Frontend Setup Instructions

1. Clone the frontend repository:
   ```bash
   git clone <frontend-repository-url>
   cd taskpal-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_API_URL=<your-backend-api-url>
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Backend Setup Instructions

1. Clone the backend repository:
   ```bash
   git clone <backend-repository-url>
   cd taskpal-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Technologies Used

### Frontend
- **React.js**: Core library for building the frontend.
- **Chakra UI**: Provides pre-styled, customizable components.
- **React Router DOM**: Manages client-side routing.
- **axios**: Simplifies HTTP requests for API communication.
- **react-hot-toast**: Displays clean toast notifications.

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for storing user and task data.
- **bcrypt**: Password hashing for secure authentication.
- **jsonwebtoken**: Used for generating and verifying JWT tokens.

---

Inspired from the book : Mern Web Development for Beginners by Nathan Sebastian
