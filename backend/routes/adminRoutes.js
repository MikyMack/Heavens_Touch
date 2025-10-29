const express = require('express');

const app = express();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const authMiddleware = require('../middleware/auth'); 
const authController =require('../controllers/authController');
const YoutubeVideo = require('../models/YoutubeVideo');
const Gallery = require('../models/Gallery');

// Admin Login Page
app.get('/login', (req, res) => {
    res.render('admin-login', { title: 'Admin Login' });
});
app.get('/logout', authController.logout);



app.get('/dashboard', authMiddleware, async (req, res) => {
    try {  
        const youtubeVideos = await YoutubeVideo.find().sort({ createdAt: -1 });
        res.render('admin-dashboard', { title: 'Admin Dashboard', youtubeVideos });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


app.get('/admin-testimonials',authMiddleware, (req, res) => {
  res.render('admin-testimonials');
});

app.get('/admin-gallery', authMiddleware, async (req, res) => {
    try {

        const galleryItems = await Gallery.find(); 

        res.render('admin-gallery', { title: 'Admin Galleries', galleryItems });
    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = app;