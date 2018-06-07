module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        userName: { type: String },
        password: { type: String },
        mobile: { type: String },
        sex: { type: String },
        lastLoginUA: { type: String },
        timestamp: { type: String },
        aliPay: { type: Object },
        level: { type: Number },
        nickname: { type: String }
    });

    return mongoose.model('User', UserSchema);
}