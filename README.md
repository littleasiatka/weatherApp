# 🌦️ WeatherNow

A full-stack weather application built with **React**, **Express** and the **OpenWeather API**.  
Users can search for any city, view detailed current weather, hourly and weekly forecasts, switch between dark/light themes and fetch weather based on their current location.

---

## 📌 Features

### 🔍 Search

- Search for any city in the world
- Auto-formatted and validated queries
- Invalid or unknown cities show a helpful error message

### 📍 Location-Based Weather

- Uses browser geolocation
- Fetches current weather + 7-day forecast for the user’s coordinates
- Adds successful location-based results to search history

### 🕒 Forecast

- 24-hour 3-hourly forecast (free version of OpenWeatherAPI)
- 7-day daily forecast
- Uses icons from OpenWeather
- Automatic icon switching depending on theme (dark/light)

### 🗂️ Search History

- Stored on backend (`history.json`)
- Items can be clicked to reload weather
- Items can be deleted individually

### 🌓 Themes

- Toggle between Light Mode and Dark Mode
- Theme automatically updates icons (day/night versions)

### 🎨 Weather Icons

- Theme-aware color versions
- Used in both `WeatherCard` and `Forecast` components

---

## 🛠️ Technologies Used

**Frontend**

- React (Vite)
- CSS (custom styling)
- Fetch API
- Geolocation API

**Backend**

- Node.js
- Express.js
- Axios (API requests)
- File-based history storage (`history.json`)

**External API**

- OpenWeather REST API
  - Current Weather
  - 5-Day / 3-Hour Forecast
  - Weather by Coordinates

---

## 📁 Project Structure

```
weather-app/
├─ backend/
│ ├─ package.json
│ ├─ package-lock.json
│ ├─ server.js
│ ├─ routes/
│ │ ├─ weather.js
│ │ └─ history.js
│ ├─ services/
│ │ └─ openWeatherService.js
│ └─ data/
│ │ └─ history.json
├─ frontend/
│ ├─ index.html
│ ├─ eslint.config.js
│ ├─ vite.config.js
│ ├─ package.json
│ ├─ package-lock.json
│ ├─ src/
│ ├─ App.jsx
│ ├─ App.css
│ ├─ index.jsx
│ ├─ index.css
│ ├─ main.jsx
│ ├─ components/
│ │ ├─ SearchBar.jsx
│ │ ├─ Forecast.jsx
│ │ ├─ History.jsx
│ │ ├─ Welcome.jsx
│ │ └─ WeatherCard.jsx
│ └─ styles.css
├─ README.md
└─ .gitignore
```

---

## 🔒 Environment Variables

Create a file at `backend/.env`:
OPENWEATHER_API_KEY=your_api_key_here

⚠️ Make sure `.env` is in your `.gitignore` so it does **NOT** get pushed to GitHub.  
Your `.gitignore` (root folder) must include:

```
backend/.env
.env
```

---

## 🚀 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2️⃣ **Install backend dependencies**

```
cd weatherApp/backend
npm install
```

3️⃣ **Add your environment file**

```
touch .env
```

> Add:
> OPENWEATHER_API_KEY=your_api_key_here

4️⃣ **Start backend server**

```
npm start
```

Backend runs on: http://localhost:4000

5️⃣ **Install frontend dependencies**

```
cd ../frontend
npm install
```

6️⃣ Start frontend

```
npm run dev
```

Frontend runs on: http://localhost:5173

## 🧪 How It Works (Technical Breakdown)

### Backend API Endpoints

Endpoint ----- Description

- /api/weather/current?city= ----- Current weather by city name
- /api/weather/daily?city= ----- 7-day + 3-hourly forecast (city)
- /api/weather/current/coords?lat=&lon= ----- Current weather by coordinates
- /api/weather/daily/coords?lat=&lon= ----- 7-day + 3-hourly forecast by coordinates
- /api/history (GET/POST) ----- Manage search history
- /api/history/:city (DELETE) ----- Delete history entry

## 🧰 Design Choices

**✔ React for Frontend**
• Fast rendering
• Component-based structure
• Easy state management (useState, useEffect)

**✔ Express.js Backend**
• Simple routing
• Clean API layer between frontend and OpenWeather
• Hides API key from frontend

**✔ Axios for API Calls**
• Better error handling
• Automatic JSON transformation
• Cleaner syntax

**✔ Local JSON for History**
• Suitable for small-scale university projects
• No complex database required
• Easy to read and modify

**✔ Custom Night Icons**
• SVG icons for high resolution
• Theme-aware (light/dark)
• Replaces low-quality OpenWeather night icons

## 🐞 Known Issues & Future Improvements

    •	Add caching to reduce API calls
    •	Improve icon sets (rain, storms, snow custom versions)
    •	Add unit switching (°C ↔ °F)
    •	Implement autocomplete for city search

---

## 👩‍💻 Author

Anel Naukan
