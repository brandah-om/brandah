'use client';
import React, { useEffect, useState } from 'react';
import style from './tripDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import StarIcon from '@mui/icons-material/Star';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import AddIcon from '@mui/icons-material/Add';
import { useGetTripsBtIdQuery } from '@/store/trips/TripsDetailsSlice';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const { data, error, isLoading } = useGetTripsBtIdQuery({ id, lang: locale });
    const trip = data?.data;
    const satandard_hotels = data?.data.satandard_hotels;
    const comfort_hotels = data?.data.comfort_hotels;
    const deluxe_hotels = data?.data.deluxe_hotels;

    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Trips'), href: `/${locale}/trips` },
        { label: trip?.name || 'name is null' },
    ];

    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'TripSummary', label: t('Trip summary') },
        { id: 'TripOverview', label: t('Trip overview') },
        { id: 'loveTrip', label: t("Why you'll love this trip") },
        { id: 'overview', label: t('Overview') },
        { id: 'itinerary', label: t('Itinerary') },
        { id: 'inclusions', label: t('Inclusions') },
        { id: 'ImportantNotes', label: t('Important notes') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const price = trip?.prices?.[0]?.standard_price ?? 0;
    const router = useRouter();

    const handleBooking = () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            // إذا لم يكن هناك توكين، انتقل إلى صفحة تسجيل الدخول مع تخزين الصفحة الأصلية
            router.push(
                `/${locale}/login?redirect=/${locale}/confirmBooking&id=${trip?.id}&name=${trip?.name}&price=${price}`
            );
        } else {
            // إذا كان هناك توكين، انتقل مباشرةً إلى صفحة الحجز
            router.push({
                pathname: `/${locale}/confirmBooking`,
                query: {
                    id: trip?.id,
                    name: trip?.name,
                    price: price,
                    firstName:
                        typeof window !== 'undefined' ? localStorage.getItem('firstName') : '',
                    lastName: typeof window !== 'undefined' ? localStorage.getItem('lastName') : '',
                    email: typeof window !== 'undefined' ? localStorage.getItem('email') : '',
                },
            });
        }
    };

    return (
        <>
            <NavBar />
            <div className={style.tripDetails}>
                <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center px-lg-5 px-2">
                    <div className={`${style.DynamicBreadcrumbs} mt-1`}>
                        <DynamicBreadcrumbs items={breadcrumbs} />
                    </div>
                    <div className={`${style.bookBtn} mt-1`}>
                        <button className={style.bookBtn} onClick={handleBooking}>
                            {t('Book')}
                        </button>
                    </div>
                </div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center">
                                {t('Explore')} {trip?.name || 'name is null'}
                            </h2>
                            <div className={style.detailsCaption}>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: trip?.description,
                                    }}
                                >
                                    {/* {trip?.description ||
                                        '19 Days | Discover ancient cities and warming hospitality in the Middle East'} */}
                                </p>
                                <div>
                                    {Array.from({ length: trip?.rate }, (_, index) => (
                                        <StarIcon
                                            key={index}
                                            sx={{
                                                color: '#FF8E04',
                                                width: '12px',
                                                height: '12px',
                                            }}
                                        />
                                    ))}
                                    {/* <StarIcon
                                        sx={{ color: '#FFBD40', width: '20px', height: '19px' }}
                                    />
                                    <StarIcon
                                        sx={{ color: '#FFBD40', width: '20px', height: '19px' }}
                                    />
                                    <StarIcon
                                        sx={{ color: '#FFBD40', width: '20px', height: '19px' }}
                                    />
                                    <StarIcon
                                        sx={{ color: '#FFBD40', width: '20px', height: '19px' }}
                                    /> */}
                                    <span className="fw-bold m-1">{trip?.rate}</span>
                                    <span>out of 5 based on 31 reviews submitted.</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7 pl-lg-5 pl-auto py-0 pt-1 mb-2 py-lg-4 wow fadeInLeft">
                            <img
                                style={{ height: '320px', objectFit: 'cover', borderRadius: '5px' }}
                                className="img-fluid w-100"
                                src="/homepage/top-trip/2.jpeg"
                                alt="trip-details"
                            />
                        </div>
                        <div className="col-md-5 py-lg-4 py-0 wow fadeInUp">
                            <div className="row">
                                <div className="col-md-6 mb-lg-0 mb-2">
                                    <img
                                        style={{ height: '160px', borderRadius: '5px' }}
                                        className="img-fluid w-100"
                                        src="/homepage/top-trip/3.png"
                                        alt="trip-details"
                                    />
                                </div>
                                <div className="col-md-6 mb-lg-0 mb-2">
                                    <img
                                        style={{ height: '160px', borderRadius: '5px' }}
                                        className="img-fluid w-100"
                                        src="/homepage/top-trip/4.jpeg"
                                        alt="trip-details"
                                    />
                                </div>
                            </div>
                            <div className="row mt-lg-3 mt-0">
                                <div className="col-md-6 mb-lg-0 mb-2">
                                    <img
                                        style={{ height: '160px', borderRadius: '5px' }}
                                        className="img-fluid w-100"
                                        src="/homepage/top-trip/5.png"
                                        alt="trip-details"
                                    />
                                </div>
                                <div className="col-md-6 mb-lg-0 mb-2">
                                    <img
                                        style={{ height: '160px', borderRadius: '5px' }}
                                        className="img-fluid w-100"
                                        src="/homepage/top-trip/1.jpeg"
                                        alt="trip-details"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${style.detailsNav}  d-flex justify-content-around align-items-center flex-wrap`}
                        >
                            {sections.map(section => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className={activeSection === section.id ? style.active : ''}
                                >
                                    {section.label}
                                </a>
                            ))}
                        </div>

                        <div className="col-md-8">
                            <div id="overview" className={style.overview}>
                                <h2 className="wow fadeInLeftBig">{t('Overview')}</h2>
                                <p className="wow fadeInLeft">
                                    From the ‘Land of the Pharaohs’ to the buoyant waters of the
                                    Dead Sea, this immersive 19-day tour through Egypt and Jordan is
                                    awash with highlights. Lose yourself in sun- kissed Cairo, be
                                    dazzled by the grandeur of ancient Egypt, cruise down the iconic
                                    Nile River, and explore the fascinating cities of Alexandria,
                                    Aswan and Luxor. Fly to Jordan and discover the sweeping desert
                                    and echoing formations of Wadi Rum, the hand- hewn facades of
                                    Petra and the ancient Roman ruins at Jerash. This is a Middle
                                    Eastern odyssey to remember.
                                </p>
                            </div>

                            <div id="itinerary" className={style.itinerary}>
                                <Typography variant="h4" gutterBottom>
                                    {t('Itinerary')}
                                </Typography>
                                {trip?.days?.map((item, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index}-content`}
                                            id={`panel${index}-header`}
                                        >
                                            <Typography>
                                                {t('Day')} {index + 1}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography
                                                dangerouslySetInnerHTML={{
                                                    __html: trip?.description,
                                                }}
                                            >
                                                {/* {item.description ||
                                                    'No details available for this day.'} */}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-10">
                            <div id="inclusions" className={style.inclusions}>
                                <h2 className="wow fadeInUp">{t('Inclusions')}</h2>

                                <div
                                    className={`${style.inclusionsBox} d-flex justify-content-start align-items-start mb-2 wow fadeInLeft`}
                                >
                                    <RestaurantIcon sx={{ mr: '5px' }} />
                                    <div>
                                        <p className="m-0">{t('meals')}</p>
                                        <span>{trip?.included}</span>
                                    </div>
                                </div>

                                <div
                                    className={`${style.inclusionsBox} d-flex justify-content-start align-items-start mb-2 wow fadeInLeft`}
                                >
                                    <DirectionsBusIcon sx={{ mr: '5px' }} />
                                    <div>
                                        <p className="m-0">{t('Transport')}</p>
                                        <span>{trip?.excluded}</span>
                                    </div>
                                </div>

                                <div
                                    className={`${style.inclusionsBox} d-flex justify-content-start align-items-start mb-2 wow fadeInLeft`}
                                >
                                    <LocalHotelIcon sx={{ mr: '5px' }} />
                                    <div>
                                        <p className="m-0">{t('Accommodation')}</p>
                                        {satandard_hotels?.length > 0 ? (
                                            satandard_hotels.map(hotel => (
                                                <span key={hotel.id}>{hotel.name[locale]} </span>
                                            ))
                                        ) : (
                                            <span>No hotels available</span>
                                        )}{' '}
                                        ,
                                        {deluxe_hotels?.length > 0 ? (
                                            deluxe_hotels.map(hotel => (
                                                <span key={hotel.id}>{hotel.name[locale]} </span>
                                            ))
                                        ) : (
                                            <span>No hotels available</span>
                                        )}{' '}
                                        ,
                                        {comfort_hotels?.length > 0 ? (
                                            comfort_hotels.map(hotel => (
                                                <span key={hotel.id}>{hotel.name[locale]} </span>
                                            ))
                                        ) : (
                                            <span>No hotels available</span>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`${style.inclusionsBox} d-flex justify-content-start align-items-start mb-2 wow fadeInLeft`}
                                >
                                    <PedalBikeIcon sx={{ mr: '5px' }} />
                                    <div>
                                        <p className="m-0">{t('Activities')}</p>
                                        <p className="activities-p">
                                            Complimentary Arrival Transfer Cairo - Pyramids of Giza
                                            and the Sphinx Cairo - Egyptian Museum Alexandria -
                                            Catacombs of Kom el Shoqafa Alexandria - Bibliotheca
                                            Alexandrina Alexandria - Fort Qaitbey Alexandria - Wadi
                                            El Natron monasteries Aswan - Nubian Village Visit and
                                            Dinner Aswan - Philae Temple Abu Simbel - Abu Simbel
                                            temples Aswan - Felucca Sail Izbat Al Bayyarah - Kom
                                            Ombo Temple Luxor - Karnak Temple (entrance fee) Luxor -
                                            Colossi of Memnon Luxor - Valley of the Kings (entrance
                                            to 3 tombs) Luxor - Tomb of Tutankhamun Luxor -
                                            Hatshepsut Temple Cairo - Khan al-Khalili bazaar visit
                                            Wadi Rum - Desert Jeep tour Petra - Guided tour Petra -
                                            Home-cooked meal Shobak - Shobak Castle Madaba - St
                                            Georges Church Jerash - Roman ruins Dead Sea - Visit and
                                            float
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`${style.inclusionsBox} d-flex justify-content-start align-items-start mb-2 wow fadeInLeft`}
                                >
                                    <AddIcon sx={{ mr: '5px' }} />
                                    <div>
                                        <p className="m-0">{t('Add on activities')}</p>
                                        <span>
                                            <div>Cairo - Coptic Museum (entrance fee) - EGP230</div>
                                            <div>
                                                Cairo - Islamic Art Museum (entrance fee) - EGP270
                                            </div>
                                            <div>
                                                Cairo - Urban Adventures Downtown Cairo Tour - USD40
                                            </div>
                                            <div>Cairo - The Citadel (entrance fee) - EGP450</div>
                                            <div>
                                                Cairo - Saqqara and Memphis Afternoon Tour (minimum
                                                2 persons) (entrance, guide & transport) - USD109
                                            </div>
                                            <div>
                                                Cairo - The Great Pyramid of Cheops (entrance fee) -
                                                EGP900
                                            </div>
                                            <div>
                                                Cairo - The 3rd Pyramid of Menkawre (entrance fee) -
                                                EGP220
                                            </div>
                                            <div>
                                                Cairo - Sound & Light Show at the Pyramids Tour
                                                (minimum 2 persons) (entrance, guide & transport) -
                                                USD55
                                            </div>
                                            <div>
                                                Alexandria - Alexandria National Museum (entrance
                                                fee) - EGP180
                                            </div>
                                            <div>Aswan - Nubian Museum (entrance fee) - EGP300</div>
                                            <div>
                                                Aswan - Tomb of the Nobles (entrance fee) - EGP150
                                            </div>
                                            <div>
                                                Aswan - High Dam and Unfinished Obelisk Tour
                                                (minimum 2 persons) (entrance, guide & transport) -
                                                USD35
                                            </div>
                                            <div>
                                                Aswan - Philae Temple Sound & Light Show Tour
                                                (minimum 2 persons) (entrance, guide & transport) -
                                                USD55
                                            </div>
                                            <div>Edfu - Edfu Temple (entrance fee) - EGP450</div>
                                            <div>Luxor - Luxor Temple (entrance fee) - EGP400</div>
                                            <div>Luxor - Luxor Museum (entrance fee) - EGP300</div>
                                            <div>
                                                Luxor - Mummification Museum (entrance fee) - EGP200
                                            </div>
                                            <div>
                                                Luxor - Karnak Temple Sound and Light Show (minimum
                                                2 persons) (entrance, guide & transport) - USD45
                                            </div>
                                            <div>
                                                Luxor - Valley of the Queens (entrance fee) - EGP180
                                            </div>
                                            <div>
                                                Luxor - Medinat Habu Temple (entrance fee) - EGP200
                                            </div>
                                            <div>Luxor - Deir el Madina -Entry Fee - EGP200</div>
                                            <div>
                                                Luxor - Tomb of Queen Nefertari in the Valley of the
                                                Queens (entrance fee) - EGP2000
                                            </div>
                                            <div>
                                                Luxor - Hot Air Balloon over the Valley of the Kings
                                                - USD130
                                            </div>
                                            <div>
                                                wadi rum - Hot Air Balloon over the Valley of the
                                                Kings - USD130
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
