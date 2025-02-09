import React from 'react';
import style from './hireTourGuide.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Newsletter from '../home/component/newsletter/Newsletter';
const hireTourGuide = () => {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'state', href: '/' },
        { label: ' Confirm booking' },
    ];

    return (
        <div>
            <NavBar />
            <div className={style.hireGuide}>
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

                <div className={style.hireBody}>
                    <DynamicBreadcrumbs items={breadcrumbs} />
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className="col-md-7 mb-2">
                                <div className="row">
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

                                    <div className="col-md-12 d-flex flex-column mb-3">
                                        <label className={`${style.label}`}>
                                            Country of residence <span>*</span>
                                        </label>
                                        <FormControl>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="MUSCAT">MUSCAT</MenuItem>
                                                <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                                <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
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
                                            <span>submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4 mb-2">
                                <div className="card p-4">
                                    <div className={style.guideImgBox}>
                                        <img src="/homepage/tour-guide/1.jpeg" alt="" />
                                        <div className={style.guideBoxCaption}>
                                            <h6>About Ahmed Al-Harthi</h6>
                                            <p>Expert Leader: Oman</p>
                                        </div>
                                    </div>
                                    <div className={style.cardBody}>
                                        <h6>Destinations</h6>
                                        <p>Muscat , Italy</p>
                                    </div>
                                    <div className={style.cardBody}>
                                        <h6>Activities</h6>
                                        <p>
                                            Centre-Based , Coastal Walks ,Culture, Family , Walking
                                            , Walking & Trekking ,Walking & Trekking Bestsellers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
        </div>
    );
};

export default hireTourGuide;
