import React, { useEffect, useState } from 'react';
import GoogleSlides from './GoogleSlides';
import axios, { AxiosResponse } from 'axios';

function CompanySlide() {
    const [slideLink, setSlideLink] = useState('');

    useEffect(() => {
        const fetchSlideLink = async () => {
            try {
                const response: AxiosResponse<any> = await axios.get('http://localhost:3000/api/v1/getslidelink');
                // setSlideLink(response.data.slideUrl);
                console.log(response);
            } catch (error) {
                console.error('Error fetching slide link:', error);
            }
        };

        // fetchSlideLink();
    }, []);

    return <GoogleSlides src={slideLink} />;
}

export default CompanySlide;
