# Concert Tickets Web Application - Frontend

## 🚀 Tech Stack

-   **Framework**: Next.js 15.5.2 with App Router
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4
-   **UI Components**: Lucide React icons
-   **Notifications**: React Hot Toast
-   **Development**: ESLint, Turbopack

## 📋 Prerequisites

Before you start, makesure you have the following installed:

-   Node.js (version 18 or higher)
-   npm, yarn, pnpm, or bun package manager
-   Backend API running (see backend project for setup)

## ️ Getting Started

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Configure Backend URL

Update the backend URL in the configuration file:

```typescript
// src/config/Configuraton.ts
export const BASE_BACKEND_URL = "http://localhost:your-backend-port";
export const UserName = "Username";
```

Make sure the `BASE_BACKEND_URL` matches your running backend server.

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── history/           # History page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── sidebar/          # Sidebar components
│   └── tabContent/       # Tab content components
├── config/               # Configuration files
├── context/              # React Context providers
└── globals.css           # Global styles
```

## Package

-   Tailwind CSS 4 - use for component styling
-   Lucide React - use for icon
-   React Hot Toast - use for notification

## 📝 Features

-   Concert ticket management
-   User authentication context
-   Concert creation and overview
-   Purchase history tracking
-   Modern, responsive UI with Tailwind CSS
