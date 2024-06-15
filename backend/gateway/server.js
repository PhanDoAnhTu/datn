
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
  {
    route: "/api/banner",
    target: "http://localhost:3015",
  },
  {
    route: "/api/contact",
    target: "http://localhost:3016",
  },
  {
    route: "/api/pageus",
    target: "http://localhost:3017",
  },
  {
    route: "/api/menu",
    target: "http://localhost:3018",
  },
];

const rateLimit = 1000; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

const requestCounts = {};

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0; // Reset request count for each IP address
  });
}, interval);

function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip; // Get client IP address

  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  req.setTimeout(60000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort();
  });

  next();
}

app.use(rateLimitAndTimeout);

services.forEach(({ route, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
