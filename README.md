# URL Shortening Service

A solution for the [url-shortening-service](https://roadmap.sh/projects/url-shortening-service) challenge from [roadmap.sh](https://roadmap.sh/dashboard).

This is a simple RESTful API that allows users to shorten long URLs.

## Features
- Create a new short URL

- Retrieve an original URL from a short URL

- Update an existing short URL

- Delete an existing short URL

- Get statistics on the short URL (e.g., number of times accessed)

## Installation

**Clone the Repository**

    git clone --depth=1 https://github.com/neyuqq19/shorten-url-service

    # Install required packages
    npm install express mongoose nanoid

    # Navigate to the project directory
    cd/shorten-url-service

    # Replace the mongoDB URI by your mongoDB connection string

## API Endpoints
**Create Short URL**

Create a new short URL using the POST method

```
POST /shorten
{
  "url": "https://www.example.com/some/long/url"
}
```

**Retrieve Original URL**

Retrieve the original URL from a short URL using the GET method

    GET /shorten/abc123

**Update Short URL**

Update an existing short URL using the PUT method

    PUT /shorten/abc123
    {
    "url": "https://www.example.com/some/updated/url"
    }

**Delete Short URL**

Delete an existing short URL using the DELETE method

    DELETE /shorten/abc123

**Get URL Statistics**

Get statistics for a short URL using the GET method

    GET /shorten/abc123/stats