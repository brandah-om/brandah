import React from 'react';
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
import RegisterAsGuide from '@/components/registerAsGuide/RegisterAsGuide';
import RegisterAsAgencey from '@/components/RegisterAsAgencey/RegisterAsAgencey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TourIcon from '@mui/icons-material/Tour';
import PersonIcon from '@mui/icons-material/Person';
import style from '../MyAccount.module.css';


const MyAccountProfile = () => {
    const [openRegisterAgencey, setOpenRegisterAgencey] = React.useState(false);

    const handleClickOpenRegisterAgencey = () => {
        setOpenRegisterAgencey(true);
    };
    const handleCloseRegisterAgencey = () => {
        setOpenRegisterAgencey(false);
    };

    const [openRegisterGuide, setOpenRegisterGuide] = React.useState(false);

    const handleClickOpenRegisterGuide = () => {
        setOpenRegisterGuide(true);
    };
    const handleCloseRegisterGuide = () => {
        setOpenRegisterGuide(false);
    };

    const names = [
        { id: 1, name: 'English' },
        { id: 2, name: 'العربية' },
        { id: 3, name: 'Francais' },
    ];

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <div>
            <div className={`${style.dataInputs}`}>
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
                            placeholder="Enter the name as in your national ID"
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
                            National ID <span>*</span>
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
                            Languages <span>*</span>
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
                                <TextField {...params} placeholder="Select languages" />
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

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className={style.loginBtn}>
                            <button>
                                <span>submit</span>
                            </button>
                        </div>

                        <div className={style.OrRegister}>
                            Or You can register as
                            <RegisterAsGuide
                                openRegisterGuide={openRegisterGuide}
                                handleClickOpenRegisterGuide={handleClickOpenRegisterGuide}
                                handleCloseRegisterGuide={handleCloseRegisterGuide}
                            />
                            or
                            <RegisterAsAgencey
                                openRegisterAgencey={openRegisterAgencey}
                                handleClickOpenRegisterAgencey={handleClickOpenRegisterAgencey}
                                handleCloseRegisterAgencey={handleCloseRegisterAgencey}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountProfile;
