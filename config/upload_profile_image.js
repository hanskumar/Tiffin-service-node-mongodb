const multer = require('multer');

  const storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
        cb(null, './public/uploads')
      
      },
      filename: function (req, file, cb) {
          //var datetimestamp = Date.now();
          //cb(null, file.fieldname + '-' + req.session.user.username+ '-' + datetimestamp + '.png')

          cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
      }
  });

  const fileFilter = (req, file, cb) => {
        if(
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) {
              cb(null, true);
          } else {
              cb(null, false);
          }
  };

exports.upload = multer({storage: storage,fileFilter: fileFilter}).single('image_upload_file');