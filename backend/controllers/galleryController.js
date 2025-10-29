const Gallery = require("../models/Gallery");

// Create
exports.createGallery = async (req, res) => {
    try {
   
      const { title } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Image is required" });
      }
  
      const image = req.file.path;
  
      if (!image) {
        return res.status(400).json({ success: false, message: "Image upload failed" });
      }
  
      const galleryItem = await Gallery.create({ title, image });
  
      res.status(201).json({
        success: true,
        message: "Gallery item created successfully",
        galleryItem,
      });
    } catch (error) {
      console.error("Create Error:", error);
      res.status(500).json({ success: false, message: "Failed to create" });
    }
  };

// List
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gallery.length,
      gallery,
    });
  } catch (error) {
    console.error("List Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch gallery" });
  }
};

// Get one by ID (for editing)
exports.getGalleryById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, galleryItem });
  } catch (error) {
    console.error("Find Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch item" });
  }
};

// Update
exports.updateGallery = async (req, res) => {
  try {
    const { title } = req.body;
    let updateData = { title };

    if (req.file?.path) {
      updateData.image = req.file.path;
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update item" });
  }
};

// Delete
exports.deleteGallery = async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete item" });
  }
};
