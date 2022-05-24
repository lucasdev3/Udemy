const express = require('express');
const Category = require('./Category');
const slugify = require('slugify');

const router = express.Router();

router.get('/admin/categories/new', (req, res) => {
    res.render('./admin/categories/new')
})

router.get('/admin/categories', (req, res) => {

    Category.findAll()
        .then((categories) => {
            res.render('admin/categories/index', {categories: categories});
        })

    
})

router.post('/categories/save', (req, res) => {
    const { title } = req.body;
    if (title) {

        Category.create({
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

router.post('/categories/delete', (req, res) => {
    const { id } = req.body;

    console.log(id)

    if(id) {
        if(!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            })
                .then(() => {
                    res.redirect('/admin/categories');
                })
        } else {
            res.redirect('/admin/categories');
        }
    } else {
        res.redirect('/admin/categories');
    }
})

module.exports = router;