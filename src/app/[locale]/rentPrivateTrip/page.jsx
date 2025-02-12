import React from 'react';
import style from './rentPrivateTrip.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Newsletter from '../home/component/newsletter/Newsletter';
import { useTranslations } from 'next-intl';

const page = () => {
    const t = useTranslations('HomePage');
    const breadcrumbs = [
        { label: t('Home'), href: '/' },
        { label: 'States', href: '/' },
        { label: ' Confirm booking' },
    ];
    return (
        <div>
            <NavBar />
            <div className={style.rentTrip}>
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

                <div className={style.dynamicBreadcrumbs}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                </div>

                <div className="px-lg-5">
                    <div className="container-fluid mt-lg-3 mt-2">
                        <div className="row">
                            <div className={`${style.formBody} col-md-7 mb-3`}>
                                <div className="row border py-lg-5 py-2 px-lg-3 px-2 rounded-3">
                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            From <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Type your location"
                                        />
                                    </div>

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            To <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Type your location"
                                        />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            First Name <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Last Name <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Email <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="email"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Phone Number <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your preferred contact number"
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            From Date <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            To Date <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            From Time <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            To Time <span>*</span>
                                        </label>
                                        <input
                                            className={style.contactInput}
                                            type="date"
                                            name=""
                                            id=""
                                        />
                                    </div>

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Bus Type <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="HighAce">High Ace</MenuItem>
                                                <MenuItem value="HighAce2">High Ace 2</MenuItem>
                                                <MenuItem value="HighAce3">High Ace 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className="col-md-6 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Payment Method <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="MUSCAT">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="m-0">PayPal</p>
                                                        <img
                                                            className={style.paypalImg}
                                                            src="/hire-guide/paypal.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </MenuItem>
                                                <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                                <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        color: '#9F733C',
                                                        '&.Mui-checked': {
                                                            color: '#65558F',
                                                        },
                                                    }}
                                                />
                                            }
                                        />
                                        <label htmlFor="">
                                            Accept{' '}
                                            <Link className={style.acceptLabels} href="/privacy">
                                                Privacy policy
                                            </Link>{' '}
                                            and{' '}
                                            <Link className={style.acceptLabels} href="/userTerms">
                                                usage terms
                                            </Link>
                                        </label>
                                    </div>

                                    <div className={style.loginBtn}>
                                        <button>
                                            <span>Confirm Booking</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4">
                                <img className={style.rentMap} src="/rent-map.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

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
                <Newsletter />
            </div>
        </div>
    );
};

export default page;
