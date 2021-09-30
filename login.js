module.exports = () => {
  router.post("/signup", new SignupRouter().route);

  // router.post("/signin", new Router().signinRoute);
};

// signup-router
const express = require("express");
const router = express.Router();

class SignupRouter {
  // Refactored to - independent of expressjs
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = new SignupUsecase().signup(email, password, repeatPassword);
    return {
      status: 200,
      body: user,
    };
  }
}

// signup-usecase
class SignupUsecase {
  async signup(email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await new AddAccountRepository().add(email, password);
      return user;
    }
  }
}

// add-account-repo
const mongoose = require("mongoose");
const AccountModel = mongoose.model("Account");

// If we want to replace mongodb -> sql, you need to just change in repository.
class AddAccountRepository {
  add(email, password) {
    return AccountModel.create({ email, password });
  }
}
