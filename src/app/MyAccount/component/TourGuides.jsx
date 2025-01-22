import React from 'react';
import style from '../MyAccount.module.css';

const TourGuides = () => {
    return (
        <>
            <div className="row mt-3">
                <div className="col-md-4 mb-3">
                    <div className="card p-3 py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <div className={style.letters}>Am</div>
                                <div>
                                    <p className={style.driverName}>Ahmed Mostafa</p>
                                    <p className={style.driverPhone}>+20(10)1010101010</p>
                                </div>
                            </div>
                            <div className={style.driverPrice}>25$</div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <p className={style.driverDate}>2024-12-30 14:45</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center mt-2">
                            <p className={style.destination}>destination ,Muscat , Oman</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <button className={style.callDriver}>Details</button>
                            <button className={style.editBooking}>cancel</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card p-3 py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <div className={style.letters}>Am</div>
                                <div>
                                    <p className={style.driverName}>Ahmed Mostafa</p>
                                    <p className={style.driverPhone}>+20(10)1010101010</p>
                                </div>
                            </div>
                            <div className={style.driverPrice}>25$</div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <p className={style.driverDate}>2024-12-30 14:45</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center mt-2">
                            <p className={style.destination}>destination ,Muscat , Oman</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <button className={style.callDriver}>Details</button>
                            <button className={style.editBooking}>cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourGuides;
