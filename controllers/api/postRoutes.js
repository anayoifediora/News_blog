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

//POST request to create a post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE request to delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!postData) {
            res.status(404).json({ message: `No post found with this id: ${req.params.id}`});
            return;
        }
        res.status(200).json({ data: postData, message: `Post deleted successfully`})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(!postData) {
            res.status(404).json({ message: `No post found with this id: ${req.params.id}`});
            return;
        }
        res.status(200).json({ data: postData, message: `Post updated successfully`})
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;