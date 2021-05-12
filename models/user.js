var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Give it a {collection: name_of_collection} to point to what collection you want to take
// userSchema = new Schema( {
// 	user_id: Number,
// 	username: String,
// 	password: String
// }, {collection: 'user'}),

userSchema = new Schema( {
	user_id: Number,
	username: String,
	password: String
}),

// model is very important, point to the right database(model) name to get access correctly
User = mongoose.model('Users', userSchema, 'user');

// So we are now in Users.user
module.exports = User;
