  var express = require("express");
  var bodyParser = require("body-parser");
  var logger = require("morgan");
  var mongoose = require("mongoose");
  require ("./routes/api-routes");

  // Require all models
  var db = require("./models");

  var PORT = process.env.PORT || 3000;

  // Initialize Express
  var app = express();

  // Configure middleware

  // Use morgan logger for logging requests
  app.use(logger("dev"));
  // Use body-parser for handling form submissions
  app.use(bodyParser.urlencoded({ extended: true }));
  // Use express.static to serve the public folder as a static directory
  app.use(express.static("public"));

  app.use(bodyParser.json());

  // By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
  // Connect to the Mongo DB
  mongoose.Promise = Promise;
  mongoose.connect("mongodb://localhost/contactdb", {
    useMongoClient: true
  });

  require("./routes/api-routes.js")(app);
  // var routes = require("./routes/api-routes.js");
  //
  // app.use(routes);

  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
