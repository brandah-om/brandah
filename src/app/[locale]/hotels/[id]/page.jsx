'use client';
import React from 'react';
import style from './hotelDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import BalconyIcon from '@mui/icons-material/Balcony';
import SpaIcon from '@mui/icons-material/Spa';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WifiIcon from '@mui/icons-material/Wifi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import SmokeFreeOutlinedIcon from '@mui/icons-material/SmokeFreeOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import { useRouter } from 'next/navigation';
import { useGetHotelsBtIdQuery } from '@/store/hotels/hotelDetailsApiSlice';
import { useGetHotelsQuery } from '@/store/hotels/hotelsApiSlice';
import Loading from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';

const HotelDetails = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const { data, error, isLoading } = useGetHotelsBtIdQuery(id, locale);
    const { data: hotels, error: errorHotels, isLoading: isLoadingHotels } = useGetHotelsQuery();

    if (isLoading) return <Loading />;
    if (isLoadingHotels) return <Loading />;
    if (error) return <p>Error Fetching Hotel Details</p>;
    if (errorHotels) return <p>Error Fetching Hotels</p>;
const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: 'Hotels', href: '/hotels' },
        { label: data?.data?.name },
    ];

    // const hotelsData = [
    //     {
    //         id: 1,
    //         title: 'Intercity Hotel Nizwa',
    //         description: 'Walking distance from the mall, taxi and bus station.',
    //         rating: '4.3',
    //         price: '$150',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/1.png',
    //     },
    //     {
    //         id: 2,
    //         title: 'Golden Tulip Nizwa',
    //         description:
    //             'The staff at the Golden Tulip work really hard to make your stay there a great experience.',
    //         rating: '4.3',
    //         price: '$200',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/2.png',
    //     },
    //     {
    //         id: 3,
    //         title: 'Date Palm Inn',
    //         description: 'I have only extremely positive things to say about my stay.',
    //         rating: '4.3',
    //         price: '$120',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/3.png',
    //     },
    //     {
    //         id: 4,
    //         title: 'Aldar Inn',
    //         description: 'Walking distance from the mall, taxi and bus station.',
    //         rating: '4.3',
    //         price: '$135',
    //         nights: '3 nights accomodation',
    //         image: '/homepage/hotels/1.png',
    //     },
    // ];
    // const repeatedData = Array(1).fill(hotelsData).flat();
    return (
        <div>
            <NavBar />
            <div className={style.hotelDetails}>
                <div className={style.DynamicBreadcrumbs}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex flex-lg-row flex-column mb-3 justify-content-between align-items-start align-items-lg-center">
                                <div className="mb-3">
                                    <div className="d-flex gap-2 mb-3 justify-content-start align-items-center">
                                        <div>
                                            {Array.from(
                                                { length: data?.data?.rating },
                                                (_, index) => (
                                                    <StarIcon
                                                        key={index}
                                                        sx={{
                                                            color: '#FF8E04',
                                                            width: '12px',
                                                            height: '12px',
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>

                                        <h6 className={style.titleName}>Airport shuttle</h6>
                                        <div className={style.certificationBox}>
                                            <WorkspacePremiumIcon
                                                sx={{
                                                    color: '#000000',
                                                    width: '12px',
                                                    height: '12px',
                                                }}
                                            />
                                            <h5>Sustainability certification</h5>
                                        </div>
                                    </div>
                                    <div className={style.detailsTitle}>
                                        <h3>{data?.data?.name}</h3>
                                    </div>
                                    <div className={style.detailsLocation}>
                                        <LocationOnIcon
                                            sx={{ color: '#000000', width: '13px', height: '20px' }}
                                        />
                                        <h6>
                                            PO Box 110, Al Jabal Al Akhdar, Nizwa, Oman, 621 Al ‘Aqar, Oman
                                            -
                                        </h6>
                                        <Link href="/">Excellent location – show map</Link>
                                    </div>
                                </div>

                                <div className={style.shareBtn}>
                                    <button>share</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9 mb-2">
                            <div className="row">
                                <div className="col-md-4 px-lg-1 px-auto mb-1">
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <img
                                                className="img-fluid"
                                                src="/hotel-details/1.jpeg"
                                                alt="hotel-details"
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <img
                                                className="img-fluid"
                                                src="/hotel-details/2.jpeg"
                                                alt="hotel-details"
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8 mb-1 px-lg-1 px-auto">
                                    <img
                                        className="img-fluid"
                                        src="/hotel-details/3.jpeg"
                                        alt="hotel-details"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        src="/hotel-details/7.jpeg"
                                        alt="hotel-details"
                                    />
                                </div>
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        src="/hotel-details/5.jpeg"
                                        alt="hotel-details"
                                    />
                                </div>
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        src="/hotel-details/6.jpeg"
                                        alt="hotel-details"
                                    />
                                </div>
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        src="/hotel-details/7.jpeg"
                                        alt="hotel-details"
                                    />
                                </div>
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <img
                                        style={{ height: '100%', width: '100%' }}
                                        className="img-fluid"
                                        src="/hotel-details/5.jpeg"
                                        alt="hotel-details"
                                    />
                                </div>
                                <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <div className={style.lastImg}>
                                        <img
                                            style={{ height: '100%', width: '100%' }}
                                            className="img-fluid"
                                            src="/hotel-details/7.jpeg"
                                            alt="hotel-details"
                                        />
                                        <Link href="/">+37 photos</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card mb-3">
                                <div className="d-flex p-2 justify-content-end align-items-center gap-2">
                                    <div className={style.reviewNumber}>
                                        <h6>Wonderful</h6>
                                        <p>603 reviews</p>
                                    </div>
                                    <div className={style.reviewBoxNumber}>
                                        <p>9.2</p>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className={style.cardBody}>
                                    <h6>Guests who stayed here loved</h6>
                                    <p className={style.cardBodyCaption}>
                                        “The Hotel is amazing and the time was perfect, we loved the
                                        room atmosphere and the services fast services... Perfect
                                        place to get away from the...”
                                    </p>
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <h6 className={style.reviewName}>Hatim</h6>
                                        <img
                                            style={{ width: '12px', height: '12px' }}
                                            src="/hotel-details/flag.png"
                                            alt="flag"
                                        />
                                        <p className={style.reviewCountry}>Oman</p>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className={style.cardFooter}>
                                    <h6>staff</h6>
                                    <div className={style.cardFooterRateBox}>
                                        <p>9.5</p>
                                    </div>
                                </div>
                            </div>
                            <div className={style.map}>
                                <img
                                    style={{ width: '100%', height: '100%' }}
                                    className="img-fluid"
                                    src="/hotel-details/map.png"
                                    alt="map"
                                />
                                <div className={style.mapLocation}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div>
                                            <LocationOnIcon
                                                sx={{
                                                    color: '#9F733C',
                                                    width: '33px',
                                                    height: '41px',
                                                }}
                                            />
                                        </div>
                                        <div className={style.mapLocationLink}>
                                            <Link href="/">Show on map</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-2 my-2">
                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <FreeBreakfastOutlinedIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Very Good Breakfast</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <PoolIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Outdoor swimming pool</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <RestaurantIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">5 restaurants</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <BathroomOutlinedIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Private Bathroom</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <BalconyIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Balcony</p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-2 my-2">
                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <SpaIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Spa</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <FamilyRestroomIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Family rooms</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <WifiIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Free Wifi</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <VisibilityIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">View</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                            >
                                <FitnessCenterIcon sx={{ color: '#000000' }} />
                                <p className="mb-0">Fitness center</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-9">
                            <h6 className={style.serviceTitle}>
                                Experience World-class Service at Anantara Al Jabal Al Akhdar Resort
                            </h6>
                            <div className="d-flex justify-content-start align-items-center gap-1">
                                <CheckOutlinedIcon />
                                <h6 className={style.servicesInfoTitle}>Reliable info:</h6>
                                <h6 className={style.serviceInfoCaption}>
                                    Guests say the description and photos for this property
                                    <span> are very accurate.</span>
                                </h6>
                            </div>
                            <p className={style.serviceCaption}>
                                Anantara Al Jabal Al Akhdar Resort, the highest five-star resort in
                                the middle east on the curving rim of a great canyon, is a secluded
                                haven for the intrepid and discerning. 13 mi from Nizwa, the resort
                                features panoramic views from the cliff-edge infinity pool. Guests
                                can enjoy free WiFi throughout the property.
                            </p>
                            <p className={style.serviceCaption}>
                                A total of 115 luxury rooms and villas overlook either the dramatic
                                canyon or tranquil gardens and a spa-like bathroom complete with a
                                rain shower. Luxury villas grant guests an intimate escape each with
                                personal villa host services and a private infinity pool overlooking
                                the cliffs or hidden in an exotic garden. Each villa features
                                state-of- the-art interactive LED IPTVs and spacious walk-in
                                dressing areas, all adding to a sense of sublime luxury.
                            </p>
                            <p className={style.serviceCaption}>
                                A selection of five dining venues to choose from, Al Qalaa a fine
                                dining Arabian grill concept, Bella Vista an Italian restaurant
                                overlooking the grand canyon, Al Maisan all day dining serving world
                                classics and cooking classes or Al Baha the café deli located in the
                                open air courtyard. Celebrate on Diana’s Point platform or The Royal
                                Edge with a unique private dining experience overlooking the
                                canyons.
                            </p>
                            <p className={style.serviceCaption}>
                                A cliff-edge infinity pool, 2 hot tubs, children’s pool,
                                state-of-the-art Fitness Center and tennis court are available to
                                enjoy. The Anantara Spa harnesses the essence of Arabia complete
                                with a Hammam and private outdoor relaxation areas and separate male
                                and female indoor Jacuzzis. The kids’ and teens’ club offers
                                fun-filled activities for all ages.
                            </p>
                            <p className={style.serviceCaption}>
                                The resort presents travelers with authentic experiences, allowing
                                them to explore the nearby culture, history and landscape.
                                Activities include Via Ferrata, hiking, cultural tours, abseiling,
                                mountain climbing, archery and mountain biking. The resort’s
                                expansive garden flourishes with a variety of plants and crops,
                                including Damask roses, pomegranates, olives, and figs, reflecting
                                the region’s natural beauty and bounty. The resort also features
                                conference and meeting facilities.
                            </p>
                            <p className={style.serviceCaption}>
                                Kindly be informed that a 4x4 (four-wheel drive) vehicle is required
                                to access Al Jabal Al Akhdar as per government regulations. The
                                drivers license and car registration documents which can confirm the
                                vehicle is 4x4 (four-wheel drive) capable must also be presented at
                                the checkpoint. The property is two hours from Muscat International
                                Airport or four and half hours from Dubai – past date plantations,
                                dry riverbeds known locally as wadis, and historical forts. Luxury
                                transfers can be arranged on request.
                            </p>
                            <p className={style.serviceCaption}>
                                Couples in particular like the location – they rated it 9.5 for a
                                two-person trip.
                            </p>

                            <h6 className={style.serviceTitle}>Most popular facilities </h6>
                            <div
                                className={`${style.facilities} d-flex justify-content-start align-items-center gap-2 flex-warp mb-3`}
                            >
                                <PoolIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Outdoor swimming pool</h6>
                                <SpaOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Spa</h6>
                                <RestaurantIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>5 restaurants</h6>
                            </div>

                            <div
                                className={`${style.facilities} d-flex justify-content-start align-items-center gap-2 flex-warp mb-3`}
                            >
                                <AccessibleOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Facilities for disabled guests</h6>
                                <SmokeFreeOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Non-smoking rooms</h6>
                                <RoomServiceOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Room service</h6>
                            </div>

                            <div
                                className={`${style.facilities} d-flex justify-content-start align-items-center gap-2 flex-warp mb-3`}
                            >
                                <CoffeeMakerOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Tea/Coffee Maker in All Rooms</h6>
                                <LocalBarIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Bar</h6>
                                <FreeBreakfastOutlinedIcon
                                    sx={{ color: '#000000', width: '20px', height: '18px' }}
                                />
                                <h6>Very Good Breakfast</h6>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div
                                className={`${style.hotelBrandBox} mb-2 d-flex justify-content-center align-items-center`}
                            >
                                <div className={style.hotelBrand}>
                                    <p>Hotel chain/brand</p>
                                    <h6>Anantara Hotels & Resorts</h6>
                                </div>
                                <div>
                                    <img src="/hotel-details/hotel.jpeg" alt="hotels" />
                                </div>
                            </div>

                            <div className={`${style.highlights}`}>
                                <h5>Property highlights</h5>
                                <h6>Perfect for a 30-night stay!</h6>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <LocationOnIcon />
                                    <p>Top Location: Highly rated by recent guests (9.5)</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <SingleBedIcon />
                                    <p>
                                        Want a great night's sleep? This property was highly rated
                                        for its very comfy beds.
                                    </p>
                                </div>

                                <h5>Breakfast Info</h5>
                                <p>Continental, Vegetarian, Halal, Asian, American,Buffet</p>

                                <h5>Options with:</h5>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <SingleBedIcon />
                                    <p>Garden view</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <SingleBedIcon />
                                    <p>Terrace</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <SingleBedIcon />
                                    <p>Pool view</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <SingleBedIcon />
                                    <p>Free Private Parking Available On Site</p>
                                </div>

                                <h5>Activities:</h5>
                                <p>Tennis court</p>
                                <p>Fitness center</p>
                                <p>Game room</p>

                                <div className={`${style.reserveBtn}`}>
                                    <button>Reserve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.popularHotels}>
                    <h6>Popular Hotels</h6>
                    <div className="container-fluid mt-2">
                        <div className="row">
                            {hotels?.data?.slice(0, 4).map((hotel, index) => (
                                <div className="col-md-3 mb-3" key={index}>
                                    <div className={`${style.cardSection} card`}>
                                        <img
                                            className={style.cardSectionImg}
                                            src={hotel.images}
                                            alt={hotel.name}
                                        />
                                        <div className="card-body">
                                            <h5 className={`${style.cardTitle}`}>{hotel.name}</h5>
                                            <p
                                                className={`${style.cardBodyPopular}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: hotel.description || '',
                                                }}
                                            >
                                                {/* {hotel.description} */}
                                            </p>
                                            <div className={style.cardRate}>
                                                <div className="ml-2">
                                                    <img
                                                        src="/homepage/hotels/star.png"
                                                        alt="star"
                                                    />
                                                </div>
                                                <p className="m-0">{hotel.rating}</p>
                                            </div>
                                            <div className={style.cardPrice}>
                                                <p>{hotel.price}price</p>
                                                <div>{hotel.days} nights</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
