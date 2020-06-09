// import mongoose
const mongoose = require('mongoose');
const Joi = require('joi');

const bcrypt = require('bcrypt');

// create a rule in user collections
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    state: {
        type: Number,
        default: 0
    }

});

// create collections
const User = mongoose.model('User', userSchema);

async function createUser () {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123', salt);
    const user = await User.create({
        username: 'fwx',
        email: 'fwx5618177@gmail.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// createUser();

const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名1不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9](3,30)$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值设置不对')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validateUser
}