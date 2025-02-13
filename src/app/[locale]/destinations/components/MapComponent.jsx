'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useTranslations } from 'next-intl';

const customIcon = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapComponent = ({ latitude, longitude }) => {
    const t = useTranslations('HomePage');
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>{t('site is here')}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
