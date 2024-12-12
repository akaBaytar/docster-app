# Docster

> Docster is your go-to platform for seamless document creation and collaboration. Write, edit, and share in real-time with intuitive tools and a clean interface.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
  - [Core Features](#core-features)
  - [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Deployment](#deployment)
- [License](#license)

---

## Live Demo

- Experience Docster live on [Vercel](https://docster-app.vercel.app/).

---

## Screenshots

Take a look at Docster in action:

![Screenshot 1](/public/screen1.png)
![Screenshot 2](/public/screen2.png)

---

## Features

### Core Features

- Rich text editor
- Document CRUD (Create, Read, Update, Delete)
- Document search
- Image upload
- Table support
- Cursor tracking
- Text formatting tools
- Lists and checklists
- Link embedding
- Toast notifications
- Real-time collaboration
- Comments and mentions
- Export to PDF, HTML, TXT, JSON
- User and organization authentication
- Route protection
- Custom error page

### Technologies Used

Docster is built using the latest technologies:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Convex](https://www.convex.dev/)
- [Tiptap](https://tiptap.dev/)
- [Liveblocks](https://liveblocks.io/)

---

## Getting Started

Follow these steps to set up and run Docster locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en) version 22 or higher.
- Accounts and projects set up on:
  - [Clerk](https://dashboard.clerk.com/sign-up)
  - [Convex](https://www.convex.dev/start)
  - [Liveblocks](https://liveblocks.io/api/auth/signup)

### Environment Variables

Create a `.env` file in the root directory and populate it with the following:

```env
CONVEX_DEPLOYMENT=[YOUR_DEV_PROJECT_ENV]
NEXT_PUBLIC_CONVEX_URL=[YOUR_DEV_PROJECT_URL]

CLERK_SECRET_KEY=[YOUR_CLERK_SECRET_KEY]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[YOUR_CLERK_PUBLIC_KEY]

LIVEBLOCKS_SECRET_KEY=[YOUR_LIVEBLOCKS_SECRET_KEY]
```

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/akabaytar/docster-app.git
   cd docster-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Start Convex Functions**
   ```bash
   npx convex dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view Docster in your browser.

---

## Deployment

1. Transition Convex and Liveblocks projects from the development environment to the production environment.
2. Update the `.env` file with production keys.
3. Overwrite build command:
   ```bash
   npx convex deploy --cmd 'npm run build'
   ```
4. Overwrite install command with the legacy peer flag:
   ```bash
   npm install --legacy-peer-deps
   ```
5. Deploy your application to Vercel.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
