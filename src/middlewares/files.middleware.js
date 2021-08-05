const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

const ACCEPTED_FILES_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    },
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, '../public/uploads');
        cb(null, directory);
    },
});

const fileFilter = (req, file, callback) => {
    console.log(file);
    if (!ACCEPTED_FILES_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error(`File type not valid. File types allowed: ${ACCEPTED_FILES_EXTENSIONS}`);
        error.status = 400;

        return callback(error, true);
    }
    return callback(null, true);
};

const multerUpload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        const charPic = await cloudinary.uploader.upload(req.file.path);
        req.fileUrl = charPic.secure_url;
        
        await fs.unlinkSync(req.file.path);

        return next();
    } else {
        return next();
    }
}

module.exports = { multerUpload, uploadToCloudinary };
