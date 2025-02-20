import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from '@/components/Loading/Loading';

const UserBookings = ({ data, isLoading, error }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <div className="row">
                <Tabs
                    value={tabIndex}
                    onChange={(_, newValue) => setTabIndex(newValue)}
                    variant="fullWidth"
                    className="mb-3"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#B18D61',
                        },
                        '& .MuiTab-root': {
                            color: '#B18D61',
                            fontWeight: 'bold',
                        },
                        '& .Mui-selected': {
                            color: '#B18D61 !important',
                        },
                    }}
                >
                    <Tab label="Trip Bookings" />
                    <Tab label="Tour Guide Bookings" />
                </Tabs>
            </div>

            {isLoading ? (
                <Loading />
            ) : error ? (
                <p>{t('Error loading Data')}</p>
            ) : (
                <>
                    <div className="card p-3 shadow">
                        {tabIndex === 0 && (
                            <div className="row">
                                {data?.trip_bookings?.length ? (
                                    data.trip_bookings.map(booking => (
                                        <div className="col-md-6 mb-3" key={booking.id}>
                                            <Card sx={{ boxShadow: 3 }}>
                                                <CardContent>
                                                    {/* <Typography variant="h6">
                                                {booking.contact_name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                📧 {booking.contact_email}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                📞 {booking.contact_phone}
                                            </Typography> */}
                                                    <Typography variant="body1">
                                                        <strong className="text-main">
                                                            💰 Total Price:
                                                        </strong>{' '}
                                                        {booking.total_amount} $
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            ⏳ Status:
                                                        </strong>{' '}
                                                        {booking.status}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        <strong className="text-main">
                                                            🕒 Date:
                                                        </strong>{' '}
                                                        {new Date(
                                                            booking.created_at
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No Trip Bookings Found</p>
                                )}
                            </div>
                        )}

                        {tabIndex === 1 && (
                            <div className="row">
                                {data?.tour_guide_bookings?.length ? (
                                    data.tour_guide_bookings.map(guide => (
                                        <div className="col-md-6 mb-3" key={guide.id}>
                                            <Card className="shadow-md">
                                                <CardContent>
                                                    <Typography variant="text.secondary">
                                                        <strong className="text-main">
                                                            Tour Guide Name:
                                                        </strong>{' '}
                                                        {guide.tour_guide_name}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">From:</strong>{' '}
                                                        {guide.from_date}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">To:</strong>{' '}
                                                        {guide.to_date}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            Total Days:
                                                        </strong>{' '}
                                                        {guide.total_days}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            Price:
                                                        </strong>{' '}
                                                        ${guide.price}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        <strong className="text-main">
                                                            Total Amount:
                                                        </strong>{' '}
                                                        ${guide.total_amount}
                                                    </Typography>
                                                    <Typography
                                                        color={
                                                            guide.status === 'confirmed'
                                                                ? 'success.main'
                                                                : 'error.main'
                                                        }
                                                    >
                                                        Status: {guide.status}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No Tour Guide Bookings Found</p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default UserBookings;
