var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id: Number,
	user_id: Number,
	username: String,
	password: String,
}, {collection: 'Users.user'}),

User = mongoose.model('User', userSchema);

module.exports = User;