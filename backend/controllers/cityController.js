import City from "../models/City.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";



export const createCity = async (req, res) => {
    try {
        const {name} = req.body;

        if (!name)return res.status(400).json({msg: "Stadtname erforderlich!"})
        
        // Prüfen ob genau 3 Bilder hochgeladen wurden
        if (!req.files || req.files.length !== 3){
            return res.status(400).json({msg: "Es werden genau 3 Bilder benötigt!"})
        }

        // Bilder zu Cloudinary hochladen parallel
        const uploadPromises = req.files.map(file => uploadImage(file.buffer));
        const uploadedImages = await Promise.all(uploadPromises);
        // An der Stelle wäre uploadedImages: [{url, publicId}, {...}, {...}]

        const city = new City({
            name,
            images: uploadedImages
        });

        await city.save();
        res.status(201).json({msg: "Stadt erfolgreich erstellt!", city})


    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"})
    }
};

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json({
            count: cities.length,
            cities
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"})
    }
};
