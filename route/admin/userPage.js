const { User } = require('../../model/user');

module.exports = async (req, res) => {

    req.app.locals.currentLink = 'user';

    let page = req.query.page;

    let pagesize = 10;
    let count = await User.countDocuments({});
    // res.send('用户总数' + count);
    let total = Math.ceil(count / pagesize);

    let start = (page - 1) * pagesize;

    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}