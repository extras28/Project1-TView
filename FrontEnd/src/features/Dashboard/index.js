import React from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import BaseLayoutDashboard from '../../general/components/BaseLayout/BaseLayoutDashboard';
import CardDisplay from '../../general/components/CardDisplay';
import './style.scss';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import crawlImage from '../../crawldata/crawlImage';

Dashboard.propTypes = {
    
};





function Dashboard(props) {
    return (
        <BaseLayoutDashboard>
            <div  className='min-vh-100'>
                <Zoom left>
                    <ResponsiveMasonry
                    columnsCountBreakPoints={{576: 3, 768: 5, 992: 5, 1200: 7, 1400: 7}}
                    >
                    <Masonry>
                    {crawlImage.map((item, index) => {
                                return <CardDisplay  src={item.src} key={index} imgId={item.id}/>
                            })}
                    </Masonry>
                    </ResponsiveMasonry>
                </Zoom>
            </div>
        </BaseLayoutDashboard>
    );
}

export default Dashboard;