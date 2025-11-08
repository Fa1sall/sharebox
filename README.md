# 🗂️ ShareBox

**ShareBox** is a secure file management application built with **Node.js**, **Express**, **Prisma**, **EJS** and **PostgreSQL**. It enables users to create folders, upload and organize files, and securely share them through generated links. The project integrates **Supabase** Storage for file handling and uses session-based authentication via **Passport.js** with a Prisma session store for persistence.

## Features

- Session-based user authentication using Passport.js
- Folder-based file management (create, view, delete)
- Secure file upload and retrieval from Supabase Storage
- File information view including name, size, and upload time
- File sharing through generated links
- File operations: view details, download, delete, and share

## Screenshots

## Home Page

![Home Page](public/screenshots/landing.png)

## Signup Page

![Signup Page](public/screenshots/signup.png)

## Folders Page

![Folders Page](public/screenshots/folders.png)

## Files Page

![Files Page](public/screenshots/folder-files.png)

## File Menu

![File Menu Options](public/screenshots/file-menu.png)

## File Details Modal

![File Info Modal](public/screenshots/file-info-modal.png)

## Share File Modal

![Share File Modal](public/screenshots/share-file-modal.png)

## Schema Diagram

![Schema](public/screenshots/schema.png)

## 🛠️ Tech Stack

- **Frontend:** EJS (Templating Engine), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database & ORM:** Prisma ORM, PostgreSQL
- **Authentication & Session:** Passport.js, express-session, @quixo3/prisma-session-store
- **File Storage:** Supabase Storage

## 📁 Project Structure

```
ShareBox/
├── app.js                         # Main Express Server file
│
├── config/
│   ├── passport.js                # Passport.js authentication setup
│   ├── prismaClient.js            # Prisma ORM client configuration
│   └── supabaseClient.js          # Supabase storage configuration
│
├── controllers/
│   ├── authController.js          # Handles user authentication logic
│   ├── fileController.js          # Manages file operations
│   └── foldersController.js       # Handles folder creation and access
│
├── middlewares/
│   ├── auth.js                    # Authentication and access control middleware
│   └── validation.js              # Input validation logic
│
├── models/
│   ├── users.js                   # User model operations
│   ├── folders.js                 # Folder model operations
│   └── files.js                   # File model operations
│
├── prisma/
│   └── schema.prisma              # Prisma schema defining database structure
│
├── public/
│   ├── scripts/                   # Client-side scripts (modals, menus)
│   ├── styles/                    # Compiled and source CSS files
│   └── images/                    # Static images and icons
│
├── routes/
│   ├── index.js                   # Root route
│   ├── folders.js                 # Folder routes
│   └── files.js                   # File routes
│
├── utils/
│   ├── bytesConverter.js          # Converts bytes to readable file sizes
│   └── password.js                # Password hashing and verification helpers
│
├── views/
│   ├── auth/                      # Login, signup, and unauthorized pages
│   ├── partials/                  # Reusable components (e.g., navbar)
│   ├── folders.ejs                # Folders listing page
│   ├── folder.ejs                 # Folder contents view
│   ├── index.ejs                  # Landing page
│   └── error.ejs                  # Error page
│
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation

```

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Fa1sall/sharebox.git
cd sharebox
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```bash
DATABASE_URL="postgresql://username:password@host:port/database_name"
SECRET="your-session-secret"
SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_KEY="your-supabase-key"
BUCKET_NAME="your-supabase-bucket-name"
NODE_ENV="development"
```

Replace the placeholder values with your actual credentials.

### 4. Initialize Prisma

```bash
npm run prisma:migrate:init
```

### 5. Start the development server

```bash
npm start
```
