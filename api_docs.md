# API DOCS

## All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```


# Users endpoints

## Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

## Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: api/session/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Logout a user
- Require Authentication: true
- Request
    - Method: POST
    - URL: /api/session/logout
    - Headers: none
    - Body: none
- Successful response
    - Status Code : 200
    - Headers:
        - application/json
    - Body:
        ```json
            {
                "message" : "logout successful"
            }

        ```
## Get all cohorts that belong to user

- Require Authentication : true
- Request
    - Method: GET
    - URL : /api/users/:userId/cohorts
    - Headers: none
    - Body: none
- Successful response
    - Status Code: 200
    - Headers:
        - application/json
    - Body:
    ```json
        {
            "cohorts":[
                {
                    "id" : 1,
                    "cohort" : "SEPT 2023",
                    "teacherId" : 1,
                    "createdAt" : "dateTime",
                    "updatedAt" : "dateTime"
                }
            ]
        }
    ```

# Cohort Endpoints

## Get all cohorts
- Request
    - Method: GET
    - URL : /api/cohorts
    - Headers: none
    - Body: none
- Successful response
    - Status Code: 200
    - Headers:
        - application/json
    - Body:
        ```json
        {
            "cohorts":[
            {
                "id" : 1,
                "cohort" : "SEPT 2023",
                "teacherId" : 1,
                "createdAt" : "dateTime",
                "updatedAt" : "dateTime"
            },
            {
                "id" : 2,
                "cohort" : "MAY 2023",
                "teacherId" : 1,
                "createdAt" : "dateTime",
                "updatedAt" : "dateTime"

            }
            ]
        }
        ```
## Get all students for a cohort
- Require Authentication : true,
- Request
    - Method: GET
    - URL : /api/cohorts/:cohortId/students
    - Headers: none
    - Body: none
- Sucessful Response:
    - Status Code: 200
    - Headers:
        - application/json
    - Body :
    ```json
        {
            "students":[
                {
                    "id" : 1,
                    "firstName" : "sta",
                    "lastName" : "ffu",
                    "email" : "anEmail@mail.com",
                    "cohortId" : 1,
                    "timeZone" : "PST",
                    "status" : "present",
                    "createdAt" : "dateTime",
                    "updatedAt" : "dateTime"
                },
                                {
                    "id" : 1,
                    "firstName" : "cool",
                    "lastName" : "guyz",
                    "email" : "myEmail2@mail.com",
                    "cohortId" : 1,
                    "timeZone" : "EST",
                    "status" : "absent",
                    "createdAt" : "dateTime",
                    "updatedAt" : "dateTime"
                }

            ]
        }
    ```

# Students
## Get all students? maybe for a search to edit?

## Get student by id

## Add a new Student

## Edit a student --> maybe can change PST / EST and status for "present" / "absent"

## Delete a student
