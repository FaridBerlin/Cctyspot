import {v2 as cloudinary} from "cloudinary";

// Cloudinary mit den Zugangsdaten konfigurieren
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

/*
fileBuffer - Das Bild als Buffer (von Multer)
*/
export const uploadImage = (fileBuffer) => {
   return new Promise((resolve, reject)=>{
      // uploadStream = Upload ohne lokale Datei, direkt aus dem Speicher
      const uploadStream = cloudinary.uploader.upload_stream({
         folder: "cityspot", // Ordner in Cloudinary
         transformation:[
            {width:1200, height:800, crop: "fill"}, // Größe anpassen
            {quality: "auto"}, // Cloudinary wählt beste Qualität
            {fetch_format: "auto"} // Automatisch WebP nutzen, wenn der Browser es unterstützt
         ]
      },
      (error, result)=>{
         if (error){
            reject(error);
         } else {
            // Wir speichern nur das Wichtigste
            resolve({
               url: result.secure_url, // HTTPS URL zum Anzeigen
               publicId: result.publicId // ID zum Löschen
            })
         }
      }
   )
   // Buffer in den Stream schreiben
   uploadStream.end(fileBuffer);
   })
};

// Bilder von cloudinary löschen
export const deleteImage = async(publicId)=>{
   try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Cloudinary Löschergebnis:", result);
      return result;
   } catch (error) {
      console.log("Fehler beim Löschen", error);
      throw error;
   }
}

export default cloudinary;