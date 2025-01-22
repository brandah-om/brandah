import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import style from './loginDialog.module.css';
import { Merriweather } from 'next/font/google';
import Link from 'next/link';

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

const LoginDialogAll = ({ open, handleClickOpen, handleClose }) => {
    return (
        <React.Fragment>
            <button onClick={handleClickOpen} className={style.navbarLink}>
            Sign In
            </button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                            <div className="d-flex justify-content-center">
                                <img className={style.logoImg} src="/navbar-logo.png" alt="" />
                            </div>
                            <div className="col-md-12 d-flex flex-column">
                                <label className={`${style.label}`}>
                                    Email <span style={{ color: '#C64E4E;' }}>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="col-md-12 d-flex flex-column mt-3">
                                <label className={`${style.label}`}>
                                    Password <span style={{ color: '#C64E4E;' }}>*</span>
                                </label>
                                <input
                                    className={style.contactInput}
                                    type="Password"
                                    name=""
                                    id=""
                                    placeholder="*******"
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <p className={`${style.notHaveAccount} mt-4`}>
                                        Don’t have account?
                                        <Link href="/">sign up</Link>
                                    </p>
                                </div>
                                <div>
                                    <Link href="/" className={style.forgetPass}>
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className={style.loginBtn}>
                                <button>
                                    <span>Sign In</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default LoginDialogAll;
