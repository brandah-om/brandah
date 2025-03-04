'use client';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const customIcon = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapComponent = ({ latitude, longitude }) => {
    const t = useTranslations('HomePage');
    
    const MapHoverTooltip = ({ googleMapsUrl }) => {
        const [hovered, setHovered] = useState(false);

        useMapEvents({
            mouseover: () => setHovered(true),
            mouseout: () => setHovered(false),
        });

        return hovered ? (
            <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '15px 17px',
                    borderRadius: '8px',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                {t('Open in Google Maps')}
            </a>
        ) : null;
    };

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
        <div style={{ position: 'relative' }}>
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
                    <Tooltip
                        direction="top"
                        offset={[0, -10]}
                        opacity={1}
                        permanent={false}
                        interactive={true}
                    >
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            {t('Open in Google Maps')}
                        </a>
                    </Tooltip>
                </Marker>
                <MapHoverTooltip googleMapsUrl={googleMapsUrl} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
