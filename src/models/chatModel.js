module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var NauticSchema = new Schema({
        content: String,
        nickname: String
    });
    return mongoose.model('Chat', NauticSchema);
};
