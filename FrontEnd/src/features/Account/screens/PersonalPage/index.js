import React from 'react';
import PropTypes from 'prop-types';
import BaseLayoutDashboard from '../../../../general/components/BaseLayout/BaseLayoutDashboard';
import AppAvatar from '../../../../general/components/AppAvatar';
import AppButton from '../../../../general/components/AppButton';
import CardDisplay from '../../../../general/components/CardDisplay';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Zoom from 'react-reveal/Zoom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkGetOwnImages } from 'features/Account/AccountSlice';


PersonalPage.propTypes = {
    
};
const fakeData = [
    {
        id: '',
        name: '',
        category: '',
        size: 'small',
        src: 'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/305289184_1404488536706819_8291201142443144118_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=lzAdUZTRvIkAX8PGH7X&_nc_ht=scontent.fhan5-10.fna&oh=00_AT8vqcMY6U4I90oJH0UYRon2BPlUONxb3aduoGZGWQdK2A&oe=6320D313',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'medium',
        src: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/305966213_1404488546706818_2903502309557302371_n.jpg?stp=dst-jpg_p480x480&_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=MzeJ9rI8KngAX_FfD8T&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_BuKwUFNnzoti_hY4U4vzLZn0dveAyfLvkyo-kXJ0l3g&oe=63208EFD',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/305770795_1404488513373488_3635551656217409983_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=vDVSoNtP3FEAX-5t_FJ&_nc_ht=scontent.fhan5-11.fna&oh=00_AT_CnTlZ1tQBONPrkBKbyis9CI_b8KBcpoJkfSqTzWGJZw&oe=6320A7A2',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'small',
        src: 'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/305226920_3298066927108003_5527902937260126210_n.png?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=pbIjj6XflV0AX_uVJFK&_nc_ht=scontent.fhan5-9.fna&oh=00_AT_m09HJVE3pRXXysQSW3KUVZR0YCzEV8c1chS4HVMI7NQ&oe=631F4633',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'medium',
        src: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/301778931_6521344427911422_2088130360182820410_n.png?_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=R3shbbX1WCAAX9Vvtsn&_nc_ht=scontent.fhan5-11.fna&oh=00_AT_fb7Mff3kQHxhYCx3gkxzw_jjKOJNBAY6BDp8wiOegDg&oe=6320DD0B',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'small',
        src: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/273791730_4573854582744009_5683537778939732561_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0debeb&_nc_ohc=3BHj8sQtlyMAX_Dl-PO&_nc_oc=AQnC458LegPpw7-UkKqaSf6TrqWkj3lb7blxERRziaVBFTf8raakXJzREH7zu9Z-11g&_nc_ht=scontent.fhan5-8.fna&oh=00_AT80DuI9UBiRl7NjZ0FVdC75h5h8IrCh2xPOlAAK0ygtqA&oe=631F9CDD',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/305746591_2220779338079103_77894868845759906_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=EnFX-TFK3_cAX9lv3jG&_nc_ht=scontent.fhan5-8.fna&oh=00_AT9C2gsI1FLkZ4z1tfhtftmbXCvo3w9rkFGulcZQ-_QgnQ&oe=631F8C4F',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'medium',
        src: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/304982757_499703071974079_3515634089818262288_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=UiklbcIy7NYAX_CGWgn&_nc_ht=scontent.fhan5-11.fna&oh=00_AT8-YADejOrGjj-hC20UolYeRXDL4AhTM4yHZMV11KCEyA&oe=63203B99',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/304869629_612610833780455_5990617132798273155_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=7NiGzdfNBNEAX9y4IBh&_nc_ht=scontent.fhan5-3.fna&oh=00_AT9AaHXUzAIqaJbPzR0AGl6t4C80JPMpjVH7SLvcQZi7dQ&oe=6320A81C',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/305577241_3477470962484294_3654741431830901845_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Nw9SJb9PJQUAX9uysdM&_nc_ht=scontent.fhan5-2.fna&oh=00_AT8WncFDYervVBrSiREbynPicrJbjZw676fS5S4QXlTWgg&oe=6320D6B4',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'medium',
        src: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/304848740_214237280935751_2989408391222184124_n.png?stp=dst-png_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=VbeuniyWyeQAX9b0xcS&_nc_ht=scontent.fhan5-11.fna&oh=00_AT9QM6dEmJ2jydkmk_XJ30joRfnXe5d3AcdxFmfMOPChKQ&oe=631EFD50',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/304231700_1510664786072536_855097358402694734_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=jKbNnxBSBcoAX_advar&_nc_ht=scontent.fhan5-10.fna&oh=00_AT_VxBkZ25eZNpKUH010BlMYl6M2IXMEdkHwM5spqk_hvA&oe=631F640C',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'small',
        src: 'https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/305035966_5616146308505514_1390209355030505587_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=1K2_QnXDBCoAX8sG5e2&tn=x9_hkC0FKZrBPJAp&_nc_ht=scontent.fhan5-11.fna&oh=00_AT_B3ET1hyjLgA00hIn9r3M0vUzmq8mscaF6IaQcqtZOmA&oe=631F158C',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'medium',
        src: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/302536580_6022420174438071_4464766922912537995_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=2iUjC1AxFbYAX9vYqIL&_nc_ht=scontent.fhan5-8.fna&oh=00_AT-vM14XtJc3iebJeihK42HIiyAp503Zr5f9sxvxRWfrxg&oe=63205570',
    },
    {
        id: '',
        name: '',
        category: '',
        size: 'large',
        src: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/296570718_1417174002080178_3707076437621221609_n.jpg?stp=cp1_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=0debeb&_nc_ohc=GMjmOXMklAwAX9LrW3O&_nc_oc=AQlCyo42RjcQBCXEQGjCp1qYWFIfS0QDqcsb93swCSFRNy6U2KzuLqBx6iNRPFklHkg&_nc_ht=scontent.fhan5-2.fna&oh=00_AT8GH4P0H5FwAwW2B_xZiywrsPSB6ykXxOoUcoLgxY0K8Q&oe=631F2108',
    },
]

