const express = require("express");
const router = express.Router();

module.exports = () => {
  const router = new SignupRouter();
  router.post("/signup", ExpressRouterAdapter.adapt(router));
};

class ExpressRouterAdapter {
  static adapt(router) {
    // call router now...
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
      };
    };
    const httpResponse = await router.route(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
}

// Presentation layer
// signup-router
class SignupRouter {
  // Refactored to by getting rid of express' req and res - independent of expressjs
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = new SignupUsecase().signup(email, password, repeatPassword);
    return {
      status: 200,
      body: user,
    };
  }
}

// Domain layer
// signup-usecase
class SignupUsecase {
  async signup(email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await new AddAccountRepository().add(email, password);
      return user;
    }
  }
}

// Infra layer
// add-account-repo
const mongoose = require("mongoose");
const AccountModel = mongoose.model("Account");

// If we want to replace mongodb -> sql, you need to just change in repository.
class AddAccountRepository {
  add(email, password) {
    return AccountModel.create({ email, password });
  }
}
