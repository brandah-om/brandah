import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAccountProfile from './MyAccountProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PrivateCarBooking from './PrivateCarBooking';
import TourGuides from './TourGuides';

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
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
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

const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
        localStorage.clear();
        window.location.href = '/';
    }
};

export default function MyAccountTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#000000',
                            },
                        }}
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        textAlign: 'right',
                                        width: '100%',
                                    }}
                                >
                                    <AccountCircleIcon sx={{ mr: 1 }} />
                                    My Details
                                </Box>
                            }
                            {...a11yProps(0)}
                            sx={{
                                color: value === 0 ? '#FFFFFF' : '#999999',
                                backgroundColor: value === 0 ? '#B18D61' : 'transparent',
                                fontWeight: value === 0 ? 'bold' : 'normal',
                                '&:hover': {
                                    color: '#9F733C',
                                },
                                '&.Mui-selected': {
                                    color: '#FFFFFF',
                                    backgroundColor: '#B18D61',
                                },
                            }}
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        textAlign: 'right',
                                        width: '100%',
                                    }}
                                >
                                    <DirectionsCarIcon sx={{ mr: 1 }} />
                                    Private Car Booking
                                </Box>
                            }
                            {...a11yProps(1)}
                            sx={{
                                color: value === 1 ? '#FFFFFF' : '#999999',
                                backgroundColor: value === 1 ? '#B18D61' : 'transparent',
                                fontWeight: value === 1 ? 'bold' : 'normal',
                                '&:hover': {
                                    color: '#9F733C',
                                },
                                '&.Mui-selected': {
                                    color: '#FFFFFF',
                                    backgroundColor: '#B18D61',
                                },
                            }}
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        textAlign: 'right',
                                        width: '100%',
                                    }}
                                >
                                    <EmojiPeopleIcon sx={{ mr: 1 }} />
                                    Tour Guides
                                </Box>
                            }
                            {...a11yProps(1)}
                            sx={{
                                color: value === 2 ? '#FFFFFF' : '#999999',
                                backgroundColor: value === 2 ? '#B18D61' : 'transparent',
                                fontWeight: value === 2 ? 'bold' : 'normal',
                                '&:hover': {
                                    color: '#9F733C',
                                },
                                '&.Mui-selected': {
                                    color: '#FFFFFF',
                                    backgroundColor: '#B18D61',
                                },
                            }}
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        textAlign: 'right',
                                        width: '100%',
                                    }}
                                >
                                    <ExitToAppIcon sx={{ mr: 1 }} />
                                    Logout
                                </Box>
                            }
                            {...a11yProps(1)}
                            sx={{
                                color: value === 3 ? '#FFFFFF' : '#999999',
                                backgroundColor: value === 3 ? '#B18D61' : 'transparent',
                                fontWeight: value === 3 ? 'bold' : 'normal',
                                '&:hover': {
                                    color: '#9F733C',
                                },
                                '&.Mui-selected': {
                                    color: '#FFFFFF',
                                    backgroundColor: '#B18D61',
                                },
                            }}
                            onClick={handleLogout}
                        />
                    </Tabs>
                </div>
                <div className="col-md-9">
                    <TabPanel value={value} index={0}>
                        <MyAccountProfile />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PrivateCarBooking />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TourGuides />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Logout
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
