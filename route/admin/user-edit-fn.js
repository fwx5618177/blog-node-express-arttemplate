const Joi = require('joi');

const { User,validateUser } = require('../../model/user');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // res.send('ok');
    // res.send(req.body);

    

    try{
        await validateUser(req.body)
    }catch(ex) {
        return next(JSON.stringify({path: '/admin/user-edit', message: ex.message}));
    }

    let user = await User.findOne({email: req.body.email});
    if(user) {
        return next(JSON.stringify({path:'/admin/user-edit', message: '邮箱地址已经存在'}));
    }

    // res.send(user);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    req.body.password = password;

    // res.send(req.body);
    await User.create(req.body);
    res.redirect('/admin/user');

}