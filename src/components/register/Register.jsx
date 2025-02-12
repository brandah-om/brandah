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
import { useRegisterTouristMutation } from '@/store/register/RegisterTouristApiSlice';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
    const router = useRouter();
    const t = useTranslations('HomePage');

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
    const [openRegisterAgency, setOpenRegisterAgency] = React.useState(false);

    const handleClickOpenRegisterAgency = () => {
        setOpenRegisterAgency(true);
    };
    const handleCloseRegisterAgency = () => {
        setOpenRegisterAgency(false);
    };

    const [registerTourist, { isLoading, error }] = useRegisterTouristMutation();

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        national_id: '',
        password: '',
        password_confirmation: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = React.useState(null);

    const handleChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && files.length > 0) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            toast.error('Passwords do not match!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }

        const data = new FormData();

        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const result = await registerTourist(data).unwrap();
            console.log('User Registered:', result);

            toast.success(result?.message || 'Registration Successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                style: {
                    backgroundColor: '#B18D61',
                    color: 'white',
                },
            });
            handleCloseRegister();

            setTimeout(() => {
                router.push('/otp');
            }, 3000);
        } catch (err) {
            console.error('Registration Failed:', err);

            toast.error(err?.data?.message || 'Registration failed', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                style: {
                    backgroundColor: '#C64E4E',
                    color: 'white',
                },
            });
        }
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpenRegister} className={style.navbarLink}>
                {t('Register as Tourist')}
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
                                        Register as <span>Tourist</span>
                                    </p>
                                    <p className={style.stayHere}>Tour the World, Start Here!</p>
                                </div>
                                <img className={style.logoImg} src="/navbar-logo.png" alt="logo" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        First Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="first_name"
                                        placeholder="Enter the name as in your national ID"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        // required
                                    />
                                </div>
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Last Name <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        // required
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        // required
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
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        // required
                                        placeholder="Enter your preferred contact number"
                                    />
                                </div>
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        national id <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="text"
                                        name="national_id"
                                        value={formData.national_id}
                                        onChange={handleChange}
                                        // required
                                        placeholder="Enter your national Number"
                                    />
                                </div>
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Photo <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        // required
                                    />

                                    {previewImage && (
                                        <img src={previewImage} alt="Preview" width="100" />
                                    )}
                                </div>
                                <div className="col-md-6 d-flex flex-column mb-3">
                                    <label className={`${style.label}`}>
                                        Password <span>*</span>
                                    </label>
                                    <input
                                        className={style.contactInput}
                                        type="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        // required
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
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        // required
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
                                        <div className={style.OrRegister}>
                                            Or You can register as
                                            <Link
                                                className="text-main mx-1"
                                                href="/RegisterTourGuide"
                                            >
                                                Tour Guide
                                            </Link>
                                            or
                                            <Link className="text-main mx-1" href="/">
                                                Agency
                                            </Link>
                                        </div>
                                    </div>
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

                                <div className={style.loginBtn}>
                                    <button type="submit" disabled={isLoading}>
                                        <span>{isLoading ? 'Submitting...' : 'Submit'}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default Register;
