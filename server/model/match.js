var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var matchSchema = new Schema({
  creator: { type: Schema.ObjectId, ref: "User" },
  participants: [],
  nb_participants: Number,
  date_start: Date,
  date_end: Date,
  requis: [],
  prix_personne: Number,
  sport: String
});

var Match = mongoose.model("Match", matchSchema);
exports.Match = Match;
