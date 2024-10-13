const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }]
        });
        return res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;