'use client';
import NavBar from '@/components/navBar/NavBar';
import React from 'react';
import './blogs.css';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGetBlogsQuery } from '@/store/pages/BlogsPageSlice';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';

const Page = () => {
    const { data, isLoading, error } = useGetBlogsQuery();
    const locale = useLocale();

    return (
        <div>
            <NavBar />
            <div className="blogs">
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-center mt-4">
                        <p>Error loading blog details.</p>
                    </div>
                ) : (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-lg-8 blogs-content">
                                {data?.data.map(blog => (
                                    <div key={blog.id} className="blogs-caption mb-5">
                                        <h2 className="wow fadeInLeft">{blog.title}</h2>
                                        <div className="d-flex justify-content-center align-items-center wow fadeInLeft">
                                            <div className="other-box mr-3">
                                                <span>Others</span>
                                            </div>
                                            <span className="m-2">{blog.published_at}</span>
                                            <span className="mr-3">
                                                <ShareIcon />
                                                <span>Share</span>
                                            </span>
                                            <span className="m-2">
                                                <FavoriteBorderIcon />
                                                <span className="text-decoration-underline">0</span>
                                            </span>
                                            <span>
                                                {blog.views} <span>views</span>
                                            </span>
                                        </div>

                                        <img
                                            className="img-fluid my-4 wow fadeInUp"
                                            src={blog.image || '/blogs/blogs.jpeg'}
                                            alt="tour-items"
                                        />
                                        <p className="mb-lg-4 mb-2 wow fadeInLeft">
                                            {blog.description}
                                        </p>
                                        <div className="d-flex justify-content-center mb-5 mt-3 wow fadeInLeft">
                                            <button>
                                                <Link
                                                    className="text-decoration-none"
                                                    href={`/${locale}/blogs/${blog.id}`}
                                                >
                                                    read more
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-1"></div>

                            <div className="col-md-6 col-lg-3 trending">
                                <h6 className="wow fadeInUp">TRENDING POSTS</h6>

                                <div className="d-flex align-items-center mb-4 gap-3 trending-box wow fadeInUp">
                                    <img className="mr-3" src="/blogs/blog-1.png" alt="" />
                                    <div>
                                        <p>Abu Simbel</p>
                                        <span>May 1, 2022</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3 mb-4 trending-box wow fadeInUp">
                                    <img className="mr-3" src="/blogs/blog-2.png" alt="" />
                                    <div>
                                        <p>
                                            6 Places in Biblical Tours of Egypt Itinerary for
                                            Christians
                                        </p>
                                        <span>June 17, 2022</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3 mb-4 trending-box wow fadeInUp">
                                    <img className="mr-3" src="/blogs/blog-3.png" alt="" />
                                    <div>
                                        <p>5 Fun Facts of Aswan Egypt You Wish You Knew</p>
                                        <span>July 7, 2022</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3 mb-4 trending-box wow fadeInUp">
                                    <img className="mr-3" src="/blogs/blog-4.png" alt="" />
                                    <div>
                                        <p>
                                            The Best Great Pyramid Photo Spots for Canadian Couples
                                        </p>
                                        <span>September 13, 2022</span>
                                    </div>
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
