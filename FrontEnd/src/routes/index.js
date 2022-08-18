import HomeScreen from '../pages/Home';
import PinImageScreen from '../pages/PinImageScreen';
import UploadScreen from '../pages/UploadScreen';
import AccountScreen from '../pages/AccountScreen'


// public routes
const publicRoutes = [
    {path: '/', component: HomeScreen},
    {path: '/pin', component: PinImageScreen},
    {path: '/upload', component: UploadScreen},
    {path: '/account', component: AccountScreen},
];

// private routes
const privateRoutes = [

];

export {publicRoutes, privateRoutes};
