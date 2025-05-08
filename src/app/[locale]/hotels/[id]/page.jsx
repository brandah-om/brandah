'use client';
import React, { useState } from 'react';
import style from './hotelDetails.module.css';
import NavBar from '../../../../components/navBar/NavBar';
import DynamicBreadcrumbs from '../../../../components/dynamicBreadcrumbs/DynamicBreadcrumbs';
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
import { useGetHotelsBtIdQuery } from '../../../../store/hotels/hotelDetailsApiSlice';
import { useGetHotelsQuery } from '../../../../store/hotels/hotelsApiSlice';
import Loading from '../../../../components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import MapComponent from '../../destinations/components/MapComponent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const HotelDetails = ({ params }) => {
    const [openMapDialog, setOpenMapDialog] = useState(false);
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');

    const { data, error, isLoading } = useGetHotelsBtIdQuery({ id, lang: locale });
    const details = data?.data;

    const {
        data: hotels,
        error: errorHotels,
        isLoading: isLoadingHotels,
    } = useGetHotelsQuery(locale);

    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: t('Hotels'), href: `/${locale}/hotels` },
        { label: data?.data?.name },
    ];

    const handleOpenMapDialog = () => {
        setOpenMapDialog(true);
    };

    const handleCloseMapDialog = () => {
        setOpenMapDialog(false);
    };

    return (
        <div>
            <NavBar />
            {isLoading || isLoadingHotels ? (
                <Loading />
            ) : error ? (
                <p>{t('Error loading Data')}</p>
            ) : (
                <>
                    <div className={style.hotelDetails}>
                        <div className={style.DynamicBreadcrumbs}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="container">
                            <div className="row mb-4">
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

                                                <h6 className={style.titleName}>
                                                    {t('Airport shuttle')}
                                                </h6>
                                                <div className={style.certificationBox}>
                                                    <WorkspacePremiumIcon
                                                        sx={{
                                                            color: '#000000',
                                                            width: '12px',
                                                            height: '12px',
                                                        }}
                                                    />
                                                    <h5>{t('Sustainability certification')}</h5>
                                                </div>
                                            </div>
                                            <div className={style.detailsTitle}>
                                                <h3>{data?.data?.name}</h3>
                                            </div>
                                            <div className={style.detailsLocation}>
                                                {/* <LocationOnIcon
                                            sx={{ color: '#000000', width: '13px', height: '20px' }}
                                        /> */}
                                                <h6
                                                    dangerouslySetInnerHTML={{
                                                        __html: data?.data?.description || '',
                                                    }}
                                                >
                                                    {/* PO Box 110, Al Jabal Al Akhdar, Nizwa, Oman, 621 Al ‘Aqar, Oman
                                            - */}
                                                </h6>

                                                <Link
                                                    href="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        handleOpenMapDialog();
                                                    }}
                                                >
                                                    {t('ExcellentLocation')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-9 mb-2 d-lg-block d-none">
                                    <div className="row">
                                        <div className="col-md-4 px-lg-1 px-auto mb-1">
                                            <div className="row">
                                                {/* {details.images.slice(0,1).map((img)=>( */}
                                                <div className="col-12 mb-2">
                                                    <img
                                                        className="img-fluid"
                                                        // src="/hotel-details/1.jpeg"
                                                        src={
                                                            details.images[0] ||
                                                            '/hotel-details/1.jpeg'
                                                        }
                                                        alt="hotel-details"
                                                        style={{ height: '100%', width: '100%' }}
                                                    />
                                                </div>
                                                {/* // ))} */}
                                                <div className="col-12">
                                                    <img
                                                        className="img-fluid"
                                                        src={
                                                            details.images[1] ||
                                                            '/hotel-details/1.jpeg'
                                                        }
                                                        alt="hotel-details"
                                                        style={{ height: '100%', width: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-8 mb-1 px-lg-1 px-auto">
                                            <img
                                                className="img-fluid"
                                                src={details.images[2] || '/hotel-details/1.jpeg'}
                                                alt="hotel-details"
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                src={details.images[3] || '/hotel-details/2.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                src={details.images[4] || '/hotel-details/3.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                src={details.images[5] || '/hotel-details/4.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                src={details.images[6] || '/hotel-details/5.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                className="img-fluid"
                                                src={details.images[7] || '/hotel-details/7.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        <div className="col-md-2 px-lg-1 px-auto mb-1">
                                            <img
                                                style={{ height: '100%', width: '100%' }}
                                                className="img-fluid"
                                                src={details.images[7] || '/hotel-details/6.jpeg'}
                                                alt="hotel-details"
                                            />
                                        </div>
                                        {/* <div className="col-md-2 px-lg-1 px-auto mb-1">
                                    <div className={style.lastImg}>
                                        <img
                                            style={{ height: '70%', width: '100%' }}
                                            className="img-fluid"
                                            src="/hotel-details/7.jpeg"
                                            alt="hotel-details"
                                        />
                                        <Link href="/">+37 photos</Link>
                                    </div>
                                </div> */}
                                    </div>
                                </div>

                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    navigation={true}
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 20 },
                                        768: { slidesPerView: 3, spaceBetween: 30 },
                                        1024: { slidesPerView: 4, spaceBetween: 40 },
                                        1200: { slidesPerView: 5, spaceBetween: 50 },
                                    }}
                                    modules={[Navigation]}
                                    className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5 my-4 d-lg-none d-block`}
                                >
                                    <SwiperSlide className="position-relative">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <img
                                                src="/hotel-details/2.jpeg"
                                                alt="hotel-details"
                                                style={{
                                                    height: '250px',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </motion.div>
                                    </SwiperSlide>

                                    <SwiperSlide className="position-relative">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <img
                                                src="/hotel-details/3.jpeg"
                                                alt="hotel-details"
                                                style={{
                                                    height: '250px',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </motion.div>
                                    </SwiperSlide>

                                    <SwiperSlide className="position-relative">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <img
                                                src="/hotel-details/4.jpeg"
                                                alt="hotel-details"
                                                style={{
                                                    height: '250px',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </motion.div>
                                    </SwiperSlide>
                                </Swiper>

                                <div className="col-md-3">
                                    {/* <div className="card mb-3">
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
                                                “The Hotel is amazing and the time was perfect, we
                                                loved the room atmosphere and the services fast
                                                services... Perfect place to get away from the...”
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
                                    </div> */}
                                    <div className={style.map}>
                                        {/* <img
                                    style={{ width: '100%', height: '100%' }}
                                    className="img-fluid"
                                    src="/hotel-details/map.png"
                                    alt="map"
                                /> */}
                                        {/* <div className={style.mapLocation}>
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
                                </div> */}

                                        {data?.data?.latitude && data?.data?.longitude ? (
                                            <MapComponent
                                                latitude={parseFloat(data.data.latitude)}
                                                longitude={parseFloat(data.data.longitude)}
                                            />
                                        ) : (
                                            <p>{t('Loading map')}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-2 my-2">
                                {details?.icons_header?.slice(0, 5).map((item, index) => (
                                    <div key={index} style={{ width: '100%', height: '100%' }}>
                                        <div
                                            className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                                        >
                                            <i
                                                className={`${item.icon} me-2`}
                                                style={{ color: '#000000', fontSize: '18px' }}
                                            ></i>
                                            <p className="mb-0">{item[`title-${locale}`]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center gap-2 my-2">
                                {details?.icons_header?.slice(5).map((item, index) => (
                                    <div key={index} style={{ width: '100%', height: '100%' }}>
                                        <div
                                            className={`${style.detailsAboutBox} d-flex justify-content-start align-items-center gap-3 p-2 py-3`}
                                        >
                                            <i
                                                className={`${item.icon} me-2`}
                                                style={{ color: '#000000', fontSize: '18px' }}
                                            ></i>
                                            <p className="mb-0">{item[`title-${locale}`]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-8">
                                    <h6 className={style.serviceTitle}>
                                        {t('Experience World class Service at')} {details.name}
                                    </h6>
                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                        <CheckOutlinedIcon />
                                        <h6 className={style.servicesInfoTitle}>Reliable info:</h6>
                                        <h6 className={style.serviceInfoCaption}>
                                            Guests say the description and photos for this property
                                            <span> are very accurate.</span>
                                        </h6>
                                    </div>
                                    <p className={style.serviceCaption}>
                                        {details.name}, the highest five-star resort in the middle
                                        east on the curving rim of a great canyon, is a secluded
                                        haven for the intrepid and discerning. 13 mi from Nizwa, the
                                        resort features panoramic views from the cliff-edge infinity
                                        pool. Guests can enjoy free WiFi throughout the property.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        A total of 115 luxury rooms and villas overlook either the
                                        dramatic canyon or tranquil gardens and a spa-like bathroom
                                        complete with a rain shower. Luxury villas grant guests an
                                        intimate escape each with personal villa host services and a
                                        private infinity pool overlooking the cliffs or hidden in an
                                        exotic garden. Each villa features state-of- the-art
                                        interactive LED IPTVs and spacious walk-in dressing areas,
                                        all adding to a sense of sublime luxury.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        A selection of five dining venues to choose from, Al Qalaa a
                                        fine dining Arabian grill concept, Bella Vista an Italian
                                        restaurant overlooking the grand canyon, Al Maisan all day
                                        dining serving world classics and cooking classes or Al Baha
                                        the café deli located in the open air courtyard. Celebrate
                                        on Diana’s Point platform or The Royal Edge with a unique
                                        private dining experience overlooking the canyons.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        A cliff-edge infinity pool, 2 hot tubs, children’s pool,
                                        state-of-the-art Fitness Center and tennis court are
                                        available to enjoy. The Anantara Spa harnesses the essence
                                        of Arabia complete with a Hammam and private outdoor
                                        relaxation areas and separate male and female indoor
                                        Jacuzzis. The kids’ and teens’ club offers fun-filled
                                        activities for all ages.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        The resort presents travelers with authentic experiences,
                                        allowing them to explore the nearby culture, history and
                                        landscape. Activities include Via Ferrata, hiking, cultural
                                        tours, abseiling, mountain climbing, archery and mountain
                                        biking. The resort’s expansive garden flourishes with a
                                        variety of plants and crops, including Damask roses,
                                        pomegranates, olives, and figs, reflecting the region’s
                                        natural beauty and bounty. The resort also features
                                        conference and meeting facilities.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        Kindly be informed that a 4x4 (four-wheel drive) vehicle is
                                        required to access Al Jabal Al Akhdar as per government
                                        regulations. The drivers license and car registration
                                        documents which can confirm the vehicle is 4x4 (four-wheel
                                        drive) capable must also be presented at the checkpoint. The
                                        property is two hours from Muscat International Airport or
                                        four and half hours from Dubai – past date plantations, dry
                                        riverbeds known locally as wadis, and historical forts.
                                        Luxury transfers can be arranged on request.
                                    </p>
                                    <p className={style.serviceCaption}>
                                        Couples in particular like the location – they rated it 9.5
                                        for a two-person trip.
                                    </p>

                                    <h6 className={style.serviceTitle}>
                                        {t('Most popular facilities')}
                                    </h6>
                                    <div
                                        className={`${style.facilities} d-flex justify-content-start align-items-center gap-2 flex-wrap mb-3`}
                                    >
                                        {details?.facilities_icons?.map((facility, index) => (
                                            <div
                                                key={index}
                                                className={`${style.facilities} d-flex justify-content-start align-items-center gap-2 flex-wrap mb-3`}
                                            >
                                                <i
                                                    className={`${facility.icon} me-2`}
                                                    style={{
                                                        color: '#000000',
                                                        width: '20px',
                                                        height: '18px',
                                                    }}
                                                />
                                                <h6>{facility[`title-${locale}`]}</h6>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div
                                        className={`${style.hotelBrandBox} mb-2 d-flex justify-content-center align-items-center`}
                                    >
                                        <div className={style.hotelBrand}>
                                            <p>{t('chain')}</p>
                                            <h6>{details.name}</h6>
                                            <p>{details.category.name}</p>
                                        </div>
                                        <div>
                                            <img
                                                src={details.image || '/hotel-details/hotel.jpeg'}
                                                alt="hotels"
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.highlights}`}>
                                        <h5>{t('Hotel highlights')}</h5>
                                        {/* <h6>Perfect for a 30-night stay!</h6> */}
                                        <div className="d-flex justify-content-start align-items-center gap-2 mb-2 flex-wrap">
                                            <h6 className="m-0">{t('State')} :</h6>
                                            <p className="m-0">{details.state}</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start gap-2 flex-wrap">
                                            <LocalPhoneIcon />
                                            {/* <p>
                                        Want a great night's sleep? This property was highly rated
                                        for its very comfy beds.
                                    </p> */}
                                            <p>{details.phone}</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start gap-2 flex-wrap">
                                            <EmailIcon />
                                            {/* <p>Top Location: Highly rated by recent guests (9.5)</p> */}
                                            <p>{details.email}</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                                            <h6>{t('Website')} :</h6>
                                            <h6>
                                                <a className="text-main" href={details.url}>
                                                    {t('click here')}
                                                </a>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                                            <h6>{t('Link To Book')} :</h6>
                                            <h6>
                                                <a
                                                    className="text-main"
                                                    href={details.link_to_book}
                                                >
                                                    {t('click here')}
                                                </a>
                                            </h6>
                                        </div>
                                        <h5>{t('Breakfast Info')}</h5>
                                        {/* <p>Continental, Vegetarian, Halal, Asian, American,Buffet</p> */}
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    details.breakfast_info?.[locale] ||
                                                    details.breakfast_info?.['en'] ||
                                                    details.breakfast_info ||
                                                    '',
                                            }}
                                        ></p>
                                        <h5>{t('Number Of Days')}</h5>
                                        <p>{details.days}</p>
                                        <h5>{t('Price')}</h5>
                                        <p>
                                            {details.price} {details.currency}
                                        </p>
                                        <h5>{t('Options with')}:</h5>
                                        {details?.option_with?.map((option, index) => (
                                            <div
                                                key={index}
                                                className="d-flex justify-content-start align-items-start gap-2"
                                            >
                                                <i
                                                    className={`${option.icon} me-2`}
                                                    style={{
                                                        color: '#000000',
                                                        width: '20px',
                                                        height: '18px',
                                                    }}
                                                />
                                                <p>{option[`title-${locale}`]}</p>
                                            </div>
                                        ))}
                                        {/* 
                                        <div className="d-flex justify-content-start align-items-start gap-2">
                                            <SingleBedIcon />
                                            <p>Terrace</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start gap-2">
                                            <SingleBedIcon />
                                            <p>Pool view</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start gap-2">
                                            <SingleBedIcon />
                                            <p>Free Private Parking Available On Site</p>
                                        </div> */}
                                        <h5>{t('Activities')}:</h5>
                                        {/* <p>Tennis court</p>
                                <p>Fitness center</p>
                                <p>Game room</p> */}
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: details.activities || '',
                                            }}
                                        ></p>
                                        {/* {details.activities} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.popularHotels}>
                            <h6>{t('Popular Hotels')}</h6>
                            <div className="container-fluid mt-2">
                                <div className="row">
                                    {hotels?.data?.slice(0, 4).map((hotel, index) => (
                                        <div className="col-md-3 mb-3" key={index}>
                                            <Link
                                                href={`/${locale}/hotels/${hotel.id}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <div
                                                    className={`${style.cardSection} card`}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img
                                                        data-aos="fade-up"
                                                        className={style.cardSectionImg}
                                                        src={hotel.image}
                                                        alt={hotel.name}
                                                    />
                                                    <div className="card-body">
                                                        <h5
                                                            data-aos="fade-up"
                                                            className={`${style.cardTitle}`}
                                                        >
                                                            {hotel.name || 'No Name'}
                                                        </h5>
                                                        <p
                                                            data-aos="fade-up"
                                                            className={`${style.cardBody}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: hotel.description || '',
                                                            }}
                                                        />
                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardRate}
                                                        >
                                                            <div className="ml-2">
                                                                <img
                                                                    src="/homepage/hotels/star.png"
                                                                    alt="star"
                                                                />
                                                            </div>
                                                            <p className="m-0">
                                                                {hotel.rating || 'no rate'}
                                                            </p>
                                                        </div>
                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardPrice}
                                                        >
                                                            <p>
                                                                {hotel.price || 'No price'}{' '}
                                                                {hotel.currency}
                                                            </p>
                                                            <div>
                                                                {hotel.days}{' '}
                                                                {t('nights accomodation')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        open={openMapDialog}
                        onClose={handleCloseMapDialog}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle>
                            {t('Location on Map')}
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseMapDialog}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: theme => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <MapComponent
                                latitude={data?.data?.latitude}
                                longitude={data?.data?.longitude}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </div>
    );
};
export default HotelDetails;
