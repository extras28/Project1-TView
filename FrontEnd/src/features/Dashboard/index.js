import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import BaseLayoutDashboard from '../../general/components/BaseLayout/BaseLayoutDashboard';
import CardDisplay from '../../general/components/CardDisplay';
import './style.scss';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import crawlImage from '../../crawldata/crawlImage';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllImage } from './dashboardSlice';
import { thunkGetImageDetail } from 'features/IgameDetailScreen/ImageSlice';
import { useNavigate } from 'react-router-dom';
import EmptyView from 'general/components/EmptyView';

Dashboard.propTypes = {
    
};





function Dashboard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const images = useSelector(state => state.image.images);

    useEffect(() => {
        dispatch(thunkGetAllImage());
    }, [])

    async function handleGetImageDetails(id){
        await dispatch(thunkGetImageDetail(id));
        navigate(`/pin/${id}`)
    }

    return (
        <BaseLayoutDashboard>
            {images.length === 0
            ? <EmptyView  />
            :<div  className='min-vh-100'>
                <Zoom left>
                    <ResponsiveMasonry
                    columnsCountBreakPoints={{576: 3, 768: 5, 992: 5, 1200: 7, 1400: 7}}
                    >
                    <Masonry>
                    {images.map((item, index) => {
                                return <CardDisplay  src={item.src} key={item._id} imgId={item._id} 
                                    onClick = {()=>handleGetImageDetails(item._id)}
                                />
                            })}
                    </Masonry>
                    </ResponsiveMasonry>
                </Zoom>
            </div>}
        </BaseLayoutDashboard>
    );
}

export default Dashboard;