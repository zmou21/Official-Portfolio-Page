  const express = require("express");
  const bodyParser = require("body-parser");
  const logger = require("morgan");
  const mongoose = require("mongoose");
  require ("./routes/api-routes");

  // Require all models
  const db = require("./models");

  const PORT = process.env.PORT || 3000;

  // Initialize Express
  const app = express();

  // Configure middleware

  // Use morgan logger for logging requests
  app.use(logger("dev"));
  // Use body-parser for handling form submissions
  app.use(bodyParser.urlencoded({ extended: true }));
  // Use express.static to serve the public folder as a static directory
  app.use(express.static("public"));

  app.use(bodyParser.json());

  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/contactdb";

  // By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
  // Connect to the Mongo DB
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI, {
    useMongoClient: true
  });

  require("./routes/api-routes.js")(app);
  // const routes = require("./routes/api-routes.js");
  //
  // app.use(routes);

  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
