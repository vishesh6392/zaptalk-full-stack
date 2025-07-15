# zaptalk-full-stack
full-stack project
# ZapTalk

ZapTalk is a full-stack chat application built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend. It supports user authentication, profile management, and real-time messaging.

## Features

- User signup, login, and logout
- Profile editing with image and cover photo upload (Cloudinary)
- View other users and start conversations
- Responsive UI with Tailwind CSS
- Redux for state management

## Project Structure

```
backend/
  app.js
  controllers/
  model/
  routes/
  config/
  middlewars/
  public/uploads/
frontend/
  chatApp/
    src/
    public/
    package.json
    ...
```

## Getting Started

### Backend

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure environment variables:**  
   Edit `backend/.env` with your MongoDB and Cloudinary credentials.

3. **Start the server:**
   ```sh
   npm run dev
   ```
   The backend runs on `http://localhost:8000`.

### Frontend

1. **Install dependencies:**
   ```sh
   cd frontend/chatApp
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

## Usage

- Visit `http://localhost:5173` in your browser.
- Sign up or log in to start chatting.
- Edit your profile and upload images.
- View online users and start conversations.

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose, Cloudinary, Multer, JWT

## License

MIT

---

Feel free to expand this README with more details as your
