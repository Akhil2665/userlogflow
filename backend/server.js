const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const initializeDB = require("./db");
const { router: authRouter, injectDB } = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Session Middleware
app.use(
  session({
    secret: "MY_SECRET_SESSION",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prevents client-side JS access
      secure: false, // true if using https
      maxAge: 1000 * 60 * 15, // 15 minutes
    },
  })
);

const startServer = async () => {
  const db = await initializeDB();

  // Inject db into routes
  injectDB(db);

  // Register routes
  app.use("/", authRouter);

  app.listen(4000, () => {
    console.log("Server Running at http://localhost:4000/");
  });
};

startServer();
