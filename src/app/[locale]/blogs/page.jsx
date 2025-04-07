'use client';
import NavBar from '../../../components/navBar/NavBar';
import React, { useEffect } from 'react';
import './blogs.css';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGetBlogsQuery } from '../../../store/pages/BlogsPageSlice';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Loading from '../../../components/Loading/Loading';
import Aos from 'aos';
import { BlogsDetailsSlice } from '../../../store/pages/BlogsDetailsSlice';

const Page = () => {
    const locale = useLocale();
    const { data, isLoading, error } = useGetBlogsQuery(locale);
    const t = useTranslations('HomePage');
    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);
    return (
        <div>
            <NavBar />
            <div className="blogs">
                <div className="container-fluid">
                    <div className="row">
                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div className="text-center mt-4">
                                <p>{t('Error loading Data')}</p>
                            </div>
                        ) : !data?.data || data?.data.length === 0 ? (
                            <div className="d-flex justify-content-center text-danger mt-4">
                                <p>{t('No Data Found')}</p>
                            </div>
                        ) : (
                            <div className="col-md-6 col-lg-8 blogs-content">
                                {data?.data.map((blog, index) => (
                                    <div
                                        key={blog.id}
                                        className="blogs-caption d-flex flex-column justify-content-center align-items-center mb-5"
                                    >
                                        <div className="blogs-caption">
                                            <h2>{blog.title}</h2>
                                        </div>
                                        {/* <div className="d-flex justify-content-center align-items-center wow fadeInLeft">
                                            <div
                                                data-aos="fade-up"
                                                data-aos-delay={`${index * 200}`}
                                                className="other-box mr-3"
                                            >
                                                <span>{t('Others')}</span>
                                            </div>
                                            <span
                                                data-aos="fade-up"
                                                data-aos-delay={`${index * 200 + 100}`}
                                                className="m-2"
                                            >
                                                {blog.published_at}
                                            </span>
                                            <span
                                                data-aos="fade-up"
                                                data-aos-delay={`${index * 200 + 200}`}
                                                className="mr-3"
                                            >
                                                <ShareIcon />
                                                <span>{t('Share')}</span>
                                            </span>
                                            <span
                                                data-aos="fade-up"
                                                data-aos-delay={`${index * 200 + 300}`}
                                                className="m-2"
                                            >
                                                <FavoriteBorderIcon />
                                                <span className="text-decoration-underline">0</span>
                                            </span>
                                            <span
                                                data-aos="fade-up"
                                                data-aos-delay={`${index * 200 + 400}`}
                                            >
                                                {blog.views} <span>{t('views')}</span>
                                            </span>
                                        </div> */}
                                        {/* <div className="blogs-caption">
                                            <h2>{blog.title}</h2>
                                        </div> */}

                                        <img
                                            data-aos="fade-up"
                                            data-aos-delay={`${index * 200 + 500}`}
                                            className="img-fluid my-4"
                                            src={blog.image || '/blogs/blogs.jpeg'}
                                            alt="tour-items"
                                        />
                                        <p
                                            data-aos="fade-up"
                                            data-aos-delay={`${index * 200 + 600}`}
                                            className="mb-lg-4 mb-2"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    blog.description?.[locale] ||
                                                    blog.description?.['en'] ||
                                                    blog.description ||
                                                    '',
                                            }}
                                        ></p>
                                        <div
                                            data-aos="fade-up"
                                            data-aos-delay={`${index * 200 + 700}`}
                                            className="d-flex justify-content-center mb-5 mt-3 "
                                        >
                                            <Link
                                                className="text-decoration-none"
                                                href={`/${locale}/blogs/${blog.id}`}
                                            >
                                                {t('Read More')}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="col-md-1"></div>

                        <div className="col-md-6 col-lg-3 trending">
                            <h6 data-aos="fade-up">{t('TRENDING POSTS')}</h6>

                            {/* {[
                                {
                                    title: 'Abu Simbel',
                                    date: 'May 1, 2022',
                                    image: '/blogs/blog-1.png',
                                },
                                {
                                    title: '6 Places in Biblical Tours of Egypt Itinerary for Christians',
                                    date: 'June 17, 2022',
                                    image: '/blogs/blog-2.png',
                                },
                                {
                                    title: '5 Fun Facts of Aswan Egypt You Wish You Knew',
                                    date: 'July 7, 2022',
                                    image: '/blogs/blog-3.png',
                                },
                                {
                                    title: 'The Best Great Pyramid Photo Spots for Canadian Couples',
                                    date: 'September 13, 2022',
                                    image: '/blogs/blog-4.png',
                                },
                            ].map((post, index) => ( */}
                            {data?.data.map((blog, index) => (
                                <Link
                                    href="/"
                                    key={index}
                                    className="d-flex align-items-center gap-3 mb-4 trending-box text-decoration-none"
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 200}`}
                                >
                                    <img
                                        className='postsImg mr-3'
                                        src={blog.image}
                                        alt={blog.title}
                                        data-aos="fade-up"
                                        data-aos-delay={`${index * 200 + 100}`}
                                    />
                                    <div data-aos="fade-up" data-aos-delay={`${index * 200 + 200}`}>
                                        <p>{blog.title}</p>
                                        <span>{blog.published_at}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
