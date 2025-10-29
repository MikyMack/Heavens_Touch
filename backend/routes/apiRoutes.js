const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const axios = require('axios');
const testimonialController = require('../controllers/testimonialController');
const galleryController = require("../controllers/galleryController");
const { addVideo, getVideos, deleteVideo,editVideo} = require("../controllers/youtubeController");
// Testimonials

router.post('/createTestimonial', testimonialController.createTestimonial);
router.get('/getTestimonials', testimonialController.getTestimonials);
router.get('/getTestimonialById/:id', testimonialController.getTestimonialById);
router.put('/updateTestimonial/:id', testimonialController.updateTestimonial);
router.patch('/updateVerifiedStatus/:id/verify', testimonialController.updateVerifiedStatus);
router.delete('/deleteTestimonial/:id', testimonialController.deleteTestimonial);

router.get("/admin/videos", getVideos);
router.post("/admin/videos", addVideo);
router.get("/admin/videos/delete/:id", deleteVideo);
router.put("/admin/videos/:id",editVideo);
 
router.post("/create-gallery", upload.single("image"), galleryController.createGallery);
router.get("/list-gallery", galleryController.getGallery);
router.get("/single-gallery/:id", galleryController.getGalleryById);
router.put("/updateGallery/:id", upload.single("image"), galleryController.updateGallery);
router.delete("/deleteGallery/:id", galleryController.deleteGallery);

module.exports = router;
