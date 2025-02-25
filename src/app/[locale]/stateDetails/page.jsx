'use client';
import React from 'react';
import style from './stateDetails.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Transportation from '../home/component/Transportation/Transportation';
import { Oxygen } from 'next/font/google';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Newsletter from '../home/component/newsletter/Newsletter';
import ContactUs from '../home/component/contactUs/ContactUs';
import SwiperCar from '@/components/SwiperCar/SwiperCar';
import { useTranslations } from 'next-intl';

const oxygenFont = Oxygen({
    subsets: ['latin'],
    weight: ['400'],
});

const page = () => {
    const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: `/${locale}/` },
        { label: 'States', href: '/' },
        { label: 'Muscat' },
    ];
    const hotelsData = [
        {
            id: 1,
            title: 'Intercity Hotel Nizwa',
            description: 'Walking distance from the mall, taxi and bus station.',
            rating: '4.3',
            price: '$150',
            nights: '3 nights accomodation',
            image: '/homepage/hotels/1.png',
        },
        {
            id: 2,
            title: 'Golden Tulip Nizwa',
            description:
                'The staff at the Golden Tulip work really hard to make your stay there a great experience.',
            rating: '4.3',
            price: '$200',
            nights: '3 nights accomodation',
            image: '/homepage/hotels/2.png',
        },
        {
            id: 3,
            title: 'Date Palm Inn',
            description: 'I have only extremely positive things to say about my stay.',
            rating: '4.3',
            price: '$120',
            nights: '3 nights accomodation',
            image: '/homepage/hotels/3.png',
        },
        {
            id: 4,
            title: 'Aldar Inn',
            description: 'Walking distance from the mall, taxi and bus station.',
            rating: '4.3',
            price: '$135',
            nights: '3 nights accomodation',
            image: '/homepage/hotels/1.png',
        },
    ];
    const repeatedData = Array(2).fill(hotelsData).flat();
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
                            <span>Expert local guides</span>
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
                            <span>Make your tour more pleasure</span>
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
                            <span>Make your tour more pleasure</span>
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
                            <span>Active holiday specialists</span>
                            <img className={style.hireIcon} src="/hire-guide/info.png" alt="info" />
                        </div>
                    </div>
                </div>
                <div className={style.hireHero}>
                    <h4>Muscat</h4>
                    <h6>Muscat The capital region and economic hub of Oman</h6>
                </div>
                <div className={style.DynamicBreadcrumbs}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>
                <div className={style.stateDetailsBody}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7">
                                <h2>Muscat, the capital city of Oman</h2>
                                <p>
                                    Muscat is a treasure trove of unique experiences and stunning
                                    destinations. Visitors can start their journey at the majestic
                                    Sultan Qaboos Grand Mosque, a masterpiece of Islamic
                                    architecture, followed by a stroll along the scenic Mutrah
                                    Corniche, where the sparkling sea meets bustling souks filled
                                    with traditional goods and spices. For history enthusiasts, the
                                    Al Jalali and Al Mirani forts offer a glimpse into Oman’s rich
                                    past, while the Royal Opera House Muscat showcases the country’s
                                    dedication to arts and culture. Nature lovers can escape to
                                    Qurum Beach or explore the rugged beauty of Wadi Al Arbaeen and
                                    Bandar Al Khairan. Muscat is also a gateway to the Hajar
                                    Mountains, perfect for hiking, and the nearby Daymaniyat
                                    Islands, a diver's paradise. Whether you're seeking cultural
                                    immersion, breathtaking landscapes, or tranquil beaches, Muscat
                                    has something for everyone.
                                </p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4">
                                <div className={style.cardCall}>
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
                                </div>

                                <div className={`${style.liveBtn} ${style.places} mt-3`}>
                                    <img src="/map.png" alt="map" />
                                    <button>
                                        <span>View near by places</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.bestHotels} row mt-4`}>
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2>Best Hotels in Muscat</h2>
                                <p className={style.bestCaption}>
                                    Explore our popular hotels voted by more than +100,000 customers
                                </p>
                            </div>

                            {repeatedData.map((hotel, index) => (
                                <div className="col-md-3 mb-3" key={index}>
                                    <div className={`${style.cardSectionBest} card`}>
                                        <img
                                            className={style.cardSectionImg}
                                            src={hotel.image}
                                            alt={hotel.title}
                                        />
                                        <div className="card-body">
                                            <h5 className={`${style.cardTitle}`}>{hotel.title}</h5>
                                            <p className={`${style.cardBody}`}>
                                                {hotel.description}
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
                                                <p>{hotel.price}</p>
                                                <div>{hotel.nights}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className={style.moreHotelsBtn}>
                                <button>View More Hotels</button>
                            </div>
                        </div>

                        <div className={`${style.topGuide} row mt-5`}>
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2>Top Rated Tour Guides</h2>
                                <p className={style.bestCaption}>
                                    Hire expert tour guides trusted by +100,000 customers
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
                                            slidesPerView: 4,
                                            spaceBetween: 40,
                                        },
                                        1200: {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    modules={[Navigation]}
                                    className={`${style.mySwiper} ${style['global-pagination']} ${style['global-navigation']} px-5`}
                                >
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/1.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/2.png"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/3.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/4.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/1.jpeg"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="position-relative">
                                        <div>
                                            <div className={`${style.cardSection} card`}>
                                                <img
                                                    className={style.swiperSlideImage}
                                                    src="/homepage/tour-guide/2.png"
                                                    alt="tourGuide"
                                                />
                                                <div className="card-body">
                                                    <h5 className={`${style.cardTitle}`}>
                                                        Ahmed Al-Harthi
                                                    </h5>
                                                    <div className={style.cardRate}>
                                                        <div className="ml-2">
                                                            <img
                                                                src="/homepage/tour-guide/star.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <p className="m-0">4.3</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/location.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">Muscat , Oman</p>
                                                    </div>

                                                    <div className={style.location}>
                                                        <div>
                                                            <img
                                                                src="/homepage/tour-guide/lang.png"
                                                                alt="location"
                                                            />
                                                        </div>
                                                        <p className="m-0">English, Arabic</p>
                                                    </div>

                                                    <div className={style.cardPrice}>
                                                        <p>$ 150</p>
                                                        <div>for 3 days including accomodation</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>

                            <div className={style.moreHotelsBtn}>
                                <button>View More Guides</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Transportation />
                <SwiperCar />

                <div className="px-2">
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-md-12 text-center mb-lg-4 mb-2">
                                <h2>You may also like</h2>
                                <p className={style.bestCaption}>
                                    unique experiences and stunning destinations
                                </p>
                            </div>

                            {[...Array(7)].map((_, index) => (
                                <div key={index} className="col-md-3 mb-3">
                                    <div className={`${style.cardSectionAlsoLink} card`}>
                                        <img
                                            className="card-img-top"
                                            src="/homepage/top-trip/2.jpeg"
                                            alt="trips"
                                        />
                                        <div className="card-body">
                                            <h5 className={style.cardTitleAlsoLink}>
                                                4 Days Nizwa & Tomisaa Tour Package – Travel Deal
                                            </h5>
                                            <div className={style.cardBodyAlsoLink}>
                                                <TimerOutlinedIcon sx={{ color: '#DB944B' }} />
                                                <p className={oxygenFont.className}>
                                                    4 Days/3 Nights
                                                </p>
                                            </div>
                                            <div className={style.cardBodyAlsoLink}>
                                                <CalendarTodayOutlinedIcon
                                                    sx={{ color: '#DB944B' }}
                                                />
                                                <p className={oxygenFont.className}>
                                                    Availability : Everyday
                                                </p>
                                            </div>

                                            <div className={style.cardPriceAlsoLink}>
                                                <p>$ 135 /pac</p>
                                                <div>by Brandah Agency</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <ContactUs /> */}
                <div className="container-fluid mt-lg-4 mt-2">
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
                </div>
                {/* <Newsletter /> */}
            </div>
        </div>
    );
};

export default page;
