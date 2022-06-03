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
        .catch((error) => {
            console.log(error)
        })
});

router.get('/:id', (req, res) => {

    const { id } = req.params;

    Article.findOne({
        where: {
            id: id
        }
    })
        .then((articles) => {
            console.log("ID " + id)
            if (articles) {
                Category.findAll()
                // console.log(article)
                .then((categories) => {
                    return res.status(200).render('articles', {articles: articles, categories: categories});
                })
            }else {
                console.log("Deu ruim")
                res.redirect('/');
            }
        })
        .catch((error) => {
            console.log(error);
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
                        return res.render('index', {articles: category.articles, categories: categories});
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