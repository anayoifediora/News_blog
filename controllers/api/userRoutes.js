const router = require('express').Router();
const { User } = require('../../models');

//POST route to enable users login 
router.post('/login', async (req, res) => {
    //Find a user with the user's email address
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        //Inform the user if the provided email is invalid
        if(!userData) {
            res.status(400).json({ message: `Invalid username or password, please try again`});
            return;
        }

        //Check that the provided password matches password saved in database
        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: `Invalid username or password, please try again`});
            return;
        }
        //Save the user details in a session after login
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Successfully logged in!"})
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

//POST route to logout users
router.post('/logout', async (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end()
    }
});

//POST route to create a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json({ data: userData, message: `Successfully signed up!`})

        })
        
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET route to get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;