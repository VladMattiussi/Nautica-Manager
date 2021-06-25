module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var NauticSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
         },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String,
        boats: [{
            boat_name: {
             type: String,
            },
            boat_type: String,
            boat_location: String,
            boat_year: String,
            boat_image: String
        }]
    });
    return mongoose.model('Sailor', NauticSchema);
};
