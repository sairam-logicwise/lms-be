# Frontend Integration Guide: Library Management System

Welcome to the team! This guide is designed to help you integrate the LMS Backend APIs into the frontend application. It covers everything from authentication to handling common UI patterns like pagination and error states.

---

## 1. Core Concepts for Frontend
- **Base URL**: All APIs are prefixed with `/api`.
- **Content Type**: Always use `Content-Type: application/json` for POST/PUT requests.
- **Authentication**: We use **JWT (JSON Web Tokens)**. Most endpoints are protected and require a token.

---

## 2. Setting Up Your Environment
In your frontend project (React/Vue/etc.), you should have a `.env` file to store the backend URL:

| Variable Name | Purpose | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` (or similar) | The base URL of the backend | `https://lms-be-q5hd.onrender.com/api` |

---

## 3. The Authentication Flow
To access protected data, follow this flow:

1. **Login**: Call `POST /auth/sign-in` with `email` and `password`.
2. **Store Token**: On success, the backend returns a token in `data.token`. Store this in `localStorage` or a secure cookie.
3. **Authorize Requests**: For every subsequent API call, add the token to the headers:
   ```javascript
   headers: {
     'Authorization': `Bearer ${stored_token}`
   }
   ```
4. **Handle Expiry**: If an API returns **401 Unauthorized**, clear the token and redirect the user to the Login page.

---

## 4. Standard Response Formats
We use a consistent structure to make your frontend life easier:

### ✅ Success (200 OK)
```json
{
  "message": "Books fetched successfully",
  "data": [ ... ] 
}
```

### ❌ Error (400, 401, 404, 500)
```json
{
  "message": "Invalid email or password"
}
```
**Frontend Tip**: Always display the `message` from the error response to the user in a Toast or Alert.

---

## 5. API Reference for Frontend

### 🔑 Authentication
| Endpoint | Method | Payload | Description |
| :--- | :--- | :--- | :--- |
| `/auth/sign-in` | `POST` | `{email, password}` | Returns the JWT token. |

### 📚 Books
| Endpoint | Method | Params / Body | Description |
| :--- | :--- | :--- | :--- |
| `/book` | `GET` | None | Fetch all books. Use for the gallery/list view. |
| `/book/dashboard` | `GET` | None | Get stats like "Total Books" or "Books Issued". |
| `/book/issue/:id` | `POST` | `{userId, serialNumber, dueDate}` | Opens the "Issue Book" modal. |
| `/book/return/:id` | `POST` | `{serialNumber}` | Handles book returns. |

### 👥 Users (Admin View)
| Endpoint | Method | Params | Description |
| :--- | :--- | :--- | :--- |
| `/user` | `GET` | `?page=1&limit=10` | Fetch users with pagination. |
| `/user/:userId` | `DELETE` | Path Param | Deletes a user. |

### 📝 Transactions
| Endpoint | Method | Params | Description |
| :--- | :--- | :--- | :--- |
| `/transaction` | `GET` | `?page=1&limit=10` | Fetch borrow/return history. |

---

## 6. Frontend Best Practices

### A. Handling Pagination
For `/user` and `/transaction`, always pass `page` and `limit`.
- Example: `GET /api/user?page=1&limit=10`
- The backend will return the specific slice of data.

### B. Dates and Times
The backend expects and returns dates in **ISO 8601** format (e.g., `2024-05-14T10:00:00Z`). Use libraries like `date-fns` or `dayjs` to format these for the UI.

### C. Role-Based UI
The user object contains a `role` (`ADMIN` or `USER`).
- **Admin**: Should see "Add Book", "Manage Users", and "Issue Book" buttons.
- **User**: Should only see their own "Transactions" and the "Book Library".

### D. Testing APIs
Before coding, you can test all endpoints at the interactive Swagger documentation:
👉 **[https://lms-be-q5hd.onrender.com/api-docs/](https://lms-be-q5hd.onrender.com/api-docs/)**

---

## 7. Troubleshooting
- **CORS Errors**: Ensure the backend allows your frontend port (usually 5173 or 3000).
- **403 Forbidden**: You are logged in, but your `role` doesn't have permission for that action.
- **Empty Data**: Check if you are passing the correct `serialNumber` or `userId`.

Happy building! If the API doesn't return what you need, talk to the backend team about modifying the response structure.
