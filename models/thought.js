// import models
const { Schema, model } = require("mongoose");
const reactionSchema = require("./reactions");

// new thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// retrieves reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// creates thought model
const Thought = model('Thought', thoughtSchema);

// exports the thought model
module.exports = Thought;