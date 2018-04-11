//api Routes

const mongoose = require("mongoose");
const db = require("./../models");
const router = require("express").Router();

const api_key = require("../config.js").mailgun;

const domain = 'sandboxa1b3865cf2934bd7b0d3ecd52df4f6f9.mailgun.org';
const Mailgun = require('mailgun-js');

// Routes

module.exports = function(app) {
  // POST route for saving contact
  app.post("/submit", function(req, res) {
    //console.log("accessing submit route", req.body);
    const mailgun = new Mailgun({apiKey: api_key.api_key, domain: domain});

    const data = {
      from: req.body.email,
      to: "zmoumen13@gmail.com",
      subject: `New email from: ${req.body.name}`,
      text: `Sender name: ${req.body.name} \nMessage: ${req.body.comment}`
    };

    db.NewContact.create(req.body)
      .then(function(newContact) {
        //console.log(newContact);
        // res.send("/contact.html");
      })
      .then(mailgun.messages().send(data, function(error, body){
        console.log("hello: ", data);
        if(error) {
          res.json({ error: error})
          console.log(error);
          //res.sendStatus(500)
        }
        else {
          res.sendStatus(200);
          //res.render("../public/contact")
        }
      })
      )
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
}
