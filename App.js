import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import SideBar from './src/components/sideBar';
import FormScreen from  './src/pages/formScreen';


const customComponent = (props) => (
  <SideBar style={{flex: 1, backgroundColor: 'white'}} {...props}>
      <DrawerItems {...props} />
  </SideBar>
);

const Drawer = DrawerNavigator(
  {
    FormScreen: {screen: FormScreen}
 },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: customComponent,
    drawerBackgroundColor: 'white',
    contentOptions: {
      activeBackgroundColor : '#3F51B5',
      inactiveBackgroundColor: 'white',
      activeTintColor: 'white',
      inactiveTintColor: '#3F51B5',
      labelStyle:{
        fontSize: 15
      }
    }
  }
);



export default Drawer;