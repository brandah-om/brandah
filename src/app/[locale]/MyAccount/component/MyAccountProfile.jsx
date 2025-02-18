'use client';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import style from '../MyAccount.module.css';
import { useTranslations } from 'next-intl';

const MyAccountProfile = () => {
    const t = useTranslations('HomePage');
    const names = [
        { id: 1, name: 'English' },
        { id: 2, name: 'العربية' },
        { id: 3, name: 'Francais' },
    ];

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const storedUserData = {
            firstName: localStorage.getItem('firstName') || '',
            lastName: localStorage.getItem('lastName') || '',
            email: localStorage.getItem('email') || '',
            phone: localStorage.getItem('phone') || '',
        };
        setUserData(storedUserData);
    }, []);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <div>
            <div className={`${style.dataInputs}`}>
                <div className="row">
                    <div className="col-md-6 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('First Name')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="text"
                            value={userData.firstName}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Last Name')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="text"
                            value={userData.lastName}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Email')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="email"
                            value={userData.email}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Phone Number')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="text"
                            value={userData.phone}
                            readOnly
                        />
                    </div>

                    {/* <div className="col-md-6 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Password')} <span>*</span>
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
                            {t('Confirm password')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="Password"
                            name=""
                            id=""
                            placeholder="*******"
                        />
                    </div> */}
                    <div className="col-md-12 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('National ID')} <span>*</span>
                        </label>
                        <input
                            className={style.contactInput}
                            type="file"
                            name=""
                            id=""
                            // placeholder="Enter your national ID here"
                        />
                    </div>

                    <div className="col-md-12 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Languages')} <span>*</span>
                        </label>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={names}
                            disableCloseOnSelect
                            getOptionLabel={option => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderInput={params => (
                                <TextField {...params} placeholder={t('Select languages')} />
                            )}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => (
                                    <Chip
                                        key={option.id}
                                        label={option.name}
                                        {...getTagProps({ index })}
                                        deleteIcon={<CloseIcon style={{ color: '#FFFFFF' }} />}
                                        sx={{
                                            backgroundColor: '#B18D61',
                                            color: '#FFFFFF',
                                        }}
                                    />
                                ))
                            }
                        />
                    </div>

                    <div className="col-md-12 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('City Of Residence')} <span>*</span>
                        </label>
                        <FormControl>
                            <Select labelId="demo-select-small-label" id="demo-select-small">
                                <MenuItem value="">
                                    <em>{t('None')}</em>
                                </MenuItem>
                                <MenuItem value="MUSCAT">MUSCAT</MenuItem>
                                <MenuItem value="MUSCAT2">MUSCAT 2</MenuItem>
                                <MenuItem value="MUSCAT3">MUSCAT 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-md-12 d-flex flex-column mb-3">
                        <label className={`${style.label}`}>
                            {t('Country of Resisdence')} <span>*</span>
                        </label>
                        <FormControl>
                            <Select labelId="demo-select-small-label" id="demo-select-small">
                                <MenuItem value="">
                                    <em>{t('None')}</em>
                                </MenuItem>
                                <MenuItem value="Oman">Oman</MenuItem>
                                <MenuItem value="Oman2">Oman 2</MenuItem>
                                <MenuItem value="Oman3">Oman 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* 
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className={style.loginBtn}>
                            <button>
                                <span>{t('submit')}</span>
                            </button>
                        </div>

                        <div className={style.OrRegister}>
                            {t('Or You can')}
                            <RegisterAsGuide
                                openRegisterGuide={openRegisterGuide}
                                handleClickOpenRegisterGuide={handleClickOpenRegisterGuide}
                                handleCloseRegisterGuide={handleCloseRegisterGuide}
                            />
                            {t('or')}
                            <RegisterAsAgency
                                openRegisterAgency={openRegisterAgency}
                                handleClickOpenRegisterAgency={handleClickOpenRegisterAgency}
                                handleCloseRegisterAgency={handleCloseRegisterAgency}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MyAccountProfile;
