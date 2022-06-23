import React from "react";
import {createDrawerNavigator} from '@react-navigation/drawer'

import MovieStackNav from "./MovieStackNav";

// Drawer Navigator 객체 생성
const Drawer = createDrawerNavigator()

// 단순 Navigator 이기에 함수형 컴포넌트 제작
const MainDrawerNav = ()=>{
    return(
        <Drawer.Navigator screenOptions={{headerShown:false,}}>
            <Drawer.Screen name="MovieStackNav" component={MovieStackNav}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default MainDrawerNav 