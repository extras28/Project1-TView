import React from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Jello from 'react-reveal/Jello';
import AdminSideBar from '../../components/AdminSideBar';
import AdminPageContent from '../../components/AdminPageContent';
import crawlImage from '../../../crawldata/crawlImage';
import ImageLayout from '../../../general/components/ImgaeLayout';
import CardDisplay from '../../../general/components/CardDisplay';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllImage } from 'features/Dashboard/dashboardSlice';
import AppLoader from 'general/components/AppLoader';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useNavigate } from 'react-router-dom';
import { thunkGetImageDetail } from 'features/IgameDetailScreen/ImageSlice';

AdminImage.propTypes = {
    
};

function AdminImage(props) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(thunkGetAllImage())
    },[])
    const navigate = useNavigate();
    const images = useSelector(state => state?.image?.images);
    const loading = useSelector(state => state?.image?.isGettingImage);

    return (
        <div className='AdminImage d-flex flex-row bg-light'>
            <AdminSideBar />
            <AdminPageContent 
                title='Kho ảnh'
                content={(
                    loading
                    ?<AppLoader 
                        
                    />
                    :<div>
                        <Zoom left>
                            <ResponsiveMasonry
                            columnsCountBreakPoints={{576: 3, 768: 5, 992: 5, 1200: 7, 1400: 7}}
                            >
                            <Masonry>
                            {images.map((item, index) => {
                                        return <CardDisplay owner={true}  src={item.src} key={item._id} imgId={item._id} 
                                            // onClick = {()=>handleGetImageDetails(item._id)}
                                        />
                                    })}
                            </Masonry>
                            </ResponsiveMasonry>
                        </Zoom>
                    </div>
                )}
            />
        </div>
    );
}

export default AdminImage;