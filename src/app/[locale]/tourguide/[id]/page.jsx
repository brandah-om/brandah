'use client';
import React, { useEffect } from 'react';
import NavBar from '@/components/navBar/NavBar';
import style from './tourDetails.module.css';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from 'next/navigation';
import { Merriweather } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useGetTourGuideQuery } from '@/store/tourGuide/AllTourGuideApiSlice';
import Loading from '@/components/Loading/Loading';
import ContactUs from '../../home/component/contactUs/ContactUs';
import Newsletter from '../../home/component/newsletter/Newsletter';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';
import { motion } from 'framer-motion';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
});
const TourGuide = () => {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations('HomePage');
    const { data, error, isLoading } = useGetTourGuideQuery(locale);

    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: t('Tour Guides'), href: `/${locale}/tourguide` },
        ...(data?.data?.length ? [{ label: data.data[0].name }] : []),
    ];

    const handleHire = () => {
        router.push(`/${locale}/hireTourGuide`);
    };

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <NavBar />
            <div className={style.tourGuide}>
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
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>{t('Error loading Data')}</p>
                ) : (
                    <>
                        <div className={style.hireHero}>
                            <h4>{data.data[0].city}</h4>
                            <h6>{t('City The capital region and economic hub of City')}</h6>
                        </div>

                        <div className={style.DynamicBreadcrumbs}>
                            <DynamicBreadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="container mt-lg-5 mt-2">
                            <div className="row">
                                <div className={`${style.detailsState} col-md-7`}>
                                    <h2 data-aos="fade-up">
                                        {t('Introducing')} {data.data[0].name}
                                    </h2>
                                    <p data-aos="fade-up" className={merriweather.className}>
                                        Quite simply, one of the top tour guides in the world. Vania
                                        was named our best newcomer in 2018 and won Brandah best
                                        leader just a year later. She was also awarded a top 10
                                        finish in the Wanderlust World Guide Awards. She has a
                                        degree in natural science from the University of Padua, plus
                                        hiking and tour guiding certifications. But beyond the
                                        medals and gongs, she’s also a proud exponent of the
                                        culture, history and cuisine of Italy, particularly her home
                                        region of Prosecco. She’s also a keen coastal walker, fond
                                        of the Amalfi Coast and Cinque Terre trails, and an art
                                        lover.
                                    </p>
                                    <div className="mt-lg-4 mt-2">
                                        <h3 data-aos="fade-up">{t('Expert Knowledge in')} : </h3>
                                        <ul>
                                            <li data-aos="fade-up">Italian culture</li>
                                            <li data-aos="fade-up">Natural science</li>
                                            <li data-aos="fade-up">Italian food and traditions</li>
                                            <li data-aos="fade-up">
                                                Hiking from hills to the Dolomites
                                            </li>
                                            <li data-aos="fade-up">First aid and CPR</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 data-aos="fade-up">{t('What You Say')} : </h4>
                                        <div className="pl-3">
                                            <p
                                                data-aos="fade-up"
                                                className={`${merriweather.className} ${style.borderCaption}`}
                                            >
                                                What can I say about Vania that hasn’t already been
                                                said! I chose this trip because I wanted to travel
                                                with Vania again having previously walked the Amalfi
                                                coast with a group led by her in March 2018. She is
                                                a delightful, professional, friendly and calm person
                                                with a great sense of humour, and I joked with her
                                                that she was our Mummy and we were her chicks
                                                following closely behind. Nothing seemed to phase
                                                her and she always had a smile for everyone. She is
                                                a credit to Brandah – Eve
                                            </p>
                                            <p
                                                data-aos="fade-up"
                                                className={`${merriweather.className} ${style.borderCaption} mt-lg-5 mt-2`}
                                            >
                                                Vania was an excellent group leader. She was
                                                knowledgeable, easy going, caring, smiling and
                                                patient – lovely to be around – Rachel
                                            </p>
                                            <p
                                                data-aos="fade-up"
                                                className={`${merriweather.className} ${style.borderCaption} mt-lg-5 mt-2`}
                                            >
                                                She is the best. Warm, kind, thoughtful, very
                                                social, accommodating, and goes beyond the call if
                                                duty. I went specifically on this trip, that week to
                                                walk again with Vania. I walked with her in Amalfi
                                                last year – Sarah
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-1"></div>

                                <div className="col-md-4 mb-2">
                                    <div className="card p-4">
                                        <div className={style.guideImgBox}>
                                            <img
                                                data-aos="fade-up"
                                                src="/homepage/tour-guide/1.jpeg"
                                                alt=""
                                            />
                                            <div className={style.guideBoxCaption}>
                                                <h6 data-aos="fade-up">
                                                    {t('About')} {data.data[0].name}
                                                </h6>
                                                <p data-aos="fade-up">
                                                    {t('Expert Leader')} : {data.data[0].city}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={style.cardBody}>
                                            <h6 data-aos="fade-up">{t('Destinations')}</h6>
                                            <p data-aos="fade-up">
                                                {data.data[0].city} , {data.data[0].country}
                                            </p>
                                        </div>
                                        <div className={style.cardBody}>
                                            <h6 data-aos="fade-up">{t('Activities')}</h6>
                                            <p>
                                                Centre-Based , Coastal Walks ,Culture, Family ,
                                                Walking , Walking & Trekking ,Walking & Trekking
                                                Bestsellers
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        // data-aos="fade-up"
                                        className={style.hirBtn}
                                    >
                                        <button onClick={handleHire}>
                                            <span>
                                                {t('Hire')} {data.data[0].name}
                                            </span>
                                            <ArrowRightAltIcon
                                                sx={{ width: '40px', height: '40px' }}
                                            />
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className={`${style.topGuide} container-fluid mt-4`}>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 data-aos="fade-up">{t('Top Rated Tour Guides')}</h2>
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
                                        {data.data.map(guide => (
                                            <SwiperSlide
                                                data-aos="fade-up"
                                                key={guide.id}
                                                className="position-relative"
                                            >
                                                <div>
                                                    <div className={`${style.cardSection} card`}>
                                                        <img
                                                            className={style.swiperSlideImage}
                                                            src="/homepage/tour-guide/1.jpeg"
                                                            alt="tourGuide"
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
                                                                    {guide.city} , {guide.country}
                                                                </p>
                                                            </div>

                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.location}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src="/homepage/tour-guide/lang.png"
                                                                        alt="lang"
                                                                    />
                                                                </div>
                                                                {guide.languages.map(lang => (
                                                                    <p
                                                                        className="m-0"
                                                                        key={lang.id}
                                                                    >
                                                                        {lang.name}
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            <div
                                                                data-aos="fade-up"
                                                                className={style.cardPrice}
                                                            >
                                                                <p>$ {guide.price}</p>
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
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <ContactUs />
                <Newsletter />
            </div>
        </div>
    );
};

export default TourGuide;
