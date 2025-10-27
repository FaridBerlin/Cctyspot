import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { deleteImageApi } from "../api/cityApi";

const CityCarousel = ({ city, onImageDeleted }) => {
    const [deleting, setDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Aktuelles Bild löschen
    const handleDeleteImage = async () => {
        if (!window.confirm("Bild wirklich löschen?")) return;

        const currentImage = city.images[currentIndex];
        setDeleting(true);

        try {
            const updatedCity = await deleteImageApi(city._id, currentImage.publicId);
            
            // Index anpassen falls letztes Bild gelöscht
            if (currentIndex >= updatedCity.images.length) {
                setCurrentIndex(Math.max(0, updatedCity.images.length - 1));
            }

            onImageDeleted(updatedCity);
        } catch (error) {
            alert("Fehler beim Löschen!");
        } finally {
            setDeleting(false);
        }
    };

    // Keine Bilder mehr vorhanden
    if (!city.images || city.images.length === 0) {
        return (
            <div className="city-card">
                <h3>{city.name}</h3>
                <p className="no-images">Keine Bilder mehr vorhanden</p>
            </div>
        );
    }

    return (
        <div className="city-card">
            <h3>{city.name}</h3>

            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={true}
                infiniteLoop={city.images.length > 1}
                useKeyboardArrows={true}
                swipeable={true}
                emulateTouch={true}
                selectedItem={currentIndex}
                onChange={(index) => setCurrentIndex(index)}
                className="city-carousel"
            >
                {city.images.map((image, index) => (
                    <div key={image.publicId}>
                        <img 
                            src={image.url} 
                            alt={`${city.name} - Bild ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel>

            {/* Delete Button */}
            <button
                onClick={handleDeleteImage}
                disabled={deleting}
                className="delete-image-btn"
            >
                {deleting ? "Wird gelöscht..." : " Aktuelles Bild löschen"}
            </button>
        </div>
    );
};

export default CityCarousel;