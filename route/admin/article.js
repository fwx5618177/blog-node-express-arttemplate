const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {
    const page = req.query.page;
    req.app.locals.currentLink = 'article';

    let articles = await pagination(Article).find().page(1).size(2).display(3).populate('author');

    // let articles = await Article.find().populate('author');

    res.render('admin/article.art', {
        articles: articles
    });
}