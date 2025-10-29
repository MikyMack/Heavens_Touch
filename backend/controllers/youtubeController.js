const YoutubeVideo = require("../models/YoutubeVideo");

// Add New Video
exports.addVideo = async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }

    const newVideo = await YoutubeVideo.create({ title, link });
    res.json({ success: true, message: "Video added successfully", video: newVideo }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding video" });
  }
};

// Get All Videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await YoutubeVideo.find().sort({ createdAt: -1 });
    res.render("videos", { title: "Videos", videos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading videos");
  }
};

// Delete Video
exports.deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await YoutubeVideo.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    res.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting video" });
  }
};

exports.editVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }

    const updatedVideo = await YoutubeVideo.findByIdAndUpdate(
      id,
      { title, link },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    res.json({ success: true, message: "Video updated successfully", video: updatedVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error editing video" });
  }
};
