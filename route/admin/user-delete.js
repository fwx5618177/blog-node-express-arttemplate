const { User } = require('../../model/user');

module.exports = (req, res) => {
    // res.send('ok');

    // res.send(req.query.id);
    const users = req.query;

    await User.findOneAndDelete({_id: users.id});

    res.redirect('/admin/user');
}