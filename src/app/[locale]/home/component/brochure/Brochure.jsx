import React from 'react';
import style from './brochure.module.css';

const Brochure = () => {
    return (
        <div className={style.brochure}>
            <div className="container">
                <div className="row">
                    <div className={`${style.brochureCaption} brochure`}>
                        <h4>Download Brochure</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                        <div className='d-flex justify-content-center'>
                        <button>Download</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src="/homepage/brochure/1.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brochure;
