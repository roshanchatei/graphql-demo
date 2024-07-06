/* eslint-disable arrow-body-style */
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

const Home = () => <div>0</div>;
const Login = () => <div>1</div>;
const OTP = () => <div>2</div>;
const Address = () => <div>3</div>;
const AddAddress = () => <div>4</div>;
const EditAddress = () => <div>5</div>;

const Navigation = (props) => {
    const [current, setCurrent] = useState(0)

    const navigate = useNavigate();
    const location = useLocation();


    const handleBack = () => {
        navigate(-1);
    };

    const handleNext = () => {
        navigate(`/${Number(location.pathname.split("/")[1]) + 1}`);
    };


    useEffect(() => {
        console.log('navigate')
        const handleBackButton = (event) => {
            console.log('Back button was clicked');

            window.postMessage({ type: 'BACK_NAVIGATION_OCCURRED' }, '*');
        };

        window.addEventListener('popstate', handleBackButton);
        window.history.pushState(null, document.title, window.location.href);


        const handleMessage = (event) => {
            if (event.data.type === 'BACK_NAVIGATION_OCCURRED') {
                navigate(-1);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

  return (
    <>
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/1" element={<Login />} />
                <Route path="/2" element={<OTP />} />
                <Route path="/3" element={<Address />} />
                <Route path="/4" element={<AddAddress />} />
                <Route path="/5" element={<EditAddress />} />
            </Routes>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
        </>
    </>
    

  );
};

export default Navigation;
