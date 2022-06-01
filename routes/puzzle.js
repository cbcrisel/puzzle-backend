const {Router} = require('express');
const multer=require('multer');
const { postPuzzle, getLastPuzzle } = require('../controllers/puzzle');


const router=Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const ext=file.originalname.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+ext);
    }
  })
  
  const upload = multer({storage:storage});

router.post('/api/puzzle',[upload.single('file')],postPuzzle);
router.get('/api/lastPuzzle',getLastPuzzle);


module.exports=router;