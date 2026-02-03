# 🛡️ SmartOPD Zod Input Validation

## Overview
This document explains the implementation of **Zod** validation for all SmartOPD API routes that accept user input. Zod provides type-safe schema validation, ensuring data integrity before it reaches the database.

---

## 🎯 Why Zod?

### Problems with Manual Validation:
- ❌ Repetitive code across multiple routes
- ❌ Inconsistent error messages
- ❌ Easy to forget validations
- ❌ No TypeScript type inference
- ❌ Difficult to maintain

### Benefits of Zod:
- ✅ **Type-safe**: Automatic TypeScript type inference
- ✅ **Declarative**: Schema-based validation
- ✅ **Consistent**: Standardized error messages
- ✅ **Composable**: Reusable schemas
- ✅ **Runtime safety**: Validates at runtime, not just compile-time

---

## 📦 Installation

```bash
npm install zod
```

---

## 🗂️ Schema Organization

All validation schemas are organized in `lib/schemas/`:

```
lib/
 └── schemas/
      ├── adminSchema.ts      # Admin signup & login validation
      └── patientSchema.ts    # Patient registration validation
```

---

## 🔍 Schema Definitions

### Admin Schemas

**File**: [lib/schemas/adminSchema.ts](lib/schemas/adminSchema.ts)

```typescript
import { z } from "zod";

export const adminSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
```

**Validation Rules**:
- `name`: Minimum 2 characters
- `email`: Must be valid email format
- `password`: Minimum 6 characters for signup, minimum 1 for login

---

### Patient Schema

**File**: [lib/schemas/patientSchema.ts](lib/schemas/patientSchema.ts)

```typescript
import { z } from "zod";

export const patientRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be 10 digits"),
});
```

**Validation Rules**:
- `name`: Minimum 2 characters
- `phone`: Minimum 10 digits

---

## 🔧 Implementation in API Routes

### 1. Admin Signup Route

**Endpoint**: `POST /api/admin/signup`

**Implementation**:
```typescript
import { adminSignupSchema } from "@/lib/schemas/adminSchema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = adminSignupSchema.parse(body);
    
    // Use validated.email, validated.password, validated.name
    // ... rest of logic
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    // Handle other errors...
  }
}
```

---

### 2. Admin Login Route

**Endpoint**: `POST /api/admin/login`

**Implementation**:
```typescript
import { adminLoginSchema } from "@/lib/schemas/adminSchema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = adminLoginSchema.parse(body);
    
    // Use validated.email, validated.password
    // ... rest of logic
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    // Handle other errors...
  }
}
```

---

### 3. Patient Registration Route

**Endpoint**: `POST /api/patient/register`

**Implementation**:
```typescript
import { patientRegisterSchema } from "@/lib/schemas/patientSchema";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = patientRegisterSchema.parse(data);
    
    // Use validated.name, validated.phone
    // ... rest of logic
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    // Handle other errors...
  }
}
```

---

## 📡 API Testing Examples

### ✅ Successful Requests

#### Admin Signup (Valid)
**Request**:
```http
POST /api/admin/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@smartopd.com",
  "password": "securepass123"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Admin account created successfully",
  "adminId": 1
}
```

---

#### Admin Login (Valid)
**Request**:
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@smartopd.com",
  "password": "securepass123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": 1,
    "email": "admin@smartopd.com"
  }
}
```

---

#### Patient Registration (Valid)
**Request**:
```http
POST /api/patient/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210"
}
```

**Response** (200):
```json
{
  "success": true,
  "token": 1,
  "message": "Token generated successfully"
}
```

---

### ❌ Failed Requests (Validation Errors)

#### Invalid Email
**Request**:
```http
POST /api/admin/signup
Content-Type: application/json

{
  "name": "Admin",
  "email": "invalidemail",
  "password": "pass123"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

#### Password Too Short
**Request**:
```http
POST /api/admin/signup
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

#### Missing Required Fields
**Request**:
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@test.com"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "password",
      "message": "Required"
    }
  ]
}
```

---

#### Name Too Short
**Request**:
```http
POST /api/patient/register
Content-Type: application/json

{
  "name": "J",
  "phone": "1234567890"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

---

#### Phone Too Short
**Request**:
```http
POST /api/patient/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "12345"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "phone",
      "message": "Phone must be 10 digits"
    }
  ]
}
```

---

#### Multiple Validation Errors
**Request**:
```http
POST /api/admin/signup
Content-Type: application/json

