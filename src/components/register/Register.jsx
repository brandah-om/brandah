import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import style from './register.module.css';
import { Merriweather } from 'next/font/google';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoginDialogAll from '../loginDialogAll/LoginDialog';
import RegisterAsGuide from '../registerAsGuide/RegisterAsGuide';
import RegisterAsAgencey from '../RegisterAsAgencey/RegisterAsAgencey';
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

const Register = ({ openRegister, handleClickOpenRegister, handleCloseRegister }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [openRegisterGuide, setOpenRegisterGuide] = React.useState(false);

    const handleClickOpenRegisterGuide = () => {
        setOpenRegisterGuide(true);
    };
    const handleCloseRegisterGuide = () => {
        setOpenRegisterGuide(false);
    };
    const [openRegisterAgencey, setOpenRegisterAgencey] = React.useState(false);

    const handleClickOpenRegisterAgencey = () => {
        setOpenRegisterAgencey(true);
    };
    const handleCloseRegisterAgencey = () => {
        setOpenRegisterAgencey(false);
    };
    return (
        <React.Fragment>
            <Button onClick={handleClickOpenRegister} className={style.navbarLink}>
                Register as Tourist
            </Button>
            <BootstrapDialog
                onClose={handleCloseRegister}
                aria-labelledby="customized-dialog-title"
                open={openRegister}
                fullWidth
                maxWidth="md"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseRegister}
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
                                        REgister as <span>Tourist</span>
                                    </p>
                                    <p className={style.stayHere}>Tour the World, Start Here!</p>
                                </div>
                                <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
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
                                    label="Accept Policy and usage terms"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <p className={style.OrRegister}>
                                        Or You can register as
                                        <RegisterAsGuide
                                            openRegisterGuide={openRegisterGuide}
                                            handleClickOpenRegisterGuide={
                                                handleClickOpenRegisterGuide
                                            }
                                            handleCloseRegisterGuide={handleCloseRegisterGuide}
                                        />
                                        or
                                        <RegisterAsAgencey
                                            openRegisterAgencey={openRegisterAgencey}
                                            handleClickOpenRegisterAgencey={
                                                handleClickOpenRegisterAgencey
                                            }
                                            handleCloseRegisterAgencey={handleCloseRegisterAgencey}
                                        />
                                    </p>
                                </div>
                                <div>
                                    <div
                                        className={`${style.haveAccount} d-flex justify-content-center align-items-center `}
                                    >
                                        <p>I already have account?</p>
                                        <LoginDialogAll
                                            open={open}
                                            handleClickOpen={handleClickOpen}
                                            handleClose={handleClose}
                                        />
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

export default Register;
