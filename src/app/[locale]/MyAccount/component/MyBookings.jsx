import React, { useEffect, useState } from 'react';
import style from '../MyAccount.module.css';
import { useFetchTourBookingsMutation } from '@/store/tourGuide/AllGuideBookingsSlice';
import { useCancelTourBookingsMutation } from '@/store/tourGuide/CancelBookSlice';
import Loading from '@/components/Loading/Loading';
import { useAcceptTourBookingsMutation } from '@/store/tourGuide/AcceptBookSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const MyBookings = () => {
    const [fetchTourBookings, { data, isLoading, error }] = useFetchTourBookingsMutation();
    const [cancelTourBooking, { isLoading: isCancelling }] = useCancelTourBookingsMutation();
    const [acceptTourBooking, { isLoading: isAccepting }] = useAcceptTourBookingsMutation();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleOpenDialog = booking => {
        setSelectedBooking(booking);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBooking(null);
    };

    useEffect(() => {
        fetchTourBookings({});
    }, []);

    const handleCancelBooking = async booking_id => {
        try {
            const response = await cancelTourBooking({ booking_id }).unwrap();
            console.log('Booking cancelled:', response);
            fetchTourBookings({});
        } catch (err) {
            console.error('Error cancelling booking:', err);
        }
    };

    const handleAcceptBooking = async booking_id => {
        try {
            const response = await acceptTourBooking({ booking_id }).unwrap();
            console.log('Booking Accepted:', response);
            fetchTourBookings({});
        } catch (err) {
            console.error('Error Acceptting booking:', err);
        }
    };

    return (
        <div className="row mt-3">
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p>Error loading Data</p>
            ) : (
                <>
                    {data?.data?.map(guide => {
                        const isPending = guide.status === 'pending';
                        const isConfirmed = guide.status === 'confirmed';
                        const isCancelled = guide.status === 'cancelled';

                        return (
                            <div className="col-md-6 mb-3" key={guide.id}>
                                <div className="card p-3 py-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={style.letters}>
                                                {guide.tour_guide_name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className={style.driverName}>
                                                    {guide.contact_name}
                                                </p>
                                                <p className={style.driverPhone}>{guide.phone}</p>
                                            </div>
                                        </div>
                                        <div className={style.driverPrice}>{guide.price}$</div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                                        <p className={style.driverDate}>
                                            {t('From')} {guide.from_date}
                                        </p>
                                        <p className={style.driverDate}>
                                            {t('To')} {guide.to_date}
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                                        <button
                                            className={style.editBooking}
                                            onClick={() => handleOpenDialog(guide)}
                                        >
                                            {t('Details')}
                                        </button>

                                        <button
                                            className={`${style.callDriver} ${
                                                isCancelled || isConfirmed
                                                    ? style.disabledButton
                                                    : ''
                                            }`}
                                            disabled={isCancelled || isConfirmed || isAccepting}
                                            onClick={() => handleAcceptBooking(guide.id)}
                                        >
                                            {/* {isConfirmed ? 'Confirmed' : 'Accept'} */}
                                            {isConfirmed
                                                ? t('Confirmed')
                                                : isAccepting
                                                ? t('Accepting')
                                                : t('Accept')}
                                        </button>

                                        <button
                                            className={`${style.editBooking} ${
                                                isConfirmed || isCancelled
                                                    ? style.disabledButton
                                                    : ''
                                            }`}
                                            disabled={isConfirmed || isCancelled || isCancelling}
                                            onClick={() => handleCancelBooking(guide.id)}
                                        >
                                            {isCancelled
                                                ? t('Cancelled')
                                                : isCancelling
                                                ? t('Cancelling')
                                                : t('Cancel')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle className="text-center text-main">{t("Booking Details")}</DialogTitle>
                <DialogContent>
                    {selectedBooking && (
                        <div className="p-3 border rounded bg-light">
                            {[
                                [
                                    'Contact Name',
                                    selectedBooking.contact_name,
                                    'Contact Phone',
                                    selectedBooking.phone,
                                ],
                                [
                                    'Email',
                                    selectedBooking.email,
                                    'Price',
                                    `${selectedBooking.price}$`,
                                ],
                                [
                                    'Total Amount',
                                    `${selectedBooking.total_amount}$`,
                                    'Total Days',
                                    selectedBooking.total_days,
                                ],
                                ['From', selectedBooking.from_date, 'To', selectedBooking.to_date],
                                ['Status', selectedBooking.status, '', ''],
                            ].map(([label1, value1, label2, value2], index, array) => (
                                <div
                                    key={index}
                                    className={`row py-2 ${
                                        index !== array.length - 1 ? 'border-bottom' : ''
                                    }`}
                                >
                                    <div className="col-12 col-md-6">
                                        <p className="mb-1">
                                            <strong>{label1}:</strong> {value1}
                                        </p>
                                    </div>
                                    {label2 && (
                                        <div className="col-12 col-md-6">
                                            <p className="mb-1">
                                                <strong>{label2}:</strong> {value2}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyBookings;
