import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import CityList from "./components/CityList";
import { getAllCitiesApi } from "./api/cityApi";
import "./App.css";

function App() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cities beim Start laden
    useEffect(() => {
        loadCities();
    }, []);

    const loadCities = async () => {
        try {
            const data = await getAllCitiesApi();
            setCities(data);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        } finally {
            setLoading(false);
        }
    };

    // Neue City hinzugefügt
    const handleCityCreated = (newCity) => {
        setCities([newCity, ...cities]); // Neue City am Anfang
    };

    return (
        <div className="app">
            <header>
                <h1>CitySpot</h1>
                <p>Zeig uns deine Stadt in 3 Bildern!</p>
            </header>

            <main>
                <UploadForm onCityCreated={handleCityCreated} />

                {loading ? (
                    <p className="loading">Lädt Städte...</p>
                ) : (
                    <CityList 
                        cities={cities} 
                        onCitiesChange={setCities}
                    />
                )}
            </main>
        </div>
    );
}

export default App;