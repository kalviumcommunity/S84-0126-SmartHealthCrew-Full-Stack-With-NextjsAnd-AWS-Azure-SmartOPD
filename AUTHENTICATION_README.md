# 🔐 SmartOPD Authentication System

## Overview
This document explains the authentication system implemented for SmartOPD using **bcrypt** for password hashing and **JWT (JSON Web Tokens)** for session management.

---

## 🏗️ Architecture

### Authentication Flow
```
1. User Registration (Signup)
   ├─ User submits: name, email, password
   ├─ Password is hashed using bcrypt
   ├─ Admin record created in database
   └─ Success response returned

2. User Login
   ├─ User submits: email, password
   ├─ System retrieves admin from database
   ├─ Password compared with stored hash
   ├─ JWT token generated (valid for 1 hour)
   └─ Token returned to client

3. Protected Route Access
   ├─ Client sends request with JWT token in headers
   ├─ Server validates token
   ├─ If valid: access granted
   └─ If invalid/expired: access denied
```

---

## 🔑 Password Hashing with bcrypt

### What is bcrypt?
bcrypt is a password-hashing function designed to be slow and computationally expensive, making brute-force attacks impractical.

### How it works:
1. **Salt Generation**: A random salt is generated
2. **Hashing**: Password + salt are hashed using the bcrypt algorithm
3. **Storage**: Only the hash is stored in the database (never the plain password)

### Code Example:
```typescript
// Hashing during signup
const hashedPassword = await bcrypt.hash(password, 10);
// The number 10 represents the "cost factor" (number of rounds)

// Verification during login
const isValid = await bcrypt.compare(password, user.password);
// Returns true if passwords match, false otherwise
```

### Security Benefits:
- ✅ **Irreversible**: Cannot decrypt the hash back to original password
- ✅ **Unique salts**: Same password produces different hashes
- ✅ **Slow by design**: Prevents rapid brute-force attempts

---

## 🎫 JWT (JSON Web Token)

### What is JWT?
A JWT is a compact, URL-safe token that contains encoded user information and is cryptographically signed.

### Structure:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MjQyNjIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header.Payload.Signature
```

### How it works:
1. **Creation**: Server creates JWT after successful login
2. **Transmission**: Token sent to client
3. **Storage**: Client stores token (localStorage/sessionStorage/cookies)
4. **Usage**: Client includes token in Authorization header for protected routes
5. **Verification**: Server validates signature and expiry

### Code Example:
```typescript
// Token generation during login
const token = jwt.sign(
  { id: user.id, email: user.email },  // Payload
  JWT_SECRET,                           // Secret key
  { expiresIn: "1h" }                   // Expiry time
);

// Token verification in protected routes
const decoded = jwt.verify(token, JWT_SECRET);
// Returns decoded payload if valid
// Throws error if invalid or expired
```

### Security Considerations:
- ✅ **Stateless**: Server doesn't need to store sessions
- ✅ **Tamper-proof**: Any modification invalidates the signature
- ⚠️ **Token expiry**: Set appropriate expiration times
- ⚠️ **Secret management**: Store JWT_SECRET in environment variables

---

## 📡 API Endpoints

### 1. Signup API
**Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Signup successful",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "createdAt": "2026-02-03T10:30:00.000Z"
  }
}
```

**Error Response** (400 - User exists):
```json
{
  "success": false,
  "message": "Admin already exists"
}
```

---

### 2. Login API
**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (404 - User not found):
```json
{
  "success": false,
  "message": "Admin not found"
}
```

**Error Response** (401 - Invalid password):
```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

### 3. Protected Route (Example)
**Endpoint**: `GET /api/users`

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Protected route access granted",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "iat": 1616239022,
    "exp": 1616242622
  }
}
```

**Error Response** (401 - Missing token):
```json
{
  "success": false,
  "message": "Token missing"
}
```

**Error Response** (403 - Invalid token):
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## 🧪 Testing with Postman

### Step 1: Test Signup
1. Open Postman
2. Create new request: `POST` → `http://localhost:3000/api/auth/signup`
3. Go to **Body** → **raw** → **JSON**
4. Paste:
```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```
5. Click **Send**
6. Expected: Status 200, success message with user data

### Step 2: Test Login
1. Create new request: `POST` → `http://localhost:3000/api/auth/login`
2. Body:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
3. Click **Send**
4. Expected: Status 200, success message with token
5. **Copy the token value**

### Step 3: Test Protected Route
1. Create new request: `GET` → `http://localhost:3000/api/users`
2. Go to **Headers** tab
3. Add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE` (paste the token from Step 2)
4. Click **Send**
5. Expected: Status 200, success message with decoded user data

---

## 🖼️ Postman Screenshots Checklist
Include screenshots of:
- ✅ Signup request and response
- ✅ Login request and response (with token)
- ✅ Protected route with valid token
- ✅ Protected route with invalid/missing token (error)

---

## 🔒 Security Best Practices

### 1. Token Storage
**Frontend Options**:
- ❌ **localStorage**: Vulnerable to XSS attacks
- ✅ **httpOnly cookies**: More secure (not accessible via JavaScript)
- ✅ **sessionStorage**: Cleared when tab closes

**Recommendation**: Use httpOnly cookies with SameSite attribute

### 2. Token Expiry
- Current: 1 hour
- Consider: Refresh tokens for longer sessions
- Implement: Automatic token renewal before expiry

### 3. Environment Variables
Always store secrets in `.env.local`:
```env
JWT_SECRET=your_super_secret_key_here_min_32_chars
```
Never commit `.env.local` to git!

### 4. HTTPS
- Always use HTTPS in production
- Tokens sent over HTTP can be intercepted

### 5. Password Requirements
Consider adding validation:
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### 6. Rate Limiting
Implement rate limiting to prevent brute-force attacks:
- Max 5 login attempts per 15 minutes per IP
- Temporary account lockout after failed attempts

---

## 🤔 Reflection & Learning

### What I Learned:

1. **Password Security**
   - Never store plain text passwords
   - bcrypt's salt ensures unique hashes
   - Higher cost factor = slower but more secure

2. **JWT Benefits**
   - Stateless authentication (no server-side session storage)
   - Scalable across multiple servers
   - Contains user data in the token itself

3. **Security Trade-offs**
   - Token expiry balances security vs. user experience
   - Longer expiry = convenience but higher risk if token stolen
   - Shorter expiry = more secure but frequent re-logins

4. **Token Management Challenges**
   - How to invalidate tokens before expiry? (logout)
   - Solution: Token blacklist or short expiry + refresh tokens

5. **Next Steps**
   - Implement refresh token mechanism
   - Add role-based access control (RBAC)
   - Implement password reset functionality
   - Add email verification
   - Set up OAuth providers (Google, GitHub)

---

## 📚 Additional Resources

- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [JWT.io - Introduction](https://jwt.io/introduction)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 📝 Summary

This authentication system provides:
- ✅ Secure password hashing with bcrypt
- ✅ Stateless authentication with JWT
- ✅ Protected API routes
- ✅ Clear error handling
- ✅ Ready for production with proper environment variables

**Remember**: Security is an ongoing process. Regularly update dependencies and stay informed about new vulnerabilities!
