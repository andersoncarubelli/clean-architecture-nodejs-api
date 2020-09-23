const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

module.exports = () => {
    const router = new SignUpRouter()
    router.post('/singup', ExpressRouterAdapter.adapt(router))
}

class ExpressRouterAdapter {
    static adapt(router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = await router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}

class SignUpRouter {
    async route(httpRequest) {
        const { email, password, reapeatPassword } = httpRequest.body
        const user = new SignUpUseCase.signUp(email, password, reapeatPassword)
        return {
            statusCode: 200,
            body: user
        }
    }
}

class SignUpUseCase {
    async signUp(email, password, reapeatPassword) {
        if (password == reapeatPassword) {
            new AddAccountRepository().add(email, password)
        }
    }
}

class AddAccountRepository {
    async add(email, password) {
        const user = await AccountModel.create({ email, password })
        return user
    }
}