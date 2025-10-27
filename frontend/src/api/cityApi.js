const BASE_URL = "http://localhost:3000/cities";

// City mit 3 Bildern erstellen
export const createCityApi = async (formData) => {
    try {
      const response = await fetch(BASE_URL, {
         method: "POST",
         body: formData
         // KEIN Content-Type Header setzen
         // Browser setzt automatisch multipart/form-data
      })

      const data = await response.json();

      if (response.ok){
         console.log("Stadt erstellt!");
         return data.city;
      }

      throw new Error(data.msg || "Fehler beim Erstellen!")
    } catch (error) {
      console.log(error);
      throw error;
    }
};

// Alle Cities abrufen
export const getAllCitiesApi = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      if (response.ok){
         console.log("Städte geladen:", data.count);
         return data.cities;
      }

      throw new Error("Fehler beim Laden!");
    } catch (error) {
      console.log(error);
      throw error;
    }
};

// Einzelnes Bild löschen
export const deleteImageApi = async (cityId, publicId) => {
    
};

// Ganze City löschen
export const deleteCityApi = async (cityId) => {
    
};
