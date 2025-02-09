import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import style from './RegisterAsAgencey.module.css';
import { Merriweather } from 'next/font/google';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoginDialogAll from '../loginDialogAll/LoginDialog';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const RegisterAsAgencey = ({
    openRegisterAgencey,
    handleClickOpenRegisterAgencey,
    handleCloseRegisterAgencey,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const names = [
        { id: 1, name: 'English' },
        { id: 2, name: 'العربية' },
        { id: 3, name: 'Francais' },
    ];

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <React.Fragment>
            <Button onClick={handleClickOpenRegisterAgencey} className={style.navbarLink}>
                Agencey
            </Button>
            <BootstrapDialog
                onClose={handleCloseRegisterAgencey}
                aria-labelledby="customized-dialog-title"
                open={openRegisterAgencey}
                fullWidth
                maxWidth="md"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseRegisterAgencey}
                    sx={theme => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className={style.registerAs}>
                                        Register as <span>Agencey</span>
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

                            <div className="col-md-12 d-flex flex-column mb-3">
                                <label className={`${style.label}`}>
                                    Country of Resisdence <span>*</span>
                                </label>
                                <FormControl>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                    >
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
                                            <Link className="text-main" href="/login">
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
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default RegisterAsAgencey;
