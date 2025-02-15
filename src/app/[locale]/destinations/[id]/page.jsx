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

const page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();

    const { data, isLoading, error } = useGetStatesBtIdQuery({ id, lang: locale });

    const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('States'), href: `/${locale}/destinations` },
        { label: data?.state_details?.name },
    ];

    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <NavBar />
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
                                        <p>Loading map...</p>
                                    )}

                                    {/* <button>
                                        <span>View near by places</span>
                                    </button> */}
                                </div>
                            </div>
                        </div>

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

                            {data?.hotels.map((hotel, index) => (
                                <div className="col-md-3 mb-3" key={index}>
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
                                            <h5 data-aos="fade-up" className={`${style.cardTitle}`}>
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
                                                    {hotel.days} {t('days including accomodation')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className={style.moreHotelsBtn}>
                                <button>
                                    <Link href={`/${locale}/destinations/${id}/hotels`}>
                                        {t('View More Hotels')}
                                    </Link>
                                </button>
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
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="0">
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/1.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="200">
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/2.png"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="400">
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/3.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="600">
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/4.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="600">
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/1.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div data-aos="fade-up" data-aos-delay="600">
                                            <div
                                                data-aos="fade-up"
                                                className={`${style.cardSection} card`}
                                            >
                                                <img
                                                    data-aos="fade-up"
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/2.png"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5
                                                        data-aos="fade-up"
                                                        className={`${style.cardTitle}`}
                                                    >
                                                        Ahmed Al-Harthi
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
                                                        <p className="m-0">4.3</p>
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
                                                        <p className="m-0">Muscat , Oman</p>
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
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div
                                                        data-aos="fade-up"
                                                        className={style.cardPrice}
                                                    >
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>

                            <div data-aos="fade-up" className={style.moreHotelsBtn}>
                                <button>
                                    <Link href={`/${locale}/`}>{t('View More Guides')}</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <CategryTabs id={id} />
                {/* <div className="container-fluid mt-lg-4 mt-2">
                    <div className="row">
                        <div className="col-md-12 text-center mb-lg-4 mb-2">
                            <h2>Expert Blog Entries</h2>
                            <p className={style.bestCaption}>
                                unique experiences and stunning destinations
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <div className={`${style.entries}`}>
                                <img src="/homepage/top-trip/3.png" alt="" />
                                <div className={style.entriesCaption}>
                                    <h6>Lorem ipsum dolor sit </h6>
                                    <p>Consectetur adipiscing elit, sed do eiusmod Read More</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className={`${style.entries}`}>
                                <img src="/homepage/top-trip/4.jpeg" alt="" />
                                <div className={style.entriesCaption}>
                                    <h6>Lorem ipsum dolor sit </h6>
                                    <p>Consectetur adipiscing elit, sed do eiusmod Read More</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className={`${style.entries}`}>
                                <img src="/homepage/top-trip/5.png" alt="" />
                                <div className={style.entriesCaption}>
                                    <h6>Lorem ipsum dolor sit </h6>
                                    <p>Consectetur adipiscing elit, sed do eiusmod Read More</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className={`${style.entries}`}>
                                <img src="/homepage/top-trip/2.jpeg" alt="" />
                                <div className={style.entriesCaption}>
                                    <h6>Lorem ipsum dolor sit </h6>
                                    <p>Consectetur adipiscing elit, sed do eiusmod Read More</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <ContactUs />
                <Newsletter />
            </div>
        </div>
    );
};

export default page;
