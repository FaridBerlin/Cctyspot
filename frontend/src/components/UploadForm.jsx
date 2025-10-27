import { useState } from "react";
import { createCityApi } from "../api/cityApi";

const UploadForm = ({ onCityCreated }) => {
    const [cityName, setCityName] = useState("");
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Bilder auswählen und Vorschau generieren
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length !== 3) {
            setError("Bitte genau 3 Bilder auswählen!");
            return;
        }

        setError("");
        setImages(files);

        // Vorschau-URLs erstellen
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);
    };

    // Formular absenden
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!cityName || images.length !== 3) {
            setError("Stadtname und 3 Bilder erforderlich!");
            return;
        }

        setLoading(true);

        try {
            // FormData erstellen (für multipart/form-data)
            const formData = new FormData();
            formData.append("name", cityName);
            
            // Alle 3 Bilder mit gleichem Feldnamen "images"
            images.forEach(image => {
                formData.append("images", image);
            });

            const newCity = await createCityApi(formData);

            // Formular zurücksetzen
            setCityName("");
            setImages([]);
            setPreviews([]);
            e.target.reset();

            // Parent Component benachrichtigen
            onCityCreated(newCity);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-form">
            <h2>Deine Stadt hochladen</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Stadtname:</label>
                    <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="z.B. Berlin"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>3 Bilder auswählen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        disabled={loading}
                    />
                </div>

                {/* Vorschau */}
                {previews.length === 3 && (
                    <div className="preview-grid">
                        {previews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="preview-image"
                            />
                        ))}
                    </div>
                )}

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Wird hochgeladen..." : "Stadt erstellen"}
                </button>
            </form>
        </div>
    );
};

export default UploadForm;