{
  "name": "A",
  "email": "bademail",
  "password": "12"
}
```

**Response** (400):
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters"
    },
    {
      "field": "email",
      "message": "Invalid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## 🧪 Testing Checklist

Use Postman or any API testing tool to verify:

### Admin Signup (`POST /api/admin/signup`)
- ✅ Valid signup with all correct fields
- ❌ Invalid email format
- ❌ Password less than 6 characters
- ❌ Name less than 2 characters
- ❌ Missing fields

### Admin Login (`POST /api/admin/login`)
- ✅ Valid login credentials
- ❌ Invalid email format
- ❌ Missing password
- ❌ Empty email

### Patient Registration (`POST /api/patient/register`)
- ✅ Valid patient data
- ❌ Name less than 2 characters
- ❌ Phone less than 10 digits
- ❌ Missing fields

---

## 📸 Postman Testing Screenshots

Include screenshots showing:

1. ✅ **Successful Admin Signup**
   - Request body with valid data
   - 201 response with success message

2. ❌ **Failed Admin Signup (Invalid Email)**
   - Request with invalid email
   - 400 response with validation error

3. ✅ **Successful Admin Login**
   - Request with correct credentials
   - 200 response with token/cookie

4. ❌ **Failed Admin Login (Missing Password)**
   - Request missing password field
   - 400 response with validation error

5. ✅ **Successful Patient Registration**
   - Request with valid name and phone
   - 200 response with token number

6. ❌ **Failed Patient Registration (Short Phone)**
   - Request with phone < 10 digits
   - 400 response with validation error

---

## 🎯 How Validation Works

### Before Zod (Manual Validation):
```typescript
// Manual validation - repetitive and error-prone
if (!email || !password) {
  return error("Missing fields");
}
if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
  return error("Invalid email");
}
if (password.length < 6) {
  return error("Password too short");
}
```

### After Zod (Schema Validation):
```typescript
// Zod validation - clean and type-safe
const validated = adminSignupSchema.parse(body);
// If reaches here, data is guaranteed valid!
```

### Error Handling Pattern:
```typescript
try {
  const validated = schema.parse(data);
  // Continue with valid data
} catch (error) {
  if (error instanceof ZodError) {
    // Return formatted validation errors
    return NextResponse.json({
      success: false,
      errors: error.errors.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    }, { status: 400 });
  }
}
```

---

## 🔒 Security Benefits

1. **Data Integrity**: Prevents malformed data from entering the database
2. **Type Safety**: Catches type mismatches at runtime
3. **SQL Injection Prevention**: Validates data types before database queries
4. **Consistent Validation**: Same rules applied across all routes
5. **Early Failure**: Fails fast before expensive operations

---

## 📚 Advanced Zod Features (Future Enhancements)

### Custom Validations
```typescript
export const phoneSchema = z.string()
  .regex(/^[6-9]\\d{9}$/, "Invalid Indian phone number");
```

### Transform Data
```typescript
export const emailSchema = z.string()
  .email()
  .transform(val => val.toLowerCase());
```

### Optional Fields
```typescript
export const profileSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),  // Optional field
  age: z.number().nullable(),  // Can be null
});
```

### Nested Objects
```typescript
export const addressSchema = z.object({
  user: z.object({
    name: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
    }),
  }),
});
```

---

## 🤔 Reflection & Learning

### Key Takeaways:

1. **Centralized Validation Logic**
   - Zod allowed us to define all validation rules in one place (`lib/schemas/`)
   - Changes to validation rules only require updating the schema file
   - Eliminates scattered validation logic across routes

2. **Improved Developer Experience**
   - TypeScript automatically infers types from Zod schemas
   - Autocomplete works perfectly with validated data
   - Compile-time errors if we use wrong field names

3. **Better Error Messages**
   - Standardized error format across all APIs
   - Clear field-level error messages
   - Easy for frontend to parse and display

4. **Database Protection**
   - Prevents malformed data from reaching Prisma
   - Catches issues before database constraints fail
   - Reduces database errors and rollbacks

5. **Production Readiness**
   - Validation errors return 400 status (client error)
   - Server errors return 500 status (server error)
   - Clean separation of validation vs. business logic errors

### Impact on SmartOPD:

> **"Zod helped enforce strict input validation, prevented malformed data from entering the database, and standardized error messages across our backend. This improved both security and developer experience significantly."**

---

## 📖 Additional Resources

- [Zod Official Documentation](https://zod.dev/)
- [Zod GitHub Repository](https://github.com/colinhacks/zod)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 📝 Summary

### What We Built:
- ✅ Zod schemas for admin signup/login and patient registration
- ✅ Integrated validation in all POST routes
- ✅ Standardized error handling with field-level messages
- ✅ Type-safe data validation with TypeScript inference

### Routes Protected:
1. `POST /api/admin/signup` - Admin registration
2. `POST /api/admin/login` - Admin authentication
3. `POST /api/patient/register` - Patient registration

### Validation Rules Applied:
- **Email**: Must be valid format
- **Password**: Minimum 6 characters
- **Name**: Minimum 2 characters
- **Phone**: Minimum 10 digits

**Remember**: Always validate user input before processing! Zod makes this easy, consistent, and type-safe. 🛡️
