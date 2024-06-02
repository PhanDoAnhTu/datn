
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const compression = require("compression");


const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(compression());
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

// Define routes and corresponding microservices
const services = [
  {
    route: "/api/user",
    target: "http://localhost:3001",
  },
  {
    route: "/api/product",
    target: "http://localhost:3002",
  },
  {
    route: "/api/social-authentication",
    target: "http://localhost:3003",
  },
  {
    route: "/api/upload",
    target: "http://localhost:3004"
  },
  {
    route: "/api/cart",
    target: "http://localhost:3005",
  },
  {
    route: "/api/discount",
    target: "http://localhost:3006",
  },
  {
    route: "/api/wish-list",
    target: "http://localhost:3007",
  },
  {
    route: "/api/inventory",
    target: "http://localhost:3008",
  },
  {
    route: "/api/special-offer",
    target: "http://localhost:3009",
  },
  {
    route: "/api/category",
    target: "http://localhost:3010",
  },
  {
    route: "/api/blog",
    target: "http://localhost:3011",
  },
  {
    route: "/api/payment",
    target: "http://localhost:3013",
  },
  {
    route: "/api/order",
    target: "http://localhost:3014",
  },
  // Add more services as needed either deployed or locally.
];

// Define rate limit constants
const rateLimit = 500; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

// Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0; // Reset request count for each IP address
  });
}, interval);

// Middleware function for rate limiting and timeout handling
function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip; // Get client IP address

  // Update request count for the current IP
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  // Check if request count exceeds the rate limit
  if (requestCounts[ip] > rateLimit) {
    // Respond with a 429 Too Many Requests status code
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  // Set timeout for each request (example: 10 seconds)
  req.setTimeout(15000, () => {
    // Handle timeout error
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort(); // Abort the request
  });

  next(); // Continue to the next middleware
}

// Apply the rate limit and timeout middleware to the proxy
app.use(rateLimitAndTimeout);

// Set up proxy middleware for each microservice
services.forEach(({ route, target }) => {
  // Proxy options
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  // Apply rate limiting and timeout middleware before proxying
  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});



// Define port for Express server
const PORT = process.env.PORT || 5000;


// Start Express server
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
