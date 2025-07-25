const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);

