import { useEffect, useState } from 'react';
import GoogleSlides from './GoogleSlides';
import axios from 'axios';

function CompanySlide() {
    const [slideLink, setSlideLink] = useState('https://docs.google.com/presentation/d/e/2PACX-1vSB9lELIg7-K2TZxLSm9t6y-QfCcoiHKddf4SCxqUgWWcDVRhhjLg-l_3__INLaZt2l_u2cs6i7BtAm/embed?start=true&loop=true&delayms=3000');

    useEffect(() => {
        const fetchSlideLink = async () => {
            try {
                const response: any = await axios.get('http://localhost:3000/api/v1/getslidelink');
                // setSlideLink(response.data.slideUrl);
                const link = response.data.data[0]?.slidelink;
                console.log("response data is ", response.data.data[0]?.slidelink);
                if (link) {
                    setSlideLink(link);
                    console.log(slideLink);
                }
            } catch (error) {
                console.error('Error fetching slide link:', error);
            }
        };

        fetchSlideLink();
    }, []);

    return (
        <>
            <GoogleSlides src={"https://docs.google.com/presentation/d/e/2PACX-1vSB9lELIg7-K2TZxLSm9t6y-QfCcoiHKddf4SCxqUgWWcDVRhhjLg-l_3__INLaZt2l_u2cs6i7BtAm/embed?start=true&loop=true&delayms=3000"} />
        </>
    );
}

export default CompanySlide;
