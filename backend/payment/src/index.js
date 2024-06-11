const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const momoRoute = require("./controllers/momo-route");
const zalopayRoute = require("./controllers/zalopay-route");
const dotEnv = require("dotenv");
dotEnv.config();

const startService = async () => {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.set("view engine", "ejs");

  app.use("/momo", momoRoute);
  app.use("/zalopay", zalopayRoute);

  app
    .listen(process.env.PORT || 3013, () => {
      console.log(`listening to port ${process.env.PORT}, ${process.env.SERVICE}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startService();
