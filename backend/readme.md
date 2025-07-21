# User Registration Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. The password will be hashed before storing it in the database.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing the user's first name and last name.
    - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
    - `lastname` (string, optional): The user's last name. Must be at least 3 characters long.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

Example:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Body**: A JSON object containing the authentication token and user information.
    ```json
    {
        "token": "your-auth-token",
        "user": {
            "_id": "user-id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```

### Error
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing the validation errors.
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name must be at least 3 characters long",
                "param": "fullname.firstname",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

## Validation
The following validations are performed on the request body:
- `email`: Must be a valid email format.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

# User Login API Documentation

## POST /users/login

Authenticates existing user and returns JWT token.

### Request Body Example
```json
{
    "email": "john@example.com",  // required, valid email
    "password": "secret123"       // required, min 6 chars
}
```

### Success Response Example

**Status Code**: 200 OK

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
    }
}
```

### Error Response Examples

**Status Code**: 400 Bad Request
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

**Status Code**: 401 Unauthorized
```json
{
    "message": "Invalid email or password"
}
```

### Validation Rules
- Email must be valid format
- Password minimum 6 characters
- Both email and password are required fields

### Security
- Password is compared using bcrypt
- JWT token returned for authentication

# User Profile and Logout Endpoints Documentation

## GET /users/profile

### Description
Retrieves the profile information of the authenticated user.

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Response

#### Success
- **Status Code**: `200 OK`
- **Body**: JSON object containing user information
    ```json
    {
        "_id": "user-id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
    ```

#### Error
- **Status Code**: `401 Unauthorized`
- **Body**:
    ```json
    {
        "message": "Unauthorized"
    }
    ```

## GET /users/logout

### Description
Logs out the current user by invalidating their token and clearing the cookie.

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Response

#### Success
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "message": "Logout successfully"
    }
    ```

### SFeatures
- Adds the token to a blacklist to prevent reuse
- Invalidates current session

#### Error
- **Status Code**: `401 Unauthorized`
- **Body**:
    ```json
    {
        "message": "Unauthorized"
    }
    ```

### Notes
- The token is added to a blacklist to prevent its reuse after logout
- Both cookie-based and header-based token authentication are supported


# Captain Registration Endpoint Documentation

## Endpoint
`POST /captains/register`

## Description
This endpoint registers a new captain with their vehicle information. It validates the input data and creates a new captain account in the system.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing the captain's name information
    - `firstname` (string, required): Captain's first name, minimum 3 characters
    - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address, must be valid email format
- `password` (string, required): Password for the account, minimum 6 characters
- `vehicle`: An object containing vehicle information
    - `color` (string, required): Vehicle color, minimum 3 characters
    - `plate` (string, required): Vehicle plate number, minimum 3 characters
    - `capacity` (integer, required): Vehicle capacity, minimum value of 1
    - `vehicleType` (string, required): Type of vehicle, must be either 'car' or 'motorcycle'

### Expample Response


- `captain` (object):
 -`fullname` (string).
  -`firstname` (string) : User last name ( minimum 3 characters)
  -`lastlname` (string) : User last name ( minimum 3 characters)
-`email` (string): User's email address (must be a valid email)
- `vehicle` (object)
 -`color` (string) vehicle color
 -`capacity` (number) vehicle capacity
 -`vehicleType` (String) vehicle type
 -`plate` (string) vehicle number plate




## Captain Authentication Routes

### Login Captain
- **Endpoint**: POST /captain/login
- **Description**: Authenticates a captain and generates an authentication token
- **Request Body**:
    - `email` (string): Captain's email address
    - `password` (string): Captain's password
- **Validation**:
    - Email must be valid
    - Password must be at least 6 characters long
- **Response**:
    - `200`: Returns captain data and authentication token
    - `400`: Invalid credentials or validation errors

### Get Captain Profile
- **Endpoint**: GET /captain/profile
- **Description**: Retrieves the authenticated captain's profile information
- **Authentication**: Required (Bearer token)
- **Response**:
    - `200`: Returns captain profile data
    - `401`: Unauthorized access

### Logout Captain
- **Endpoint**: GET /captain/logout
- **Description**: Logs out the captain by invalidating the current token
- **Authentication**: Required (Bearer token)
- **Process**:
    - Adds the current token to blacklist
    - Clears authentication cookie
- **Response**:
    - `200`: Successful logout message
    - `401`: Unauthorized access

### Authentication Details
- Token can be provided via:
    - HTTP Authorization header (Bearer token)
    - Cookie named 'token'
- Blacklisted tokens cannot be reused for authentication



## GET /ride/get-fare

### Description
Calculates and returns the estimated fare for a ride between a pickup and destination location.

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Query Parameters

- `pickup` (string, required): The pickup location (minimum 3 characters).
- `destination` (string, required): The destination location (minimum 3 characters).

### Response

#### Success
- **Status Code**: `200 OK`
- **Body**: JSON object containing fare estimates for each vehicle type.
    ```json
    {
        "car": 12.5,
        "motorcycle": 8.3
    }
    ```

#### Error
- **Status Code**: `400 Bad Request`
    ```json
    {
        "errors": [
            {
                "msg": "Invalid pickup",
                "param": "pickup",
                "location": "query"
            }
        ]
    }
    ```
- **Status Code**: `500 Internal Server Error`
    ```json
    {
        "message": "Internal server error"
    }
    ```

### Notes
- Both `pickup` and `destination` must be valid and at least 3 characters long.
- The endpoint uses Google Maps Distance Matrix API to calculate distance and duration.
- Fare is calculated based on distance, duration, and vehicle type.

