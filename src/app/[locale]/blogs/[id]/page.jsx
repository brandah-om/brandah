'use client';
import NavBar from '../../../../components/navBar/NavBar';
import React, { useEffect } from 'react';
import style from './blogDetails.module.css';
import { useGetBlogsBtIdQuery } from '../../../../store/pages/BlogsDetailsSlice';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Loading from '../../../../components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import Aos from 'aos';

const Page = ({ params }) => {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('HomePage');
    const { data, isLoading, error } = useGetBlogsBtIdQuery({ id, lang: locale });
    const blog = data?.data;
    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);
    return (
        <div>
            <NavBar />
            <div className={style.blogsDetails}>
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center mt-4">
                        <p>{t('Error loading Data')}</p>
                    </div>
                ) : (
                    <div className="container-fluid text-center">
                        <div className="row">
                            <div className="col-md-10 m-auto">
                                <div className="blogs-caption mb-5">
                                    <h2 data-aos="fade-up">{blog.title}</h2>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div data-aos="fade-up" className="other-box mr-3">
                                            <span>{t('Others')}</span>
                                        </div>
                                        <span data-aos="fade-up" className="m-2">
                                            {blog.published_at}
                                        </span>
                                        <span data-aos="fade-up" className="mr-3">
                                            <ShareIcon />
                                            <span>{t('Share')}</span>
                                        </span>
                                        <span data-aos="fade-up" className="m-2">
                                            <FavoriteBorderIcon />
                                            <span className="text-decoration-underline">0</span>
                                        </span>
                                        <span data-aos="fade-up">
                                            {blog.views} <span>{t('views')}</span>
                                        </span>
                                    </div>

                                    <img
                                        data-aos="fade-up"
                                        className="img-fluid my-4 wow fadeInUp"
                                        src={blog.image || '/blogs/blogs.jpeg'}
                                        alt="blog"
                                    />
                                    <p
                                        className="mb-lg-4 mb-2"
                                        data-aos="fade-up"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.description?.[locale] ||
                                                blog.description?.['en'] ||
                                                blog.description ||
                                                '',
                                        }}
                                    >
                                        {/* {blog.description} */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
