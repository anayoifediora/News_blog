const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET request to read a specific post including its associated comments
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: User, 
                attributes: ['username']  }]
        });
        if (!postData) {
            res.status(404).json({ message: `No post found with this id: ${req.params.id}`});
            return;
        }
        return res.status(200).json(postData)
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;