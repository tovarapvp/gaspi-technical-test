# Gapsi e-Commerce Provider Maintenance

This is a full-stack application for managing e-Commerce providers, consisting of a Spring Boot backend and a React frontend (PWA).

## How to Run

### Backend (Java Spring Boot)
1. Navigate to the root directory:
   ```bash
   cd gapsi
   ```
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.
   Swagger UI is available at `http://localhost:8080/swagger-ui.html`.

### Frontend (React PWA)
1. Navigate to the frontend directory:
   ```bash
   cd gapsi/frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Design Patterns Implemented

The following design patterns were used in the Java backend:

*   **Builder Pattern**: Used in the `WelcomeResponse` DTO to construct complex objects.
    *   File: `src/main/java/com/gapsi/backend/dto/WelcomeResponse.java`
*   **Repository Pattern**: Used to abstract data access logic.
    *   File: `src/main/java/com/gapsi/backend/repository/ProviderRepository.java`
*   **Service Layer Pattern**: Encapsulates business logic and validation.
    *   File: `src/main/java/com/gapsi/backend/service/ProviderService.java`
*   **Singleton Pattern**: Implicitly used by Spring Framework for Beans (Controller, Service, Repository).

## PWA Features

The frontend is configured as a Progressive Web App (PWA) with the following features:

1.  **Manifest File**: `manifest.json` is auto-generated during build, defining the app name, icons, and theme colors for installation.
2.  **Service Worker**: Registered in `src/main.jsx` (via `vite-plugin-pwa`) to enable offline capabilities and caching.
3.  **Installable**: The application can be installed on desktop and mobile devices.
4.  **Responsive Design**: The UI adapts to different screen sizes using Material-UI's Grid and Flexbox layouts.

## Project Structure

*   `src/main/java`: Backend source code.
*   `frontend`: Frontend React application.
    *   `src/screens`: UI Screens (Welcome, Dashboard).
    *   `src/features`: Redux slices.
    *   `src/api`: Axios configuration.
