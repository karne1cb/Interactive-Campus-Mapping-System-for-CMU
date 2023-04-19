const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path');

const imgUploadPath = path.join(__dirname, '../img_uploads/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imgUploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(" ", ""));
    }
});

const upload = multer({ storage: storage }); // TODO: maybe add a limit in production

// TODO: Add authentication (depends on if locationrequest is implemented or not)
router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        res.status(400).send("Error: No file uploaded");
    } else {
        res.status(200).send(req.file.filename);
    }
    
});

module.exports = router;