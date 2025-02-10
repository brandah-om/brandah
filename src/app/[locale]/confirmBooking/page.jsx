'use client';
import React, { useEffect, useState } from 'react';
import style from './confirm.module.css';
import NavBar from '@/components/navBar/NavBar';
import DynamicBreadcrumbs from '@/components/dynamicBreadcrumbs/DynamicBreadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Newsletter from '../home/component/newsletter/Newsletter';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
const page = () => {
    const locale = useLocale();

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Trips', href: `/${locale}/trips` },
        { label: ' Confirm booking' },
    ];

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const description = searchParams.get('description');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');

    const [firstNameState, setFirstNameState] = useState('');
    const [lastNameState, setLastNameState] = useState('');
    const [emailState, setEmailState] = useState('');

    useEffect(() => {
        setFirstNameState(firstName || '');
        setLastNameState(lastName || '');
        setEmailState(email || '');
    }, [firstName, lastName, email]);

    return (
        <div>
            <NavBar />
            <div className={style.hireGuide}>
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
                                            defaultValue={firstNameState || ''}
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
                                            defaultValue={lastNameState || ''}
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
                                            defaultValue={emailState || ''}
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
                                            <Link
                                                className={style.acceptLabels}
                                                href={`/${locale}/privacy`}
                                            >
                                                Privacy policy
                                            </Link>{' '}
                                            and{' '}
                                            <Link
                                                className={style.acceptLabels}
                                                href={`/${locale}/userTerms`}
                                            >
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
                                        <img src="/homepage/top-trip/1.jpeg" alt="tripImg" />
                                        <div className={style.guideBoxCaption}>
                                            <h6>{name || 'null'}</h6>
                                            {/* <p>Expert Leader: Oman</p> */}
                                        </div>
                                    </div>
                                    <div className={style.cardBody}>
                                        <h6>Price</h6>
                                        <p>{price}</p>
                                    </div>
                                    <div className={style.cardBody}>
                                        <h6>description</h6>
                                        <p>{description || 'null'}</p>
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

export default page;
