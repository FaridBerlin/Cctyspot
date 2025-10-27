import {Schema, model} from "mongoose";

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: [{
        url: String, // Die URL für das Frontend
        publicId: String // Zum Löschen bei Cloudinary
    }]
});

export default model("City", citySchema);

