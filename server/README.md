
# Taskpal

This API allows you to manage users and tasks for a project management system. It includes CRUD operations to create, read, update, and delete users and tasks, as well as authentication features.

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
