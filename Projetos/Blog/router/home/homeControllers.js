const express = require('express');
const slugify = require('slugify');

const router = express.Router();

const categoriesController = require('../categories/CategoriesController');
const articlesController = require('../articles/ArticlesController');

const Article = require('../articles/Article');
const Category = require('../categories/Category');

router.use('/', categoriesController);
router.use('/', articlesController);


router.get('/', (req, res) => {

    Article.findAll({
        order: [
            ['id', 'desc']
        ]
    }) 
        .then((articles) => {
            Category.findAll()
                .then((categories) => {
                    res.status(200).render('index', {articles: articles, categories: categories});
                })
        })
});

router.get('/:slug', (req, res) => {

    const { slug } = req.params;

    Article.findOne({
        where: {
            slug: slug
        }
    })
        .then((article) => {
            console.log("SLUG " + slug)
            if (article) {
                Category.findAll()
                console.log(article)
                .then((categories) => {
                    res.status(200).render('index', {articles: article, categories: categories});
                })
            }else {
                res.redirect('/');
            }
        })
        .catch((error) => {
            res.redirect('/');
        })
})

router.get('/category/:slug', (req, res) => {
    const {slug} = req.params;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    })
        .then((category) => {
            if(category) {
                Category.findAll()
                    .then((categories) => {
                        res.render('index', {articles: category.articles, categories: categories});
                    })
            } else {
                res.redirect('/');
            }
        })
        .catch(() => {
            res.redirect('/');
        })
})

module.exports = router;