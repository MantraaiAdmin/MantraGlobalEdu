# API Documentation

Base URL: `http://localhost:4000/api/v1`

## Authentication

### Register
```
POST /auth/register
Body: { email, password, firstName, lastName, phone?, role? }
Response: { user, accessToken, refreshToken }
```

### Login
```
POST /auth/login
Body: { email, password }
Response: { user, accessToken, refreshToken }
```

### Refresh Token
```
POST /auth/refresh
Body: { refreshToken }
Response: { user, accessToken, refreshToken }
```

### Profile (Authenticated)
```
GET /auth/profile
Headers: Authorization: Bearer <token>
Response: { user }
```

## Universities

### List
```
GET /universities?page=1&limit=20&countryId=&search=
```

### By Slug
```
GET /universities/slug/:slug
```

## Countries

### List
```
GET /countries?page=1&limit=20
```

### By Code
```
GET /countries/:code
```

## Courses

### Search
```
GET /courses?query=&countryId=&universityId=&degreeLevel=&tuitionMin=&tuitionMax=&intake=
```

## Scholarships

### Search
```
GET /scholarships?countryId=&universityId=&courseId=&academicScore=&budget=
```

## Public

### Contact
```
POST /public/contact
Body: { name, email, phone?, subject, message }
```

### Book Counseling
```
POST /public/counseling
Body: { name, email, phone, preferredDate?, countryOfInterest?, message? }
```

### Cost Estimate
```
POST /public/cost-estimate
Body: { countryId, tuition, accommodation, livingExpenses, visa, travel, insurance, programDurationYears? }
```

### Articles
```
GET /public/articles?category=
```

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

## Error Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "errors": { "field": ["validation message"] }
}
```
