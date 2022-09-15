import React from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Jello from 'react-reveal/Jello';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';
import crawlImage from '../../../crawldata/crawlImage';
import ImageLayout from '../../../general/components/ImgaeLayout';
import CardDisplay from '../../../general/components/CardDisplay';

AdminImage.propTypes = {
    
};

function AdminImage(props) {
    return (
        <div className='AdminImage d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Kho ảnh'
                content={(
                    <div>
                        <Zoom left>
                            <ImageLayout>
                                {crawlImage.map((item, index) => {
                                    return <CardDisplay src={item.src} size={item.size} key={index} />
                                })}
                            </ImageLayout>
                        </Zoom>
                    </div>
                )}
            />
        </div>
    );
}

export default AdminImage;