'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyAccountProfile from './MyAccountProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocale, useTranslations } from 'next-intl';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import MyBookings from './MyBookings';
import UserBookings from './UserBookings';
import { useGetuserDataMutation } from '../../../../store/User/UserDataSlice';
import Cookies from 'js-cookie';
import Loading from '../../../../components/Loading/Loading';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function MyAccountTabs() {
    const [value, setValue] = React.useState(0);
    const [userRole, setUserRole] = React.useState(null);
    const t = useTranslations('HomePage');
    const router = useRouter();
    const locale = useLocale();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [getUserData, { data, isLoading, error }] = useGetuserDataMutation();

    React.useEffect(() => {
        getUserData();
    }, [getUserData]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('role');
            setUserRole(role);
        }
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: t('Are you sure?'),
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#B18D61',
            confirmButtonText: t('Yes, log out'),
            cancelButtonText: t('Cancel'),
        }).then(result => {
            if (result.isConfirmed) {
                localStorage.clear();
                Cookies.remove('token');
                Cookies.remove('is_subscribed');
                router.push(`/${locale}/`);
            }
        });
    };

    React.useEffect(() => {
        if (userRole) {
            setValue(0);
        }
    }, [userRole]);

    if (userRole === null) {
        return <Loading />;
    }

    return (
        <div className="container-fluid mt-3 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        TabIndicatorProps={{
                            style: { backgroundColor: '#B18D61' },
                        }}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        {userRole !== 'user' && (
                            <Tab
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ mr: 1 }} />
                                        {t('My Details')}
                                    </Box>
                                }
                                {...a11yProps(0)}
                                sx={{
                                    color: value === 0 ? '#FFFFFF' : '#6D6D6D',
                                    backgroundColor: value === 0 ? '#B18D61' : 'transparent',
                                    fontWeight: value === 0 ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        color: '#B18D61',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    '&.Mui-selected': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#B18D61',
                                    },
                                }}
                            />
                        )}
                        {/* {userRole === 'tour_guide' && (
                            <Tab
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        <EmojiPeopleIcon sx={{ mr: 1 }} />
                                        {t('My Bookings')}
                                    </Box>
                                }
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 1 ? '#FFFFFF' : '#6D6D6D',
                                    backgroundColor: value === 1 ? '#B18D61' : 'transparent',
                                    fontWeight: value === 1 ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        color: '#B18D61',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    '&.Mui-selected': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#B18D61',
                                    },
                                }}
                            />
                        )} */}

                        {userRole === 'user' && (
                            <Tab
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ mr: 1 }} />
                                        {t('My Details')}
                                    </Box>
                                }
                                {...a11yProps(0)}
                                sx={{
                                    color: value === 0 ? '#FFFFFF' : '#6D6D6D',
                                    backgroundColor: value === 0 ? '#B18D61' : 'transparent',
                                    fontWeight: value === 0 ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        color: '#B18D61',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    '&.Mui-selected': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#B18D61',
                                    },
                                }}
                            />
                        )}

                        {userRole === 'user' && (
                            <Tab
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        <DirectionsCarIcon sx={{ mr: 1 }} />
                                        {t('My Bookings')}
                                    </Box>
                                }
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 1 ? '#FFFFFF' : '#6D6D6D',
                                    backgroundColor: value === 1 ? '#B18D61' : 'transparent',
                                    fontWeight: value === 1 ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        color: '#B18D61',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    '&.Mui-selected': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#B18D61',
                                    },
                                }}
                            />
                        )}

                        {/* {userRole === 'user' && (
                            <Tab
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        <DirectionsCarIcon sx={{ mr: 1 }} />
                                        {t('Private Car Booking')}
                                    </Box>
                                }
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 1 ? '#FFFFFF' : '#6D6D6D',
                                    backgroundColor: value === 1 ? '#B18D61' : 'transparent',
                                    fontWeight: value === 1 ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        color: '#B18D61',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    '&.Mui-selected': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#B18D61',
                                    },
                                }}
                            />
                        )} */}
                    </Tabs>

                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#fff',
                            color: '#B18D61',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        <ExitToAppIcon sx={{ mx: 1 }} />
                        {t('Log Out')}
                    </button>
                </div>
                <div className="col-md-9 mb-5">
                    {userRole !== 'user' && (
                        <TabPanel value={value} index={0}>
                            <MyAccountProfile data={data} error={error} isLoading={isLoading} />
                        </TabPanel>
                    )}
                    {/* {userRole === 'tour_guide' && (
                        <TabPanel value={value} index={1}>
                            <MyBookings />
                        </TabPanel>
                    )} */}
                    {userRole === 'user' && (
                        <TabPanel value={value} index={0}>
                            <MyAccountProfile data={data} error={error} isLoading={isLoading} />
                        </TabPanel>
                    )}
                    {userRole === 'user' && (
                        <TabPanel value={value} index={1}>
                            <UserBookings
                                getUserData={getUserData}
                                error={error}
                                isLoading={isLoading}
                                data={data}
                            />
                        </TabPanel>
                    )}
                    {/* {userRole === 'user' && (
                        <TabPanel value={value} index={1}>
                            <PrivateCarBooking />
                        </TabPanel>
                    )} */}
                </div>
            </div>
        </div>
    );
}
