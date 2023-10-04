const multer = require("multer");
const fs = require('fs');
const uploadDir = './uploads';

if(!fs.existsSync(uploadDir))
{
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,"uploads/");
    },
    filename : function (req,file,cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
}
)
const upload = multer({storage});
module.exports = upload;