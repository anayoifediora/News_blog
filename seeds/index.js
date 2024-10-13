const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models/index');

const userSeedData = require('./userData.json');
const postSeedData = require('./postData.json');
const commentSeedData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const users = await User.bulkCreate(userSeedData, { individualHooks: true, });
    const posts = await Post.bulkCreate(postSeedData);
    const comments = await Comment.bulkCreate(commentSeedData);

    process.exit(0);
};

seedDatabase();