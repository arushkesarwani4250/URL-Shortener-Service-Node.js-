## 🚀 About The Project
**URL Shortener Service** is a high-performance backend application designed to convert long URLs into manageable, short links with rapid redirection. It is built to efficiently handle link generation, secure user authentication, and comprehensive link management.
At its core, the system allows users to register, securely authenticate, create custom shortened URLs, and efficiently search through their generated links. To guarantee maximum performance and ultra-fast redirection times, the architecture leverages modern caching strategies to minimize database latency.
### ✨ Key Features
* **Rapid URL Redirection**: Generates collision-resistant, unique short codes (using NanoID) ensuring fast and reliable link resolution.
* **High-Performance Caching**: Fully integrated with **Redis** to cache frequently accessed short links, dramatically reducing database load and speeding up redirection.
* **Secure Authentication**: Robust user registration and login flows protected by structured JWT (JSON Web Tokens) and secure password hashing with bcrypt.
* **Comprehensive Link Management**: Powerful APIs to fetch all user-created links (with built-in pagination) and perform text-based searches across URL names and descriptions.
* **Scalable Architecture**: Built with Node.js and Express.js, strictly following clean and RESTful API design principles.
* **Reliable Data Persistence**: Utilizes MongoDB via Mongoose for the structured and scalable storage of user accounts and URL metadata.
### 🌐 Main API Endpoints
**Authentication**
* `POST /api/v1/auth/create` - Register a new user
* `POST /api/v1/auth/login` - Authenticate and receive a JWT
**URL Management (Protected)**
* `POST /api/v1/shorten` - Create a new short URL
* `GET /api/v1/info` - Retrieve all shortened URLs for the authenticated user (Paginated)
* `GET /api/v1/search` - Search URLs by query string
**Redirection & Utility**
* `GET /:shortCode` - Automatically redirect to the original long URL
* `GET /health` - System health check
