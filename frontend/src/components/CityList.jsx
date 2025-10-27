import CityCarousel from "./CityCarousel";
import { deleteCityApi } from "../api/cityApi";

const CityList = ({ cities=[], onCitiesChange }) => {
    
    // Einzelnes Bild wurde gelöscht
    const handleImageDeleted = (updatedCity) => {
        const updatedCities = cities.map(city => 
            city._id === updatedCity._id ? updatedCity : city
        );
        onCitiesChange(updatedCities);
    };

    // Ganze City löschen
    const handleDeleteCity = async (cityId) => {
        if (!window.confirm("Stadt und alle Bilder wirklich löschen?")) return;

        try {
            await deleteCityApi(cityId);
            const updatedCities = cities.filter(city => city._id !== cityId);
            onCitiesChange(updatedCities);
        } catch (error) {
            alert("Fehler beim Löschen!");
        }
    };

    if (cities.length === 0) {
        return (
            <div className="empty-state">
                <p>Noch keine Städte hochgeladen. Sei die/der Erste!</p>
            </div>
        );
    }

    return (
        <div className="city-list">
            <h2>Städte ({cities.length})</h2>

            <div className="cities-grid">
                {cities.map(city => (
                    <div key={city._id} className="city-wrapper">
                        <CityCarousel 
                            city={city} 
                            onImageDeleted={handleImageDeleted}
                        />
                        <button
                            onClick={() => handleDeleteCity(city._id)}
                            className="delete-city-btn"
                        >
                            Stadt löschen
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityList;