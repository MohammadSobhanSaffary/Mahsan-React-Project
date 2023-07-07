# Mock Server
Description: This project provides a simple API for searching user records based on query and filters. It utilizes the Flask web framework and includes Swagger documentation for easy API exploration.

## Prerequisites
- Python 3.x
- Flask
- Flasgger
## Installation
Clone the repository or download the project files.

Install the required dependencies by running the following command:


`pip install flask flasgger`

## Getting Started
Open a terminal or command prompt and navigate to the project directory.

Run the following command to start the Flask development server:

`python app.py`

Replace <filename> with the actual name of the Python file containing the code.

Once the server is running, open a web browser and visit http://localhost:5000/apidocs to access the Swagger documentation.

## API Endpoints
### Search Users [/api/v1/search]
POST
Search for users based on query and filters.

- Request (application/json)

- Headers

    `Content-Type: application/json`
- Body
    
    ````
    {
      "query": "example",
      "filters": {
        "exact_age": [30, 40],
        "range_age": [25, 35],
        "name": "John Doe",
        "birthdate": "1990-01-01",
        "interests": ["sport", "book"]
      }
    }
    ````
- Response 200 (application/json)

    ```
  [
      {
        "name": "John Doe",
        "age": 32,
        "birth_date": "1990-01-01",
        "interests": ["sport", "book"]
      },
      {
        "name": "Jane Smith",
        "age": 28,
        "birth_date": "1994-03-15",
        "interests": ["book"]
      }
    ]
    ```
### Definitions
#### SearchRequest (object)

    - query (string): The search query.
    - filters (object):
    - exact_age (array of integers): Filter users by exact age.
    - range_age (array of integers): Filter users by age range.
    - name (string): Filter users by name.
    - birthdate (string): Filter users by birthdate.
    - interests (array of strings): Filter users by interests.
#### SearchResponse (array)
    - User (object):
    - name (string): User's name.
    - age (integer): User's age.
    - birth_date (string): User's birthdate.
    - interests (array of strings): User's interests.


#### Usage
To search for users, send a POST request to the /api/v1/search endpoint with the desired query and filters in the request body. The API will respond with a JSON array containing the matched user records.

You can customize the search logic by modifying the search_users function in the code. Implement the desired search criteria and return a list of serialized user objects.

Feel free to modify the example records in the code to suit your needs.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.