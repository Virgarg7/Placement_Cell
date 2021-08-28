const express = require("express");
const router = express.Router();
const multer = require("multer");
const makeCallback = require("../express-callback");
const { resume } = require("../controllers");

// -> Multer Upload Storage
global.__basedir = __dirname;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.params.id + "-profileImage." + file.originalname.split(".").pop()
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({ storage: storage }, fileFilter);

// Routes
router.post("/", makeCallback(resume.addResume));
router.post(
  "/:id/image",
  upload.single("image"),
  makeCallback(resume.updateProfileImage)
);
router.get("/:id", makeCallback(resume.getResume));
router.get("/:id/download", makeCallback(resume.downloadResume));
router.put("/:id", makeCallback(resume.updateResume));
router.delete("/:id", makeCallback(resume.deleteResume));

module.exports = router;
