const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    // res.send('ok');
    const { username, email, role, state } = req.body;
    const id = req.query.id;

    // res.send(body.password);
    let user = await User.findOne({_id: id});
    // res.send(user);

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        // res.send('密码对比成功');
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        })

        res.redirect('/admin/user');

    }else{
        // res.send('密码对比失败');
        let obj = {path: '/admin/user-edit', message: '密码比对失败，不能进行信息修改', id: id};

        next(JSON.stringify(obj));
    }

    // res.send(user);

}