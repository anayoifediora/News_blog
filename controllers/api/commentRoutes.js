const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//POST request to create a comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            description: req.body.description,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json(commentData);
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;