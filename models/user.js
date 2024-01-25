// import models
const { Schema, model } = require("mongoose");

// new user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Email must match!"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// retrives friend count
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// creates user model
const User = model("User", userSchema);

// exports the user model
module.exports = User;