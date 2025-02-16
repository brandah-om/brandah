'use client';
import * as React from 'react';
import style from './RegisterAsAgencey.module.css';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import NavBar from '@/components/navBar/NavBar';

const RegisterAsAgency = () => {
    const t = useTranslations('HomePage');
    const locale = useLocale();

    return (
        <>
            <NavBar />
            <div className={style.agencyPage}>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={style.registerAs}>
                                    Register as <span>Agency</span>
                                </p>
                                <p className={style.stayHere}>Tour the World, Start Here!</p>
                            </div>
                            <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                        </div>
                        <div className="col-md-6 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                Agency Name <span>*</span>
                            </label>
                            <input
                                className={style.contactInput}
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter the name as in your national ID"
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                Contact person <span>*</span>
                            </label>
                            <input
                                className={style.contactInput}
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter the name as in your national ID"
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
                                placeholder="Enter your preferred contact email"
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
                                Password <span>*</span>
                            </label>
                            <input
                                className={style.contactInput}
                                type="Password"
                                name=""
                                id=""
                                placeholder="*******"
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                Confirm password <span>*</span>
                            </label>
                            <input
                                className={style.contactInput}
                                type="Password"
                                name=""
                                id=""
                                placeholder="*******"
                            />
                        </div>
                        <div className="col-md-12 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                Licience <span>*</span>
                            </label>
                            <input className={style.contactInput} type="file" name="" id="" />
                        </div>

                        <div className="col-md-12 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                City Of Residence <span>*</span>
                            </label>
                            <FormControl>
                                <Select labelId="demo-select-small-label" id="demo-select-small">
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="MUSCAT">MUSCAT</MenuItem>
                                    <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                    <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-12 d-flex flex-column mb-3">
                            <label className={`${style.label}`}>
                                Country of Resisdence <span>*</span>
                            </label>
                            <FormControl>
                                <Select labelId="demo-select-small-label" id="demo-select-small">
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Oman">Oman</MenuItem>
                                    <MenuItem value="Oman2">Oman 2</MenuItem>
                                    <MenuItem value="Oman3">Oman 3</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-6">
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
                                label="Accept Policy and usage terms"
                            />
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="d-flex justify-content-end align-items-center flex-wrap">
                                <div>
                                    <div
                                        className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                    >
                                        <p>I already have account?</p>
                                        <Link className="text-main" href={`/${locale}/login`}>
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.loginBtn}>
                            <button>
                                <span>submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterAsAgency;
