import Brochure from "../models/Brochure.js";
import fs from "fs";

export const uploadBrochure = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const brochure = new Brochure({
      title: req.body.title,

      fileUrl: req.file.path,
    });

    await brochure.save();

    res.json({
      message: "Brochure uploaded",

      brochure,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBrochures = async (req, res) => {
  try {
    const brochures = await Brochure.find().sort({
      createdAt: -1,
    });

    res.json(brochures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.findById(req.params.id);

    if (!brochure) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    // delete file

    if (fs.existsSync(brochure.fileUrl)) {
      fs.unlinkSync(brochure.fileUrl);
    }

    await brochure.deleteOne();

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
