const express = require('express');
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

const router = express.Router();

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    })
        .then((articles) => {
            console.log(articles[0].dataValues.category);
            res.render('admin/articles/index.ejs', {articles: articles});
        })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll()
        .then((categories) => {
            res.render('admin/articles/new', {categories: categories})
        })
    
})

router.post('/articles/save', (req, res) => {
    const { title, body, category } = req.body;
    if (title) {

        Article.create({
            title: title,
            body: body,
            categoryId: category,
            slug: slugify(title)
        })
            .then(() => {
                res.redirect('/admin/articles');
            })

    }else {
        res.redirect('/admin/articles/new');
    }
})



module.exports = router;