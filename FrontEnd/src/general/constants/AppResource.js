import logoWithinText from '../../assets/images/logo2.png';
import logoWithoutText from '../../assets/images/logo1.png';
import defaultAvatar from '../../assets/images/img_default_avatar.jpg';
import imageEmptyView from 'assets/images/ic_empty-view.png'

// App resources: icons, images, fonts...
const AppResource = {
    // icons
    icons: {
    //   icLogoHeader: require("assets/icons/ic_logo_header.png"),
    icFlag: require("assets/icons/pen-field.png"),
    icBin: require("assets/icons/trash.png"),
    icTrash: require("assets/icons/ic_trash.png"),
  },
  
  // images
  images: {
    logoWithinText: logoWithinText,
    logoWithoutText: logoWithoutText,
    defaultAvatar: defaultAvatar,
    imageEmpty: imageEmptyView,
    },
  
    // colors
    colors: {
      mainBGColor: "#93CD54",
      featureColor: "#E92E4E",
    },
  };
  
  export default AppResource;