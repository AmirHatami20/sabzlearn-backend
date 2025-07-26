const {UploadClient} = require("@uploadcare/upload-client");
const client = new UploadClient({publicKey: process.env.UPLOADCARE_PUBLIC_KEY});

const uploadImage = async (req, res, next) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send({
            success: false,
            message: 'Please upload a file!',
        });
    }

    try {
        const result = await client.uploadFile(file.buffer, {
            fileName: file.originalname,
            contentType: file.mimetype,
        });

        req.imageUrl = `https://ucarecdn.com/${result.uuid}/`;

        next();
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};

module.exports = uploadImage;
