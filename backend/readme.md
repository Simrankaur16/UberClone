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
