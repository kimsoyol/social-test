# Senior Design Engineer Task - React.js and Next.js Application

## Overview

This project is a demonstration of a NewsFeed design similar to Facebook or X (formerly Twitter), and an RBAC (Role-Based Access Control) authentication system for an admin panel. The project is built using React.js, Next.js, TypeScript, and React.js-related libraries.

### Table of Contents

1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Features](#features)
   - [NewsFeed Design](#newsfeed-design)
   - [RBAC Authentication](#rbac-authentication)
5. [Implementation Details](#implementation-details)
   - [Infinite Scroll](#infinite-scroll)
   - [Like and Unlike Counter](#like-and-unlike-counter)
   - [Post Detail and Comments](#post-detail-and-comments)
   - [Role-Based Access Control](#role-based-access-control)
6. [Dependencies](#dependencies)
7. [Usage](#usage)

## Project Structure

The project follows the Next.js App directory structure with the following key folders and files:
```
├── app/
│ ├── api/
│ ├── ├── postsApi.tsx          // API functions for fetching posts and comments
│ ├── dashboard/                // Admin route only
│ ├── ├── page.tsx
│ ├── explore/
│ ├── ├── page.tsx              // Main page for NewsFeed
│ ├── ├── layout.tsx            // Layout component for NewsFeed
│ ├── page.tsx                  // Login page
│ ├── layout.tsx                // Main layout component
├── components/                 // Reusable components
├── hooks/                      // Custom hooks for state and effects
├── lib/                        // Utility functions & types
├── public/                     // Public assets
├── auth.ts                     // Authentication-related functions
├── auth.config.ts              // Configuration for authentication (e.g., roles, permissions)
├── middleware.ts               // Middleware for handling authentication and role-based access control
├── tailwind.config.js          // Tailwind CSS configuration
├── tsconfig.json               // TypeScript configuration
├── next.config.js              // Next.js configuration
└── package.json                // Project dependencies and scripts
```



## Installation

To get started with this project, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository.git

2. Navigate to the project directory:
  ```bash
  cd your-repository

3. install the dependencies:
  ```bash
  npm install

4. Run the development server:
  ```bash
  npm run dev

## Configuration

Ensure that your environment is set up with the following:

 - Node.js (>= 14.x)
 - npm (>= 7.x)
 - TypeScript (>= 4.x)

No additional configuration is needed. Tailwind CSS is pre-configured, and JSON Placeholder is used as the mock API.

## Dependencies

React.js
Next.js
TypeScript
React Query
Tailwind CSS
Shadcn 
Zod
NextAuth 
bcrypt


## Usage
NewsFeed: Accessible at the root path (/). Scroll down to load more posts, like/unlike posts, and click on comments to view details.
Admin Panel: Accessible at /admin. Login with a mock account to access the panel, and permissions will be enforced based on user roles.