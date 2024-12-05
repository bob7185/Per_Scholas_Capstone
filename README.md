# Taskpal

This API allows you to manage users, projects, and tasks for a project management system. It includes CRUD operations to create, read, update, and delete users, projects, and tasks.

## API Routes

| Method  | Endpoint                              | Description                                          | CRUD Functionality |
|---------|---------------------------------------|------------------------------------------------------|--------------------|
| `GET`   | `/users`                              | Retrieve all users                                  | Read               |
| `POST`  | `/users`                              | Create a new user with name, email, and password    | Create             |
| `DELETE`| `/users/:userID`                     | Delete a user by ID                                | Delete             |
| `GET`   | `/projects`                           | Retrieve all projects                              | Read               |
| `POST`  | `/projects`                           | Create a new project                               | Create             |
| `PUT`   | `/projects/:projectID`                | Update a project by ID                             | Update             |
| `DELETE`| `/projects/:projectID`               | Delete a project by ID                             | Delete             |
| `GET`   | `/tasks/:projectID`                   | Retrieve all tasks in a project                    | Read               |
| `POST`  | `/projects/:projectID/tasks`          | Add a new task to a project                         | Create             |
| `PUT`   | `/tasks/:taskID`                      | Update task information by task ID                 | Update             |
| `PUT`   | `/tasks/:taskID/assign/:userID`       | Assign a user to a task                            | Update             |
| `PUT`   | `/tasks/:taskID/unassign`             | Unassign a user from a task                        | Update             |
| `DELETE`| `/tasks/:taskID`                     | Delete a task by ID                                | Delete             |

---

## Example Responses

#### POST /users (User Creation)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
