const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

//GET request to read a specific post including its associated comments
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: User, 
                attributes: ['username']  }]
        });
        if (!postData) {
            res.status(404).json({ message: `No post found with this id: ${req.params.id}`});
            return;
        }
        
        const post = postData.get({ plain: true })
        console.log(post)
            res.render('singlepost', { 
                post,
                //Pass the logged in status to the template 
                logged_in: req.session.logged_in
            });
    } catch (err) {
        return res.status(500).json(err)
    }
});

//POST request to create a post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
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