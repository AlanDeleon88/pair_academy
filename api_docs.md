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
                "numStudents" : 20,
                "createdAt" : "dateTime",
                "updatedAt" : "dateTime"
            },
            {
                "id" : 2,
                "cohort" : "MAY 2023",
                "teacherId" : 1,
                "numStudents" : 19,
                "createdAt" : "dateTime",
                "updatedAt" : "dateTime"

            }
            ]
        }
        ```

## Get a cohort by ID
- Requese
  - Method: GET
  - URL /api/cohorts/:cohortId
  - Headers:
    - application/json
  - Body : none

  - Successful response
    - Status Code: 200
    - Headers:
      - application/json
    - Body:
      ```json
        {
          "id" : 1,
          "cohort" : "SEPT 2023",
          "instructorId" : 1,
          "createdAt" : "dateTime",
          "updatedAt" : "dateTime"
        }


      ```

## Add a new cohort
- Require Authentication : true
- Request
  - Method: POST
  - URL /api/cohorts
- Headers:
  - application/json
- Body:
```json
  {
    "cohort" : "MAY 2023"
  }
```
- Successful response
- Headers:
  - application/json
- Body:
  ```json
    {
      "cohort" : "MAY 2023",
      "teacherId" : 1,
      "createdAt" : "dateTime",
      "updatedAt" : "dateTime"

     }
  ```

## Get all students for a cohort
- Require Authentication : true
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
  * Error response: Body Validation
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 403,
      "errors": {
        "cohort" : "cannot be null"
      }
    }
    ```
## Add a new Student to cohort
- Require Authentication: true
- Request
  - Method: POST
  - URL : /api/cohorts/:cohortId/students
  - Headers
    - application/json
  - Body:
  ```json
    {
      "firstName" : "John",
      "lastName" : "Doe",
      "email" : "email@email.com",
      "timeZone" : "PST",
      "status" : "present"
    }
  ```
  - Successful Response
  - Status Code : 200
  - Headers
    - application/json
  - Body
  ```json
    {
      "id" : 1,
      "cohortId" : 1,
      "firstName" : "John",
      "lastName" : "Doe",
      "email" : "email@email.com",
      "timeZone" : "PST",
      "status" : "present",
       "createdAt" : "dateTime",
      "updatedAt" : "dateTime"
    }
  ```
  * Error response: student already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "student already exists",
      "statusCode": 403,
      "errors": {
        "email": "student with that email already exists"
      }
    }
    ```
  * Error response: Body Validation
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 403,
      "errors": {
        "email" : "must be a valid email address",
        "firstName" : "must be 2 or more characters long",
        "lastName" : "must be 2 or more characters long",
        "timeZone" : "must be either PST or EST",
      }
    }
    ```


# Students
## Get all students? maybe for a search query?
- Request
  - Method: GET
  - URL /api/students/?query ? optional
  - Headers: none
  - Body: none
- Sucessful response
  - Status Code: 200
  - Headers: application/json
  - Body:
    ```json
      {
        "students" : [
          {
            "id" : 1,
            "firstName" : "John",
            "lastName" : "Doe",
            "email" : "mail@mail.com",
            "cohortId" : 1,
            "timeZone" : "PST",
            "status" : "present",
            "createdAt" : "dateTime",
            "updatedAt" : "dateTime"
          },
          {
            "id" : 1,
            "firstName" : "Jane",
            "lastName" : "Dee",
            "email" : "mail@mail.com",
            "cohortId" : 1,
            "timeZone" : "EST",
            "status" : "absent",
            "createdAt" : "dateTime",
            "updatedAt" : "dateTime"

          }
        ]

      }
    ```

## Get student by id

- Request
  - Method: GET
  - URL: /api/students/:studentId
  - Headers: none
  - Body: none
- Sucessful response
  - Status Code: 200
  - Headers: application/json
  - Body:
    ```json
          {
            "id" : 1,
            "firstName" : "John",
            "lastName" : "Doe",
            "email" : "mail@mail.com",
            "cohortId" : 1,
            "timeZone" : "PST",
            "status" : "present",
            "createdAt" : "dateTime",
            "updatedAt" : "dateTime"
          },
    ```
  * Error response: student could not be found
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "student with that Id could not be found",
      "statusCode": 404,
      "errors": {
        "error": "student with that Id could not be found",
      }
    }
    ```

## Edit a student --> status for "present" / "absent"
- Require Authorization: true
- Request
  - Method: PUT
  - URL: /api/students/:studentId/status
  - Headers:
    - application/json
  - Body :
  ```json
    {
      "status" : "absent"
    }
  ```

- Successful Response
  - Status Code: 201
  - Headers:
    - application/json
  - Body:
  ```json
    {
      "id" : 1,
      "firstName" : "John",
      "lastName" : "Doe",
      "email" : "email@mail.com",
      "cohortId" : 1,
      "status" : "absent",
      "timezone" : "EST",
      "createdAt": "dateTime",
      "updatedAt" : "dateTime"
    }
  ```

  * Error response: student could not be found
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "student with that Id could not be found",
      "statusCode": 404,
      "errors": {
        "error": "student with that Id could not be found",
      }
    }

  * Error response: Body Validation
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Body Validation",
      "statusCode": 403,
      "errors": {
        "status": "cannot be null",
        "status" : "must be equal to either "present" or "absent""
      }
    }

## Edit a student timezone
- Require Authorization: true
- Request
  - Method: PUT
  - URL: /api/students/:studentId/timeZone
  - Headers:
    - application/json
  - Body :
  ```json
    {
      "timeZone" : "PST"
    }
  ```

- Successful Response
  - Status Code: 201
  - Headers:
    - application/json
  - Body:
  ```json
    {
      "id" : 1,
      "firstName" : "John",
      "lastName" : "Doe",
    }
  ```

  * Error response: student could not be found
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "student with that Id could not be found",
      "statusCode": 404,
      "errors": {
        "error": "student with that Id could not be found",
      }
    }

  * Error response: Body Validation
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Body Validation",
      "statusCode": 403,
      "errors": {
        "timeZone": "cannot be null",
        "timeZone" : "must be equal to either "PST" or "EST""
      }
    }


## Edit student info

## Delete a student