function PersonalPage(props) {

    const currentAccount = useSelector(state => state.auth.currentAccount);
    const myImages = useSelector(state => state.account.myImages);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = currentAccount?.id


    useEffect(()=>{
            dispatch(thunkGetOwnImages());
    },[])

    return (
        <BaseLayoutDashboard>
            <div className='PersonalPage d-flex flex-column bg-white'>

                <div className='d-flex flex-column align-items-center pt-5'>
                    <AppAvatar 
                        src={currentAccount?.avatar}
                        size='120px'
                    />
                    <span style={{fontSize: '36px', fontWeight: '600'}}>{currentAccount?.username}</span>
                    <AppButton 
                        style = {
                            {
                                border: '1px solid #2E8FE9',
                                backgroundColor: '#FFFFFF',
                                color: '#2E8FE9'
                            }
                        }
                        className = 'btn-grey my-5'
                        text = 'Thông tin cá nhân'
                        onClick={()=>navigate('/account/profile')}
                    />
                </div>

                <span className='PersonalPage_Profile py-5 text-center sticky-top bg-white' style={{fontSize: '20px', fontWeight: '600', height: '80px'}}>Tất cả ảnh</span>

                <div className='d-flex flex-column align-items-center mt-5'>
                    <div  className='min-vh-100 w-100'>
                        <Zoom left>
                            <ResponsiveMasonry
                            columnsCountBreakPoints={{576: 3, 768: 5, 992: 5, 1200: 7, 1400: 7}}
                            >
                                <Masonry>
                                {myImages.map((item, index) => {
                                            return <CardDisplay  src={item.src} key={item._id}/>
                                        })}
                                </Masonry>
                            </ResponsiveMasonry>
                        </Zoom>
                    </div>
                </div>
            </div>
        </BaseLayoutDashboard>
    );
}

export default PersonalPage;