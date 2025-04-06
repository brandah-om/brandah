import NavBar from '../../components/navBar/NavBar';
import Link from 'next/link';
import Image from 'next/image';
import notFound from '../../../public/404.jpg';

const NotFound = () => {
    return (
        <div>
            <NavBar />
            <div className="main-height">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="fw-bold not-found-title">page Not Found</h1>
                            <Image className="mt-4 mb-4 img-fluid" src={notFound} alt="404" />
                            <div className="d-flex justify-content-center align-items-center">
                                <Link href="/" className="btn btn-main">
                                    <i className="fa fa-home mr-2 pt-1"></i>
                                    back home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
