var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let days = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']
var magasinSchema = new Schema({
	name: String,
	address: String,
	cp: String, // code postale
	telephone: String,
	sub_category: String,
	category: [],
	location: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
		},
		coordinates: {
			type: [Number], // [longitude, latitude]
			default: [0, 0],
		}
	},
	provider: String,
	logo: {
		type: String,
		default: "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/market_clair_rdjs5l.png"
		// bars: https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/bar_clair_gaqiye.png
		// tabacs: https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/tabac_clair_rk9z9f.png
		// fastfood: https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/fast_clair_xaklzt.png
		// markets: https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/market_clair_rdjs5l.png
	},
	city: String,
	date: Date,
	state: {
		type: String,
		enum: ["active", "pending", "blocked"]
	},


	openingHours: {
		lundi:[],
		mardi: [],
		mercredi: [],
		jeudi: [],
		vendredi: [],
		samedi: [],
		dimanche: []
	},

	// openingHours: {
	// 	lundi:[[{hour: "18H30", positive: 1, negative: 0}], [{hour: "21H00", positive: 0, negative: 1},{hour: "22H00", positive: 1, negative: 0}]],
	// 	mardi: {},
	// 	mercredi: {},
	// 	jeudi: {},
	// 	vendredi: {},
	// 	samedi: {},
	// 	dimanche: {}
	// },

	lastModifTel: Date, // dernière modification pour le tél
	lastModifOpeningHours: Date,
	description: String,

	usersModified: [], // liste des public_id des users qui ont modifié, contenant la date de modificaion=> {public_id: id, date: date}

});

magasinSchema.index({ location: "2dsphere" });


magasinSchema.set('toObject', { getters: true });

magasinSchema.pre('save', function (next){
	if (this.category.includes("Bars")) {
		this.logo = "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/bar_clair_gaqiye.png"
	}else if(this.category.includes("Tabacs")){
		this.logo = "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/tabac_clair_rk9z9f.png"
	}else if(this.category.includes("Fast_food")){
		this.logo = "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/fast_clair_xaklzt.png"
	}else if(this.category.includes("Markets")){
		this.logo = "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/market_clair_rdjs5l.png"
	}else{
		this.logo = "https://res.cloudinary.com/dwndwyf6i/image/upload/v1554490747/bar_clair_gaqiye.png"
	}
	next();
});


magasinSchema.virtual('isOpen').get(function () {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  return this.openingHours.lundi[0].hour >= currentHour && currentHour < this.openingHours.lundi[0].hour;
});




var Magasin = mongoose.model("Magasin", magasinSchema);
exports.Magasin = Magasin;
