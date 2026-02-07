# 🐛 Backend Debugging Challenge: The "Broken" Authentication System

## 📖 Scenario
You have just joined the team as a Senior Backend Engineer. Your predecessor shipped a critical **Authentication & User Management Service** right before leaving the company.

The team believes it's ready for production because "the server starts" and "users can register".
**The reality? It's a security nightmare.**

Tokens are being leaked, passwords aren't actually being checked, the logout button crashes the server, and the middleware allows anyone to be an admin. Your mission is to secure the system before the next major release.

## 🎯 Your Mission
Find and fix as many logical, security, and structural bugs as possible.

**The system MUST:**
1.  Register and authenticate users securely (passwords must be hashed and checked correctly).
2.  Manage JWTs properly (Access and Refresh tokens).
3.  Enforce strict token validation (Tokens must exist in the database and be verified against the secret).
4.  Protect routes using robust middleware (Role-based access control).
5.  Handle sessions gracefully (Logout must revoke tokens, Refresh must be secure).

## 🛠️ Tech Stack
- **Node.js**: Runtime
- **Express.js**: API Framework
- **PostgreSQL**: Database
- **Prisma**: ORM

## ❌ What is Broken?
We've received alarming reports from the early beta:
- **Security Mockery**: Users claim they can log in with *any* password.
- **Token Chaos**: Some tokens use hardcoded secrets, and others aren't checked against the database.
- **Broken Middleware**: The auth barrier seems to be "tripping" over its own token parsing logic.
- **Instability**: The system crashes when users try to log out.
- **Identity Crisis**: Admin-only routes are accessible by standard users.

## ✅ Definition of Done
To complete the challenge, you must ensure:
1.  **Authentication Integrity**: `bcrypt` is handled correctly; passwords are never plain-text or bypassed.
2.  **Token Security**: No hardcoded secrets; tokens are correctly parsed from headers and validated against the DB.
3.  **Middleware Reliability**: `auth` middleware correctly identifies users and enforces role-based access.
4.  **Operational Stability**: All endpoints (including logout and refresh) work without crashing the runtime.
5.  **Clean Code**: No "callback hell" or mixed Promise/callback patterns in critical paths.

## 🚀 How to Start
1.  `npm install`
2.  Setup your `.env` (DB credentials).
3.  `npx prisma db push`
4.  `npm run dev`

Good luck, Senior Engineer. The security of our users is in your hands.
