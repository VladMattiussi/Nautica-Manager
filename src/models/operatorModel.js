module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var OperatorSchema = new Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
        services: [{
            name: String,
            info: String
        }]
    });
    return mongoose.model('Operator', OperatorSchema);
};
