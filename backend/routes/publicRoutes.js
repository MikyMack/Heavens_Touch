const express = require('express');
const router = express.Router();

const Testimonial = require('../models/Testimonial');
const Verse = require("../models/Verse");
const Gallery = require('../models/Gallery');
require("../utils/verseScheduler");
const YoutubeVideo = require('../models/YoutubeVideo');


router.get('/', async (req, res) => {
    try {
        const testimonialsList = await Testimonial.find({ verified: true })
            .sort({ createdAt: -1 })
            .limit(25);

        const verse = await Verse.findOne().sort({ _id: -1 });
        const latestYoutubeVideos = await YoutubeVideo.find().sort({ createdAt: -1 }).limit(2);

        res.render('index', { 
            title: 'Home',
            testimonials: testimonialsList,
            verse,
            youtubeVideo: latestYoutubeVideos // now contains an array of the last two videos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading home page data');
    }
});

router.get('/about', async (req, res) => {
    try {    
        res.render('about', { 
            title: 'About Us',    
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading about us page data');
    }
});


router.get('/gallery', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = parseInt(req.query.perPage, 10) || 12;
        const skip = (page - 1) * perPage;
        const query = {}; 

        const total = await Gallery.countDocuments(query);
        const galleryItems = await Gallery.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage);

        const totalPages = Math.ceil(total / perPage);

        res.render('gallery', { 
            title: 'Gallery',
            galleryItems,
            currentPage: page,
            totalPages,
            perPage,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading gallery page data');
    }
});


router.get('/contact', async (req, res) => {
    try {
        res.render('contact', { title: 'contact us'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading contact page data');
    }
});
router.get('/faith-statement', async (req, res) => {
    try {
        res.render('faith-statement', { title: 'Faith Statement'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading Faith Statement page data');
    }
});



module.exports = router;