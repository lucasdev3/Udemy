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
            res.render('admin/articles/index.ejs', {articles: articles});
        })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll()
        .then((categories) => {
            res.render('admin/articles/new', {categories: categories})
        })

})

router.get('/admin/articles/edit/:id', (req, res) => {
    const {id} = req.params;
    Article.findByPk(id)
        .then((article) => {
            if (article) {

                Category.findAll()
                    .then((categories) => {
                        res.render('admin/articles/edit', {categories: categories, article: article})
                    })
            } else {
                res.redirect('/');
            }
        })
        .catch((error) => {
            res.redirect('/');
        })
})

// POST

router.post('/articles/save', (req, res) => {
    const {title, body, category} = req.body;
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
    } else {
        res.redirect('/admin/articles/new');
    }
})

router.post('/articles/delete', (req, res) => {
    const {id} = req.body;

    if (id) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            })
                .then(() => {
                    res.redirect('/admin/articles');
                })
        } else {
            res.redirect('/admin/articles');
        }
    } else {
        res.redirect('/admin/articles');
    }
})

router.post('/articles/update', (req, res) => {
    const {id, title, body, category} = req.body;

    console.log(title)

    Article.update(
        {
            title: title,
            body: body,
            category: category,
            slug: slugify(title)
        },
        {
            where: {
                id: id
            }
        }
    )
        .then((response) => {
            console.log(response);
            console.log('atualizado');
            return res.status(200).redirect('/admin/articles');
        })
        .catch((error) => {
            return res.status(400).redirect('/');
        })
})


module.exports = router;