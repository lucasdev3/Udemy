const express = require('express');
const Category = require('./Category');
const slugify = require('slugify');

const router = express.Router();


router.get('/admin/categories', (req, res) => {

    Category.findAll()
        .then((categories) => {
            res.render('admin/categories/index', {categories: categories});
        })

    
})

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

router.get('/admin/categories/edit/:id', (req, res) => {
    const { id } = req.params;

    if(isNaN(id)) {
        res.redirect('/admin/categories');
    }

    Category.findByPk(id)
        .then((category) => {
            if(category) {
                res.render('admin/categories/edit', {category: category});
            } else {
                res.redirect('admin/categories');
            }
        }) 
        .catch((error) => {
            res.redirect('admin/categories');
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

router.post('/categories/update/:id', (req, res) => {

    // const { id } = req.params;
    const { id, title } = req.body;

    console.log(id)

    if(id) {
        if(!isNaN(id)) {
            Category.update({title: title, slug: slugify(title)}, 
                {
                    where: {id: id}
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