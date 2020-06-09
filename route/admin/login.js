const {User} = require('../../model/user');

const bcrypt = require('bcrypt');


module.exports = async (req, res) => {
    // res.send(req.body);
    // let email = req.body.email;
    
    const {email, password} = req.body;
    // const email = req.body.email;
    // const password = req.body.password;
    // const {password} = req.body;
    // res.send(email);
    // res.send(password);
    // res.send(email, password);
    // const data = res.body;
    // res.render();
    console.log('开始传输 email', email, password);
    // if(data.email.trim().length == 0 || data.password.trim().length == 0)   return res.status(400).send('Error');
    // if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('Error');
    if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {msg: '邮箱或密码错误'});
    console.log('完毕', email, password);

    let user = await User.findOne({email});

    if(user) {

        let isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
            req.session.username = user.username;
            // res.send('Login success.');
            // app.locals.userInfo = user;
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
          
        } else {
            res.status(400).render('admin/error', {msg: 'error'});
        }
    } else{
        res.status(400).render('admin/error', {msg: 'error'});
    }

}