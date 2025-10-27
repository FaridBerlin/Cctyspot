import multer from "multer";

/*
memoryStorage() - die Dateien werden im RAM zwischengespeichert (als Buffer)
*/
const storage = multer.memoryStorage();

// FileFilter: Nur Bilder erlauben
const fileFilter = (req, file, cb) => {
     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
   
     if (allowedTypes.includes(file.mimetype)){
      cb(null, true) // Datei akzeptieren
   } else {
      cb(new Error("Nur Bilder erlaubt (JPEG, PNG, WebP!)"))
   }
}

// Multer konfigurieren
const upload = multer({
   storage,
   fileFilter,
   limits: {
      fileSize: 5 * 1024 * 1024 // Max 5MB pro Bild
   }
});

export default upload;