const express = require('express');

const router = express.Router();

router.get('/admin/articles', (req, res) => {
    res.render('admin/articles/index.ejs')
})

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new')
})

router.post('/articles/save', (req, res) => {
    const { title } = req.body;
    if (title) {

        Article.create({
            title: title,
            slug: slugify(title)
        })
            .then(() => {
                res.redirect('/admin/categories');
            })

    }else {
        res.redirect('/admin/categories/new');
    }
})



module.exports = router;