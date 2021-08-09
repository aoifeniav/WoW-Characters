const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');
dotenv.config();

// Multer config
const ACCEPTED_FILE_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.memoryStorage();
const fileFilter = (req, file, callback) => {
    if (!ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error(`File type not valid. File types allowed: ${ACCEPTED_FILE_EXTENSIONS}`);
        error.status = 400;

        return callback(error, true);
    }
    return callback(null, true);
};

const multerUpload = multer({ storage: storage, fileFilter });

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const cloudinaryUpload = (req, res, next) => {
    if (req.file) {

        const endPipe = cloudinary.uploader.upload_stream({ folder: 'chars_pics' }, function (error, file) {
            if (error) next(error);

            req.picUrl = file.url;
            next();
        });

        streamifier.createReadStream(req.file.buffer).pipe(endPipe);
    } else {
        next();
    }
}

module.exports = { multerUpload, cloudinaryUpload };
