import React from 'react';
import style from '../MyAccount.module.css';

const PrivateCarBooking = () => {
    return (
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
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className={style.driverAgency}>Agency</p>
                        <p className={style.driverDate}>2024-12-30 14:45</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                        <div className={style.verticalLineContainer}>
                            <div className={`${style.circle} ${style.topCircle}`}></div>
                            <div className={style.line}></div>
                            <div className={`${style.circle} ${style.bottomCircle}`}></div>
                        </div>
                        <div className={style.transportationLocation}>
                            <p>from location ,Muscat , Oman</p>
                            <h6>to location , Muscat, Oman</h6>
                        </div>
                    </div>
                    <div>
                        <button className={style.callDriver}>Call Driver</button>
                        <button className={style.editBooking}>Edit Booking</button>
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
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className={style.driverAgency}>Agency</p>
                        <p className={style.driverDate}>2024-12-30 14:45</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                        <div className={style.verticalLineContainer}>
                            <div className={`${style.circle} ${style.topCircle}`}></div>
                            <div className={style.line}></div>
                            <div className={`${style.circle} ${style.bottomCircle}`}></div>
                        </div>
                        <div className={style.transportationLocation}>
                            <p>from location ,Muscat , Oman</p>
                            <h6>to location , Muscat, Oman</h6>
                        </div>
                    </div>
                    <div>
                        <button className={style.callDriver}>Call Driver</button>
                        <button className={style.editBooking}>Edit Booking</button>
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
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className={style.driverAgency}>Agency</p>
                        <p className={style.driverDate}>2024-12-30 14:45</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                        <div className={style.verticalLineContainer}>
                            <div className={`${style.circle} ${style.topCircle}`}></div>
                            <div className={style.line}></div>
                            <div className={`${style.circle} ${style.bottomCircle}`}></div>
                        </div>
                        <div className={style.transportationLocation}>
                            <p>from location ,Muscat , Oman</p>
                            <h6>to location , Muscat, Oman</h6>
                        </div>
                    </div>
                    <div>
                        <button className={style.callDriver}>Call Driver</button>
                        <button className={style.editBooking}>Edit Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateCarBooking;
