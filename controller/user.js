const express = require('express');
const router = express.Router();
const User = require('../models/user.modal');
const BloomFilter = require('../bloomFilter');
const bloomFilterInstance = new BloomFilter();
bloomFilterInstance.start({bitWidth: 1024})

router.get('/', async (req, res) => {
    const username = req.query?.username
    const isPresent = bloomFilterInstance.has(username);
    res.status(201).json({isPresent})
});

router.post('/add', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) throw 'User not found';
        const isPresent = bloomFilterInstance.has(username);
        if (isPresent) throw 'User Already Exist';
      // Create a new user object from the request body
      const user = new User({
        username,
      });
  
      // Save the user object to the database
      const savedUser = await user.save();
    //   const bloomFilterInstance = new BloomFilter();
      bloomFilterInstance.add(username);
      // Send a response back to the client with the saved user object
      res.status(201).json({
        message: 'User created successfully',
        user: savedUser,
      });
    } catch (error) {
      // Send an error response back to the client if there was a problem
      res.status(500).json({
        message: 'Failed to create user',
        error: error.message,
      });
    }
  });

  module.exports = router;