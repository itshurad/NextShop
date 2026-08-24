# 🛍️ NextStore — Frontend

<div align="center">

### A Modern, Premium E-Commerce Frontend

**NextStore** is a modern and premium e-commerce frontend built with **Next.js 16, React 19, TypeScript, Tailwind CSS v4, HeroUI, and TanStack React Query**.

The project focuses on delivering a polished shopping experience with a **Glassmorphism-inspired UI, responsive layouts, seamless authentication flows, efficient server-state management, and a scalable frontend architecture**.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![HeroUI](https://img.shields.io/badge/HeroUI-NextUI_v2-000000?style=for-the-badge)
![React Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

---

## 📖 About

**NextStore** is a frontend-focused e-commerce project designed to provide a modern shopping experience while demonstrating a clean, scalable, and maintainable architecture for a production-ready Next.js application.

The frontend communicates with an external REST API for authentication, products, categories, users, payments, and other store-related operations.

> **Note:** The backend/API is not part of this repository. The backend service used by this project was developed separately.

---

## 📸 Screenshots & Demo

> Add your screenshots and demo GIFs here.

### 🏠 Homepage

![NextStore Homepage](./docs/screenshots/home.png)

### 🛍️ Store

![NextStore Store](./docs/screenshots/store.png)

### 📦 Product Details

![NextStore Product](./docs/screenshots/product.png)

### ⚙️ Admin Panel

![NextStore Admin Panel](./docs/screenshots/admin.png)

### 🎬 Demo

![NextStore Demo](./docs/demo.gif)

---

## ✨ Features

### 🎨 Premium UI/UX

- ✨ Modern and premium **Glassmorphism-inspired design**
- 🌌 Advanced blur and glow effects
- 🎞️ Smooth transitions and micro-interactions
- 📱 Fully responsive layouts
- 🌓 Seamless Dark / Light mode
- 🎨 Theme integration with **HeroUI + Tailwind CSS**
- 🧩 Reusable UI components
- 📐 Consistent spacing and visual hierarchy
- ⚡ Performance-focused frontend architecture

---

### 🔐 Authentication Experience

The frontend includes a complete OTP-based authentication flow connected to the project's API.

- 📱 OTP-based login
- 🔢 OTP verification flow
- 🔄 Automatic session refresh
- 🍪 Authentication through secure HttpOnly cookies
- 🚫 No direct access to sensitive authentication tokens from client-side JavaScript
- ⚡ Seamless authentication state handling
- 🛡️ Automatic handling of expired sessions

> Authentication and token generation are handled by the external backend API. This repository contains the frontend implementation and integration layer.

---

### 🚦 Smart Axios Interceptors

The frontend uses a customized Axios instance with interceptors for handling authentication-related API responses.

When an API request returns `401 Unauthorized`, the frontend can attempt to refresh the session and retry the failed request.

```text
API Request
     │
     ▼
   Axios
     │
     ▼
  Response
     │
     ├── 2xx ──────────► Return Data
     │
     └── 401
          │
          ▼
    Refresh Session
          │
       ┌──┴──┐
       ▼     ▼
    Success  Failed
       │       │
       ▼       ▼
    Retry    Logout
```

### 🔄 Concurrent Request Handling

The interceptor architecture is designed to prevent multiple simultaneous requests from triggering unnecessary refresh operations.

```text
Request A ──┐
Request B ──┤
Request C ──┼──► 401
Request D ──┘
               │
               ▼
        Single Refresh Flow
               │
               ▼
       Retry Pending Requests
```

This helps provide a smoother user experience when a session expires while several API requests are in progress.

---

## 🧠 Server State Management

NextStore uses **TanStack React Query v5** for managing server state and API data.

React Query provides:

- ⚡ Intelligent caching
- 🔄 Background refetching
- ♻️ Query invalidation
- 📦 Request deduplication
- ⏳ Loading state management
- ❌ Error state management
- 🔁 Automatic synchronization after mutations
- 🚀 Reduced unnecessary API requests

Instead of manually managing every API response inside React state, server data is handled declaratively through React Query.

---

## 🌙 Dark & Light Mode

The application supports dynamic theme switching using:

```text
Next-Themes
     +
HeroUI
     +
Tailwind CSS
```

Users can seamlessly switch between Dark and Light modes while maintaining consistent component styling throughout the application.

---

## 📱 Responsive Design

NextStore follows a responsive-first approach and is optimized for:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop

The UI is designed to maintain a consistent experience across different screen sizes.

---

## 🧰 Tech Stack

| Technology                  | Purpose                          |
| --------------------------- | -------------------------------- |
| **Next.js 16**              | React framework & App Router     |
| **React 19**                | UI development                   |
| **TypeScript**              | Type safety                      |
| **Tailwind CSS v4**         | Styling                          |
| **HeroUI / NextUI v2**      | UI components                    |
| **Next-Themes**             | Theme management                 |
| **Lucide React**            | Icons                            |
| **TanStack React Query v5** | Server-state management          |
| **Axios**                   | API communication & interceptors |

---

## 🏗️ Frontend Architecture

The project is structured around reusable components, centralized API services, custom hooks, and declarative server-state management.

```text
┌────────────────────────────────────┐
│             NextStore              │
│             Frontend               │
├────────────────────────────────────┤
│                                    │
│        Next.js App Router          │
│                │                   │
│        ┌───────┴────────┐          │
│        │                │          │
│     Components        Pages       │
│        │                │          │
│        └───────┬────────┘          │
│                │                   │
│          Custom Hooks              │
│                │                   │
│          React Query               │
│                │                   │
│          Axios Client              │
│                │                   │
└────────────────┼───────────────────┘
                 │
                 ▼
          External REST API
```

The backend API is treated as an external dependency and is not included in this repository.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── (shop)/
│   ├── admin/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── products/
│   ├── admin/
│   └── shared/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── ...
│
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── products.ts
│   └── ...
│
├── providers/
│   ├── QueryProvider.tsx
│   └── ThemeProvider.tsx
│
├── lib/
│   └── ...
│
├── types/
│   └── ...
│
└── styles/
    └── globals.css
```

### 📂 Main Directories

| Directory     | Responsibility                                   |
| ------------- | ------------------------------------------------ |
| `app/`        | Routes, layouts, pages, and App Router structure |
| `components/` | Reusable UI and feature components               |
| `hooks/`      | Custom React hooks                               |
| `services/`   | API clients and endpoint services                |
| `providers/`  | Global providers such as React Query and Theme   |
| `lib/`        | Shared utilities and application logic           |
| `types/`      | TypeScript types and interfaces                  |
| `styles/`     | Global styles and Tailwind configuration         |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Depending on your API configuration, you may need additional environment variables.

> Never commit `.env.local` or sensitive API configuration to the repository.

Recommended `.gitignore` entries:

```gitignore
.env
.env.local
.env.*.local
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js 20+**
- **npm**
- Access to the required NextStore backend API

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nextstore.git
```

### 2. Navigate to the Project

```bash
cd nextstore
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create:

```text
.env.local
```

Then configure your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Start the Development Server

```bash
npm run dev
```

The application should now be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🔌 API Integration

NextStore communicates with an external REST API through a centralized Axios client.

The frontend is responsible for:

- 🌐 API communication
- 🔐 Authentication flow
- 📦 Data fetching
- 🧠 Server-state management
- 🔄 Session refresh handling
- 🎨 Rendering and user interaction

The backend is responsible for:

- Authentication logic
- Database operations
- OTP delivery
- JWT generation
- Product and category management
- Payment processing
- Other business logic

This separation keeps the frontend independent and allows the API layer to evolve separately.

---

## 🎯 Design Philosophy

NextStore is built around a few core principles:

### 🧩 Component-Driven Development

UI elements are designed to be reusable, composable, and easy to maintain.

### 🧠 Separation of Concerns

API communication, server state, UI state, and presentation logic are kept separate wherever possible.

### ⚡ Performance First

The project takes advantage of modern Next.js capabilities and React Query caching to minimize unnecessary work.

### 🎨 Consistent Design

HeroUI, Tailwind CSS, and custom styling are combined to create a consistent visual language throughout the application.

### 📱 Responsive by Default

Every major interface is designed with multiple screen sizes in mind.

---

## 🔮 Future Improvements

Potential frontend improvements include:

- 🔎 Advanced product search
- 🎛️ Advanced filtering and sorting
- ❤️ Wishlist
- ⭐ Product reviews
- 🛒 Improved shopping cart experience
- 💳 Enhanced checkout flow
- 📊 More advanced admin dashboards
- 📈 Analytics visualizations
- 🔔 Notification system
- 🧪 Unit & E2E testing
- ♿ Improved accessibility
- 🚀 Performance optimization
- 📦 Better loading and skeleton states
- 🌍 Internationalization

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Development Flow

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes

# Commit
git commit -m "feat: add amazing feature"

# Push
git push origin feature/amazing-feature
```

Then open a Pull Request with a clear description of your changes.

---

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐.

It helps support the project and encourages further development.

---

<div align="center">

### 🛍️ NextStore

**Modern · Elegant · Scalable**

Built with ❤️ using **Next.js & React**

<br />

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `HeroUI` · `React Query` · `Axios`

</div>
