const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//GET request to get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }, { model: User, 
                attributes: ['username']
            }],
            // order: ['createdAt', 'DESC']
        });
        const posts = postData.map((item) => item.get({ plain: true }))
        console.log(posts);
        res.render('homepage', { posts, logged_in: req.session.logged_in, email: req.session.email })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})


module.exports = router;