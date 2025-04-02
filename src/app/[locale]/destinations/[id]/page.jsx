'use client';
import React, { useEffect } from 'react';
import style from './stateDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Oxygen } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import Newsletter from '../../home/component/newsletter/Newsletter';
import ContactUs from '../../home/component/contactUs/ContactUs';
import { useGetStatesBtIdQuery } from '@/store/States/StateDetailsSlice';
import MapComponent from '../components/MapComponent';
import Link from 'next/link';
import CategryTabs from '../Tabs/CategoryTabs';
import Aos from 'aos';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import { useGetHotelsQuery } from '@/store/hotels/hotelsApiSlice';

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();

    const { data, isLoading, error } = useGetStatesBtIdQuery({ id, lang: locale });
    const { data: hotelData } = useGetHotelsQuery(locale);

    const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: t('States'), href: `/${locale}/destinations` },
        { label: data?.state_details?.name },
    ];

    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <NavBar />
            {/* <ToastContainer/> */}
            <div className={style.stateDetails}>
                <div className="container">
                    <div className="row">
                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/1.png"
                                alt="hire-guide"
                            />
                            <span>{t('Expert local guides')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/2.png"
                                alt="hire-guide"
                            />
                            <span>{t('Make your tour more pleasure')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon} col-md-3 mb-2 d-flex gap-3 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/3.png"
                                alt="hire-guide"
                            />
                            <span>{t('Make your tour more pleasure')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>

                        <div
                            className={`${style.boxIcon2} col-md-3 mb-2 d-flex gap-2 justify-content-center align-items-center`}
                        >
                            <img
                                className={style.hireIcon}
                                src="/hire-guide/4.png"
                                alt="hire-guide"
                            />
                            <span>{t('Active holiday specialists')}</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>
                    </div>
                </div>
                <div
                    className={style.hireHero}
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.288), rgba(0, 0, 0, 0.274)), 
                                    url(${data?.state_details?.banner || '/hero-section.jpeg'})`,
                        height: '500px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h4 data-aos="fade-up">{data?.state_details?.name}</h4>
                    <h6 data-aos="fade-up">
                        Muscat The capital region and economic hub of Oman still
                    </h6>
                </div>
                <div className={style.DynamicBreadcrumbs}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>
                <div className={style.stateDetailsBody}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7">
                                <h2 data-aos="fade-up">Muscat, the capital city of Oman still</h2>
                                <p data-aos="fade-up">{data?.state_details?.description}</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4">
                                {/* <div className={style.cardCall}>
                                    <p>Call for general Support:</p>
                                    <h6>+20(10)1010101010</h6>
                                </div>
                                <div className={style.liveBtn}>
                                    <button>
                                        <span>Live Chat</span>
                                        <ArrowRightAltIcon sx={{ width: '40px', height: '40px' }} />
                                    </button>
                                </div>
                                <div className={style.liveBtn}>
                                    <button>
                                        <span>Request a Brochure</span>
                                        <ArrowRightAltIcon sx={{ width: '40px', height: '40px' }} />
                                    </button>
                                </div> */}

                                <div
                                    data-aos="fade-up"
                                    className={`${style.liveBtn} ${style.places} mt-3`}
                                >
                                    {/* <img src="/map.png" alt="map" /> */}

                                    {data?.state_details?.latitude &&
                                    data?.state_details?.longitude ? (
                                        <MapComponent
                                            latitude={parseFloat(data.state_details.latitude)}
                                            longitude={parseFloat(data.state_details.longitude)}
                                        />
                                    ) : (
                                        <p>{t('Loading map')}</p>
                                    )}

                                    {/* <button>
                                        <span>View near by places</span>
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        <CategryTabs id={id} />

                        <div className={`${style.bestHotels} row mt-4`}>
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2 data-aos="fade-up">
                                    {t('Best Hotels in')} {data?.state_details?.name}
                                </h2>
                                <p data-aos="fade-up" className={style.bestCaption}>
                                    {t(
                                        'Explore our popular hotels voted by more than +100,000 customers'
                                    )}
                                </p>
                            </div>

                            {data?.hotels?.map((hotel, index) => (
                                <div className="col-md-3 mb-3" key={index}>
                                    <Link
                                        className="text-decoration-none"
                                        href={`/${locale}/hotels/${hotel.id}`}
                                    >
                                        <div className={`${style.cardSectionBest} card`}>
                                            <div className={style.imageWrapper}>
                                                {' '}
                                                <img
                                                    className={style.cardSectionImg}
                                                    src={hotel.images}
                                                    alt={hotel.title}
                                                    data-aos="fade-up"
                                                />
                                            </div>
                                            <div className="card-body">
                                                <h5
                                                    data-aos="fade-up"
                                                    className={`${style.cardTitle}`}
                                                >
                                                    {hotel.name}
                                                </h5>
                                                <p
                                                    data-aos="fade-up"
                                                    className={`${style.cardBody}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: hotel.description,
                                                    }}
                                                ></p>
                                                <div data-aos="fade-up" className={style.cardRate}>
                                                    <div className="ml-2">
                                                        <img
                                                            src="/homepage/hotels/star.png"
                                                            alt="star"
                                                        />
                                                    </div>
                                                    <p className="m-0">{hotel.rating}</p>
                                                </div>
                                                <div data-aos="fade-up" className={style.cardPrice}>
                                                    <p>{hotel.price} $</p>
                                                    <div>
                                                        {hotel.days}{' '}
                                                        {t('days including accomodation')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            <div
                                className="col-md-12 d-flex justify-content-center align-items-center"
                                data-aos="fade-up"
                            >
                                <div className={style.moreHotelsBtn}>
                                    <Link href={`/${locale}/destinations/${id}/hotels`}>
                                        {t('View More Hotels')}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.topGuide} row mt-5`}>
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2 data-aos="fade-up">{t('Top Rated Tour Guides')}</h2>
                                <p data-aos="fade-up" className={style.bestCaption}>
                                    {t('Hire expert tour guides trusted by +100,000 customers')}
                                </p>
                            </div>
                            <div className="col-md-12 mb-2">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    navigation={true}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        1200: {
                                            slidesPerView: 3,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                                >
                                    {data?.tour_guides?.map((guide, index) => (
                                        <SwiperSlide key={guide.id} className="position-relative">
                                            <Link
                                                className="text-decoration-none"
                                                href={`/${locale}/tourguide/${guide.id}`}
                                            >
                                                <div data-aos="fade-up" data-aos-delay="0">
                                                    <div className={`${style.cardSection} card`}>
                                                        <img
                                                            data-aos="fade-up"
                                                            className={style.swiperSlideImage}
                                                            src={
                                                                guide.image ||
                                                                '/homepage/tour-guide/1.jpeg'
                                                            }
                                                            alt={guide.name}
                                                        />
                                                        <div className="card-body">
                                                            <h5
                                                                data-aos="fade-up"
                                                                className={`${style.cardTitle}`}
                                                            >
                                                                {guide.name}
                                                            </h5>
                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.cardRate}
                                                            >
                                                                <div className="ml-2">
                                                                    <img
                                                                        src="/homepage/tour-guide/star.png"
                                                                        alt="star"
                                                                    />
                                                                </div>
                                                                <p className="m-0">{guide.rate}</p>
                                                            </div>

                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.location}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/location.png"
                                                                        alt="location"
                                                                    />
                                                                </div>
                                                                <p className="m-0">
                                                                    {guide.state},{guide.country}
                                                                </p>
                                                            </div>

                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.location}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/lang.png"
                                                                        alt="location"
                                                                    />
                                                                </div>
                                                                <p className={style.language}>
                                                                    {guide.languages
                                                                        .map(lang => lang.name)
                                                                        .join(', ')}
                                                                </p>
                                                            </div>

                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.cardPrice}
                                                            >
                                                                <p>${guide.price}</p>
                                                                <div>
                                                                    {t('for')} {guide.days}{' '}
                                                                    {t(
                                                                        'days including accomodation'
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div
                                data-aos="fade-up"
                                className="col-md-12 d-flex justify-content-center align-items-center"
                            >
                                <div className={style.moreHotelsBtn}>
                                    <Link href={`/${locale}/destinations/${id}/tourguide`}>
                                        {t('View More Guides')}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.agency} row mt-5`}>
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2 data-aos="fade-up">{t('Top Rated Agencies')}</h2>
                                <p data-aos="fade-up" className={style.bestCaption}>
                                    {t('Hire expert agency trusted by +100,000 customers')}
                                </p>
                            </div>
                            <div className="col-md-12 mb-2">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    navigation={true}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        1200: {
                                            slidesPerView: 3,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                                >
                                    {data?.agencies?.map(agency => (
                                        <SwiperSlide className="position-relative" key={agency.id}>
                                            <Link
                                                className="text-decoration-none"
                                                href={`/${locale}/agency/${agency.id}`}
                                            >
                                                <div
                                                    data-aos="fade-up"
                                                    className={`${style.cardSection} card`}
                                                >
                                                    <img
                                                        className={style.swiperSlideImage}
                                                        src={
                                                            agency.image ||
                                                            '/homepage/tour-guide/1.jpeg'
                                                        }
                                                        alt="agency"
                                                    />
                                                    <div className="card-body">
                                                        <h5
                                                            data-aos="fade-up"
                                                            className={`${style.cardTitle}`}
                                                        >
                                                            {agency.name}
                                                        </h5>
                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardDetails}
                                                        >
                                                            <div className="ml-2">
                                                                <LocalPhoneIcon
                                                                    sx={{ color: '#9F733C' }}
                                                                />
                                                            </div>
                                                            <p className="m-0">{agency.phone}</p>
                                                        </div>

                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardDetails}
                                                        >
                                                            <div>
                                                                <EmailIcon
                                                                    sx={{ color: '#9F733C' }}
                                                                />
                                                            </div>
                                                            <p className="m-0">{agency.email}</p>
                                                        </div>

                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardDetails}
                                                        >
                                                            <div>
                                                                <AssessmentIcon
                                                                    sx={{ color: '#9F733C' }}
                                                                />
                                                            </div>
                                                            <p className="m-0">
                                                                {agency.provider_type}
                                                            </p>
                                                        </div>

                                                        <div
                                                            data-aos="fade-up"
                                                            className={style.cardDetails}
                                                        >
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <LocationCityIcon
                                                                    sx={{ color: '#9F733C' }}
                                                                />
                                                                <p className="m-0">{agency.city}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <FlagIcon
                                                                    sx={{ color: '#9F733C' }}
                                                                />
                                                                <p className="m-0">
                                                                    {agency.country}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div
                                data-aos="fade-up"
                                className="col-md-12 d-flex justify-content-center align-items-center"
                            >
                                <div className={style.moreHotelsBtn}>
                                    <Link href={`/${locale}/destinations/${id}/agency`}>
                                        {t('View More Agencies')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <ContactUs /> */}
                {/* <Newsletter /> */}
            </div>
        </div>
    );
};

export default page;
