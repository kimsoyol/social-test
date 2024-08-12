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
│ ├── ├── postsApi.tsx     // API functions for fetching posts and comments
│ ├── dashboard/           // Admin route only
│ ├── ├── page.tsx
│ ├── explore/
│ ├── ├── page.tsx         // Main page for NewsFeed
│ ├── ├── layout.tsx       // Layout component for NewsFeed
│ ├── page.tsx             // Login page
│ ├── layout.tsx           // Main layout component
├── components/            // Reusable components
├── hooks/                 // Custom hooks for state and effects
├── lib/                   // Utility functions & types
├── public/                // Public assets
├── auth.ts                // Authentication-related functions
├── auth.config.ts         // Configuration for authentication (e.g., roles, permissions)
├── middleware.ts          // Middleware for handling authentication and role-based access control
├── tailwind.config.js     // Tailwind CSS configuration
├── tsconfig.json          // TypeScript configuration
├── next.config.js         // Next.js configuration
└── package.json           // Project dependencies and scripts
```



## Installation

To get started with this project, follow the steps below:

1. Clone the repository:
  ```bash
  git clone https://github.com/your-repository.git
  ```

2. Navigate to the project directory:
  ```bash
  cd your-repository
  ```

3. install the dependencies:
  ```bash
  npm install
  ```

4. Run the development server:
  ```bash
  npm run dev
  ```

## Configuration

Ensure that your environment is set up with the following:

 - Node.js (>= 14.x)
 - npm (>= 7.x)
 - TypeScript (>= 4.x)

No additional configuration is needed. Tailwind CSS is pre-configured, and JSON Placeholder is used as the mock API.

## Features

### NewsFeed Design
 - Infinite Scroll: Dynamically load new posts as the user scrolls down.
 - Like and Unlike Counter: A counter to like/unlike posts with visual feedback.
 - Post Detail and Comments: A detailed view of the post with a commenting system.
 - Comment Functionality: Users can add and view comments in real-time.

### RBAC Authentication
 - Role Management: Users are assigned roles (e.g., admin, user) and redirected based on permissions.
 - Permissions: Admins have full permissions; users have read-only access.
 - Protected Routes: Use of HOCs and custom hooks to manage route protection.

## Implementation Details

### Infinite Scroll
 - Infinite Query Setup: The `useInfiniteQuery` hook is used to manage fetching paginated data. It retrieves posts in chunks and determines the next page to load through the getNextPageParam function. This function calculates the next page based on the total number of pages and the current pages fetched.

 - Scroll Event Listener: The handleScroll function checks if the user has scrolled to the bottom of the page. If so, and if there are more pages to fetch (hasNextPage) and none are currently being fetched (!isFetchingNextPage), it triggers fetchNextPage() to load more posts. This function is added as an event listener to the scroll event and removed when the component unmounts.

 - Rendering the Data: The component displays a loading message while fetching data and an error message if there is an issue. It iterates over the fetched pages and renders posts using the Post component. An additional loading indicator is shown when more posts are being fetched.

### Like and Unlike Counter

 - State Management:
liked: Manages whether the post is currently liked by the user.
likeCount: Keeps track of the total number of likes.

 - User Restriction:
The toggleLike function prevents users from liking their own posts by comparing the contentOwnerId with the current user's ID.
Like Toggle Logic:

Clicking the button toggles the liked state and updates the likeCount. It also calls the onToggle callback if provided.

 - UI Elements:
Button: Triggers the toggleLike function. It changes color based on whether the post is liked.
SVG Icon: Represents the like button with conditional coloring (red if liked, gray otherwise).
Like Count: Displays the current number of likes.


### Post Detail and Comments

 - Data Fetching: The useQuery hook is used to fetch the post details and its comments based on the post ID. It handles loading and error states for both the post data and the comments.

 - Post Rendering: The component displays the post's title, body, and a "Like" button. It ensures that the user can view the post content and interact with it by liking it.

 - Comments Management: The Comment component displays existing comments and allows users to add new comments. It manages the comments state locally and prevents users from commenting on their own posts.

 - Comment Submission: A form is provided for submitting new comments, which updates the comments list dynamically. The form includes a text area for input and a submit button.

### Role-Based Access Control

 - Middleware for Route Protection:
Route Checks: The middleware.ts file is responsible for handling route protection and access control based on user authentication and roles. It checks if the user is authenticated and redirects them to appropriate routes based on their authentication status and role.
Protected Routes: Users are redirected to the home page (/) if they try to access protected routes without being authenticated.
Admin Routes: Users who are not admins are redirected from admin-specific routes (e.g., /dashboard) to the /explore page.
Public Routes: Authenticated users are redirected to /explore if they attempt to access public routes that should not be available to logged-in users.

 - Role-Based Component Guard:
RoleGate Component: This component checks the user's role before rendering its children. If the user's role does not match the required role (e.g., "admin"), they are redirected to the /explore page.
Usage in Layout: The RoleGate component is used in the layout for admin routes (/dashboard) to ensure that only users with the "admin" role can access these routes.

## Dependencies

React.js,
Next.js,
TypeScript,
React Query,
Tailwind CSS,
Shadcn,
Zod,
NextAuth, 
bcrypt, 


## Usage
1. NewsFeed: Accessible at the path (/explore). Scroll down to load more posts,  like/unlike posts, and click on comments to view details.
2. Admin Only Route: Accessible at /dashboard. 
3. Login with a mock account to access the panel at, and permissions will be enforced based on user roles.

Admin user
username - admin@email.com
password - 1234

Normal user
username - user@email.com
password - 1234
