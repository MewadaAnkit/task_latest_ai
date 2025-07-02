# 📚 Bookstore REST API (Node.js + Express)

This is a RESTful API for a Bookstore application built with Node.js and Express.  
It supports **user authentication**, **book CRUD operations**, and **file-based persistence** using JSON files.  
Authentication is handled using **JWT**, and password security is managed using **bcrypt**.

---

## 🚀 Features

### ✅ User Authentication
- **Register** with email and password.
- **Login** and receive a JWT token.
- JWT-protected routes for all `/books` endpoints.

### 📚 Book Management
- Add, view, update, delete books.
- Only the user who added a book can update or delete it.

### 💾 Persistence Layer
- All data (users, books) is stored in local JSON files:
  - `data/users.json`
  - `data/books.json`

### 🔒 Authorization
- Only authenticated users can manage books.
- Authenticated user can only update/delete their own books.

### 🧰 Middleware & Logging
- Logs all requests.
- Handles 404 and general errors.
- Auth middleware to protect routes.

### 🌟 Bonus Features
- `GET /books/search?genre=` — Filter books by genre.
- `GET /books?page=1&limit=10` — Pagination support *(Optional to extend)*.
- Uses `uuid` for unique book IDs.
- Jest test cases included.

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
