const express = require('express');
const router = express.Router();
const Magasin =require('../model/magasin').Magasin;
const model = require('../model/model');

const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const path = require('path');
const uuidv4 = require('uuid/v4');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, __dirname+ '/../uploads/');
  },
  filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});


const upload = multer({ storage });



cloudinary.config({
  cloud_name: 'dpofkvram',
  api_key: '147311313925814',
  api_secret: 'uw-XhwmlnVdilrm4NehzVaNiozg'
});


const NodeGeocoder = require('node-geocoder');

let options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBzQLZBmkeISQfftFsgl8GcaSTdMwZdCfk', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

//// route pour obtenir lat lng à partir de l'addresse

router.post('/searchAddress', function (req, res){
	if(req.body.address){
		console.log(req.body)

		geocoder.geocode(req.body.address, function (err, data) {

		  if(!err){
		  	if(data.length==0){
			  	res.json({
			  		success: false,
			  		message: "Cannot find address"
			  	});
		  	}else{
		  		console.log(data)
		  		var addresses = data;
		  		res.json({
		  			success: true,
		  			addresses: addresses
		  		});
		  	}
		  }else{
		  	res.json({
		  		success: false,
		  		message: err
		  	});
		  }
		});
	}else{

		res.send(401);
	}
});

router.post("/getMagasins", (req, res)=>{
	if(req.body){
		let category = req.body.category;
		Magasin.aggregate([
     {
       $geoNear: {
          near: {
            type: "Point",
            coordinates: (req.body.location == null ? [2.3488 , 48.8534] : req.body.location) // [longitude, latitude]
          },
          distanceField: "distance",
          maxDistance: 1000,
          spherical: true
       }
     },
     {
       $match: {
           category: { $in :  (typeof category == "string" ? [category] : category)}
       }
     }
   ]).limit(100).exec((err, magasins)=>{
			if(!err){
				res.json({
					success: true,
					magasins: magasins
				});
			}else{
				res.json({
					success: false,
					message: err
				});
			}
		});
	}else{
		res.send(401);
	}
})

router.post("/getMagasinsSearchBar", (req, res)=>{
	if(req.body.search){
		let search = new RegExp(req.body.search, "i");
		// d'abord si la recherche est un nom de magasin, description, ville, catégorie etc.
		Magasin.find({
			$or: [
				{city: search},
				{address: search},
				{name: search},
				{description: search},
				{category: {$in : [search]}}
			]
		}).limit(100).exec((err, magasins)=>{

			if(!err){
				if(magasins.length>0){
					res.json({
						success: true,
						magasins: magasins
					})
				}else{
					// si aucun magasin trouvé, essayer de geocoder l'adresse et de trouver les magasin à proximité de cette adresse
					geocoder.geocode(req.body.search, function (err, data) {

					  if(!err){
					  	if(data.length>0){
					  		console.log("La recherche contient une adresse")
					  		// la recherche contient une adresse, verifions si c'ets bien en france
					  		let address = data[0];

							Magasin.find({
								location : {
									$near: {
										$geometry:
											{
												type: "Point",
												coordinates: [address.longitude , address.latitude] // [longitude, latitude]
											},
										$maxDistance: 1000,
										$minDistance: 0
									}
								}


							}).limit(100).exec((err, magasins)=>{

								if(!err){
									res.json({
										success: true,
										magasins: magasins
									});
								}else{
									res.json({
										success: false,
										message: err
									});
								}
							});


					  	}else{
							res.json({
								success: false,
								magasins: "Aucun résultat associé à cette recherche..."
							});
					  	}
					  }else{
					  	res.json({
					  		success: false,
					  		message: err
					  	});
					  }
					});
				}
			}else{
				res.json({
					success: false,
					message: err
				});
			}
		});



	}else{
		res.send(401);
	}
})

// route pour uploader

router.post("/uploadFile", upload.single('selectedFile'), (req, res)=>{
	console.log(req.file);

	cloudinary.uploader.upload(__dirname+ '/../uploads/'+req.file.filename, function (result) {
		console.log(result)
		res.json({
			success: true,
			message: "Le fichier a été téléchargé avec succès",
			fileURL: result.secure_url
		})
    });

});

/// route pour ajouter un magasin
router.post("/addCompany", function (req, res){
	console.log(req.body)
	if(req.body.newCompany){

		let newCompany = req.body.newCompany;

		let m = new Magasin();
		// m.openingHours = newCompany.openingHours;
		m.provider = "Anonyme";
		m.name = newCompany.name;
		m.address = newCompany.address;
		m.city = newCompany.city;
		m.cp = newCompany.cp;
		m.telephone = newCompany.telephone;

		m.location.coordinates = newCompany.location;
		//m.description = newCompany.description;
		m.category = newCompany.category;
		m.date = new Date()
		m.state = "active";
		newCompany.fileURL ? (m.logo = newCompany.fileURL) : null;
		console.log(m)
		m.save(function (err, comp){
			res.json({
				success: true,
				message: "Company has been create successfully",
				comp: comp
			})
		});

	}else{
		res.send(401);
	}
});

let validateAddress = (address) => {
  return new Promise((resolve, reject)=>{
    geocoder.geocode(address, function (err, data) {
      if(!err){
        if(data.length==0){
          reject({success: false})
        }else{
          resolve({
            success: true,
            address: data[0]
          })
        }
      }else{
        reject({success: false})
      }
    });
  })
}


/// router pour modifier un magasins
router.post("/submitModifierMagasin", (req, res)=>{
  if(req.body.magasin){
    let magasin = req.body.magasin
    Magasin.findById(magasin._id, (err, m)=>{

      if(!err){
        m.name = magasin.name;
        m.description = magasin.description;
        m.telephone = magasin.telephone
        // si on détecte un changement d'addresse
        if(magasin.address != m.address + " "+m.cp+" "+m.city){

          validateAddress(magasin.address).then(result=>{

            if(result.success){

              m.address = result.address.formattedAddress;
              m.cp = result.address.zipcode
              m.city = result.address.city;
              m.location.coordinates = [result.address.longitude, result.address.latitude]
              m.save((err, doc)=>{
                console.log(err)
                if(!err){
                  res.json({
                    success: true,
                    magasin: doc,
                    message: "L'établissement vient d'être mis à jour. Merci pour votre contribution."
                  })
                }else{
                  res.json({
                    success: false,
                    message: "Erreur inconnue, contactez-nous"
                  })
                }

              })
            }else{
              res.json({
                success: false,
                message: "Adresse invalide, corrigez-la et renvoyez"
              })
            }
          }).catch(err=>{
            res.json({
              success: false,
              message: "Adresse invalide, corrigez-la et renvoyez"
            })
          })
        }else{
          m.save((err, doc)=>{
            if(!err){
              res.json({
                success: true,
                magasin: doc,
                message: "L'établissement vient d'être mis à jour. Merci pour votre contribution."
              })
            }else{

              res.json({
                success: false,
                message: "Erreur inconnue, contactez-nous"
              })
            }
          })
        }








      }else{
        res.send(400)
      }
    })
  }else{
    res.send(401)
  }
})



module.exports = router;
