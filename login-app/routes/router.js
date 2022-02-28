const express = require("express");
const router = express.Router();

// like db 😄
const credential = {
  email: "admin@gmail.com",
  password: "123",
};

// login user

router.post("/login", (req, res) => {
  if (
    req.body.email === credential.email &&
    req.body.password === credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
    // res.end("Login Successfully done");
  } else {
    res.end("Invalid User Email");
  }
});

// router for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", {
      user: req.session.user,
    });
  } else {
    res.send("Unauthorized User");
  }
});

// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      req.send("Error Message");
    } else {
      res.render("base", {
        title: "Express",
        logout: "Logout Successful",
      });
    }
  });
});

// exports router

module.exports = router;
