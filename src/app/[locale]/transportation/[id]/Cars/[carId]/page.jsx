'use client';

import { useGetCarsByIdQuery } from '@/store/Transportation/CarDetailSlice';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import NavBar from '@/components/navBar/NavBar';
import style from './carDetails.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { useGetTranssBtIdQuery } from '@/store/Transportation/TransDetailsSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import MapComponent from '@/app/[locale]/destinations/components/MapComponent';
import Loading from '@/components/Loading/Loading';
import ContactUs from '@/app/[locale]/home/component/contactUs/ContactUs';
import Newsletter from '@/app/[locale]/home/component/newsletter/Newsletter';

const CarDetails = () => {
    const { id, carId } = useParams();
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const { data, isLoading, error } = useGetCarsByIdQuery({ carId, lang: locale });
    const { data: tranData } = useGetTranssBtIdQuery(id, locale);
    const trans = tranData?.data;

    const car = data?.data;

    const carName =
        typeof car?.name === 'object' ? car?.name?.[locale] || car?.name?.en : car?.name;
    const carOverview =
        typeof car?.overview === 'object'
            ? car?.overview?.[locale] || car?.overview?.en
            : car?.overview;

    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Transportation'), href: `/${locale}/transportation` },
        { label: trans?.name, href: `/${locale}/transportation/${id}` },
        { label: carName },
    ];

    return (
        <>
            <NavBar />
            <div className={style.carDetails}>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className="my-3 px-lg-3 px-1">
                            <DynamicBreadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="container mt-4">
                            <Card className="shadow-lg">
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={car.banner}
                                    alt={car.carName}
                                />

                                <CardContent>
                                    <Typography variant="h5" className="fw-bold text-primary">
                                        {car.carName}
                                    </Typography>

                                    <Typography
                                        dangerouslySetInnerHTML={{ __html: car.carOverview || '' }}
                                        className="mb-3"
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography>
                                                <strong>💰 Price:</strong> {car.price}{' '}
                                                {car.currency}
                                            </Typography>
                                            <Typography>
                                                <strong>🎨 Color:</strong> {car.color}
                                            </Typography>
                                            <Typography>
                                                <strong>🚗 Model:</strong> {car.model}
                                            </Typography>
                                            <Typography>
                                                <strong>📅 Year:</strong> {car.manufacture_year}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Typography>
                                                <strong>🛣️ Mileage:</strong> {car.mileage} km
                                            </Typography>
                                            <Typography>
                                                <strong>🧑‍✈️ Driver:</strong>{' '}
                                                {car.with_driver ? 'With Driver' : 'Without Driver'}
                                            </Typography>
                                            <Typography>
                                                <strong>🛑 Available for Rent:</strong>{' '}
                                                {car.is_available ? 'Available' : 'Not Available'}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="h6" className="fw-semibold mt-3">
                                        ⚙️ Specifications:
                                    </Typography>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>🛞 Car Type:</strong> {car.car_type}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>⛽ Fuel Type:</strong> {car.fuel_type}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>⚙️ Gearbox:</strong> {car.gearbox_type}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>🚪 Doors:</strong> {car.doors_count}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>🛋️ Passengers:</strong> {car.passenger_count}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>🔢 Plate Number:</strong> {car.plate_number}
                                        </li>
                                    </ul>

                                    <Typography variant="h6" className="fw-semibold mt-3">
                                        ✨ Features:
                                    </Typography>
                                    <div className="d-flex flex-wrap gap-2">
                                        {car.features.map((feature, index) => (
                                            <Chip
                                                key={index}
                                                label={feature}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <Typography className="mb-2">
                                            <strong>📍 Location:</strong>{' '}
                                        </Typography>
                                        {car?.latitude && car?.longitude ? (
                                            <MapComponent
                                                latitude={parseFloat(car.latitude)}
                                                longitude={parseFloat(car.longitude)}
                                            />
                                        ) : (
                                            <p>Loading map...</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
                <ContactUs />
                <Newsletter />
            </div>
        </>
    );
};

export default CarDetails;
