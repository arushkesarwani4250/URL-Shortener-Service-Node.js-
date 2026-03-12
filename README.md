# URL-Shortener-Service-Node.js-
Developed a scalable URL shortener service that converts long URLs into short, easy-to-share links. The system generates unique short codes for each URL and redirects users to the original destination when the short link is accessed.
The service is designed with a modular backend architecture using controllers, services, and routes, ensuring maintainability and scalability. The application also includes analytics features to track link usage and optimize performance.

# Tech Stack

Node.js
Express.js
MongoDB
Redis
Docker
NanoID / ShortID (for unique URL generation)

# Key Features

• Generate unique short URLs for long links
• Fast redirection from short URL to original destination
• Custom short URL support (optional user-defined alias)
• URL validation before storing in database
• Redis caching to improve redirection performance
• Click tracking and basic analytics for shortened URLs
• RESTful API architecture following backend best practices
• Modular backend structure using routes, controllers, and services
• Dockerized service for easy deployment and scaling

# Main API Endpoints

POST /api/url/shorten
Create a short URL from a long URL

GET /:shortCode
Redirect to the original long URL

GET /api/url/:shortCode/stats
Retrieve click statistics for the short URL

DELETE /api/url/:shortCode
Delete a shortened URL

# Project Architecture
src
 ├── controllers
 ├── routes
 ├── services
 ├── models
 ├── middleware
 ├── config
 └── utils
 
# System Workflow

User submits a long URL through the API

Server generates a unique short code

URL and short code are stored in the database

When the short URL is accessed, the system retrieves the original URL

Redis caching speeds up frequent redirects

User is redirected to the original destination
