from datetime import date

from flask import Flask, request, jsonify
from flasgger import Swagger
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

interests_options = ['sport', 'movie', 'book', 'playstation', 'travel']


class Record:
    def __init__(self, name, age, interests, birthdate):
        self.name = name
        self.age = age
        self.interests = interests
        self.birthdate = birthdate

    def serialize(self):
        return {"name": self.name,
                "age": self.age,
                "interests": self.interests,
                "birthdate": self.birthdate.strftime("%Y-%m-%d")}

    def values(self):
        values = [self.name, self.age, self.birthdate]
        values.append(v for v in self.interests)
        return values

# Generate 100 random records
records = [
    Record("Alice Johnson", 28, ["movie", "book"], date(1993, 5, 15)),
    Record("Bob Thompson", 35, ["sport", "playstation"], date(1986, 9, 22)),
    Record("Charlie Davis", 42, ["travel", "book"], date(1979, 11, 7)),
    Record("David Wilson", 31, ["sport"], date(1990, 2, 28)),
    Record("Emma Martinez", 52, ["movie", "travel"], date(1969, 7, 14)),
    Record("Frank Anderson", 44, ["sport", "book"], date(1977, 4, 9)),
    Record("Grace Thomas", 26, ["travel"], date(1995, 8, 19)),
    Record("Henry Lee", 38, ["movie", "playstation"], date(1983, 3, 12)),
    Record("Isabella Hernandez", 23, ["book"], date(1998, 10, 5)),
    Record("Jack White", 47, ["sport", "travel"], date(1976, 1, 2)),
    Record("Kate Clark", 29, ["movie", "book"], date(1992, 6, 26)),
    Record("Liam Lewis", 36, ["sport", "playstation"], date(1985, 12, 17)),
    Record("Mia Baker", 50, ["book"], date(1972, 3, 30)),
    Record("Noah Turner", 33, ["travel", "playstation"], date(1988, 8, 11)),
    Record("Olivia Ward", 41, ["sport", "movie"], date(1980, 2, 23)),
    Record("Patrick Foster", 27, ["book", "playstation"], date(1994, 9, 7)),
    Record("Quinn Reed", 39, ["movie"], date(1982, 4, 18)),
    Record("Ruby Phillips", 49, ["sport", "travel"], date(1973, 6, 3)),
    Record("Samuel Stewart", 32, ["book"], date(1989, 11, 16)),
    Record("Taylor Bell", 45, ["sport", "movie"], date(1976, 12, 28)),
    Record("Uma Richardson", 30, ["travel", "book"], date(1991, 3, 21)),
    Record("Victor Cooper", 51, ["sport", "playstation"], date(1970, 10, 14)),
    Record("Willow Young", 25, ["movie"], date(1996, 1, 25)),
    Record("Xavier Harris", 43, ["sport", "travel"], date(1978, 5, 8)),
    Record("Yara King", 34, ["book"], date(1987, 7, 31)),
    Record("Zoe Robinson", 48, ["sport", "playstation"], date(1974, 9, 13)),
    Record("Adam Scott", 37, ["movie"], date(1984, 2, 6)),
    Record("Benjamin Green", 24, ["sport", "travel"], date(1997, 4, 27)),
    Record("Chloe Brooks", 40, ["book"], date(1981, 6, 9)),
    Record("Daniel Mitchell", 53, ["sport", "movie"], date(1968, 8, 22))
]


@app.route('/api/v1/search', methods=['POST'])
def search():
    """
    Search for users based on query and filters
    ---
    tags:
      - Search API
    parameters:
      - name: body
        in: body
        required: true
        schema:
          $ref: "#/definitions/SearchRequest"
    responses:
      200:
        description: Successful response
        schema:
          $ref: "#/definitions/SearchResponse"
    definitions:
      SearchRequest:
        type: object
        properties:
          query:
            type: string
          filters:
            type: object
            properties:
              exact_age:
                type: array
                items:
                  type: integer
              range_age:
                type: array
                items:
                  type: integer
              name:
                type: string
              birth_date:
                type: string
                format: date
              interests:
                type: array
                items:
                  type: string
      SearchResponse:
        type: array
        items:
          $ref: "#/definitions/User"
      User:
        type: object
        properties:
          name:
            type: string
          age:
            type: integer
          birth_date:
            type: string
            format: date
          interests:
            type: array
            items:
              type: string
    """
    # Parse the request JSON
    request_data = request.get_json()

    # Extract the query and filters from the request
    query = request_data.get('query')
    filters = request_data.get('filters')

    # Perform the search logic using the query and filters
    # Replace this with your actual search implementation
    results = search_users(query, filters)

    # Prepare the response JSON
    response_data = []
    for result in results:
        user = {
            'name': result['name'],
            'age': result['age'],
            'birth_date': result['birthdate'],
            'interests': result['interests']
        }
        response_data.append(user)

    # Return the response JSON
    return jsonify(response_data)

def search_users(query, filters):
    # Replace this function with your actual search logic
    # Implement the search based on the query and filters
    # Return a list of user objects matching the search criteria
    # This is just a dummy implementation for demonstration purposes
    name_filter = filters.get('name')
    age_filters = filters.get('exact_age')
    age_range = filters.get('range_age')
    interests = filters.get('interests')
    birthdate = filters.get('birthdate')

    filtered_records = []
    for record in records:
        # Full-text search
        if query and not any(query in str(value).lower() for value in record.values()):
            continue

        # Name filter
        if name_filter and name_filter.lower() not in record.name.lower():
            continue

        # Exact age filter
        if age_filters and str(record.age) not in map(str, age_filters):
            continue

        # Age range filter
        if age_range and (len(age_range) == 2) and (not (age_range[0] <= record.age <= age_range[1])):
            continue

        # Interests filter
        if interests and not any(interest in record.interests for interest in interests):
            continue

        # Birthdate filter
        if birthdate and birthdate != record.birthdate.strftime("%Y-%m-%d"):
            continue

        filtered_records.append(record.serialize())
    return filtered_records

if __name__ == '__main__':
    app.run()