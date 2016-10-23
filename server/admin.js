var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//var db = mongojs('contactlist');
var databaseUrl = "quest"; // "username:password@example.com/mydb"
var collections = ["admin","photoGalleryFolder","galleryImages","programs"];
var db = mongojs(databaseUrl, collections);


var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' })

    // var storage = multer.diskStorage({ //multers disk storage settings
    //   destination: function (req, file, cb) {
    //     cb(null, './uploads/');
    //   },
    //   filename: function (req, file, cb) {
    //     var datetimestamp = Date.now();
    //     cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    //   }
    // });


    // var upload = multer({ //multer settings
    //   storage: storage
    // }).single('file');

    router.get('/contactlist', function (req, res) {

      console.log('jjjjjjjjjjjjjj');

      db.contactlist.find(function (err, docs) {
        res.json(docs);
      });
    });



/* GET users listing. */

// Program Controller hits start

router.post('/addPrograms',  function (req, res) {
  db.programs.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});



    router.get('/getAllProgram', function (req, res) {

      console.log('jjjjjjjjjjjjjj');

      db.programs.find(function (err, docs) {
        res.json(docs);
      });
    });



// Program Controller hits End






router.post('/loginCheck',  function (req, res) {
  console.log('87987979987');

  console.log(req.body.username);
  db.admin.findOne(
  {
    $and:[
    {username:req.body.username},
    {pwd: req.body.pwd}]
  },function(err,doc){
    res.json(doc);
  }
  )
});


router.get('/getAllPhoto/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log('sdsdfsdf');
  db.galleryImages.find({folderID: id}, function (err, doc) {
    res.json(doc);
  });
});

router.get('/editPrograms/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log('sdsdfsdf');
  db.programs.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});



router.put('/editPrograms/:id', function (req, res) {
  console.log(req.body);
  var id = req.params.id;
  db.programs.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title , linkTitle3: req.body.linkTitle3 , linkTitle2: req.body.linkTitle2 , linkTitle1: req.body.linkTitle1 , link3: req.body.link3 , link2: req.body.link2 , link1: req.body.link1 , fullDesc: req.body.fullDesc , collName: req.body.collName , desc: req.body.desc , ext: req.body.ext ,youtubeLink : req.body.youtubeLink}},
    new: true}, function (err, doc) {
      res.json(doc);
//console.log('sdfsdf');
    }
    );
});




router.delete('/deletePrograms/:id/:ext', function (req, res) {
  var id = req.params.id;
  db.programs.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    var target_path = 'public/uploads/programs/' + req.params.id+'.'+req.params.ext;

console.log(target_path);

    
if (fs.existsSync(target_path)) {
    fs.unlink(target_path);
}


        res.json(doc);
  });
});




router.delete('/deleteImage/:id/:ext', function (req, res) {
  var id = req.params.id;
  db.galleryImages.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    var target_path = 'public/uploads/' + req.params.id+'.'+req.params.ext;
    fs.unlink(target_path);
        res.json(doc);
  });
});



router.delete('/photoGalleryFolderDelete/:id', function (req, res) {
  var id = req.params.id;
  db.photoGalleryFolder.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});






router.get('/getPhotoGalleryFolder/:id', function (req, res) {
  var id = req.params.id;
  db.photoGalleryFolder.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});


router.put('/editPhotoGalleryFolder/:id', function (req, res) {

  var id = req.body._id;
  console.log(id);
  console.log(req.body);
  db.photoGalleryFolder.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {folderName: req.body.folderName}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
    );
});




router.post('/upload',upload.single('file'), function(req, res) {

    var tmp_path = req.file.path;
    var target_path = 'public/uploads/' + req.body.id+'.'+req.body.ext;
    fs.readFile(tmp_path, function(err, data)
    {
        fs.writeFile(target_path, data, function(err)
        {
            if (err) {
                res.json({status: '200', message: err.message});
            } else {
                fs.unlink(tmp_path);

                res.json({status: '200', message: 'Image uploaded successfully!!'});
            }
        });
    });





 //  upload(req,res,function(err){
 //    if(err){
 //     res.json({error_code:1,err_desc:err});
 //     return;
 //   }
 //   res.json({error_code:0,err_desc:null});
 // });
});





router.post('/programsImageUpload',upload.single('file'), function(req, res) {

    var tmp_path = req.file.path;
    var target_path = 'public/uploads/programs/' + req.body.id+'.'+req.body.ext;
    fs.readFile(tmp_path, function(err, data)
    {
        fs.writeFile(target_path, data, function(err)
        {
            if (err) {
                res.json({status: '200', message: err.message});
            } else {
                fs.unlink(tmp_path);

                res.json({status: '200', message: 'Image uploaded successfully!!'});
            }
        });
    });





 //  upload(req,res,function(err){
 //    if(err){
 //     res.json({error_code:1,err_desc:err});
 //     return;
 //   }
 //   res.json({error_code:0,err_desc:null});
 // });
});









router.post('/addPhoto',  function (req, res) {

console.log(req.body);

  var schema = {folderID : req.body.folderID, imageName : req.body.imageName , ext : req.body.ext };
  db.galleryImages.insert(schema, function(err, doc) {
    res.json(doc);
    console.log(doc);
  });

});





router.post('/createPhotoGalleryFolder',  function (req, res) {
  var schema = {folderName : req.body.folderName};

  db.photoGalleryFolder.insert(schema, function(err, doc) {
    res.json(doc);
  });

});


router.get('/getPhotoGalleryFolder',  function (req, res) {

  console.log('llllllllllllll');

  // var schema = {folderName : req.body.folderName};

  db.photoGalleryFolder.find(function(err, doc) {
    res.json(doc);
  });

});




module.exports = router;
