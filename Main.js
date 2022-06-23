import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {View, Text, Button} from 'react-native'
import MainDrawerNav from './navigators/MainDrawerNav'

// 최상위 Navigator에 의해 전환될 스크린(컴포넌트) or Navigator 사용을 위한 import
import Intro from "./Intro";
import LoginNav from "./navigators/LoginNav";

// 앱 전체 화면들을 전환할 수 있는 최상위 Stack Navigator 객체 생성
const RootStack = createStackNavigator()

// 단순하게 NavigationContainer만 있으면 되는 컴포넌트이므로 간단하게 함수형 컴포넌트로 제작
const Main =()=>{
    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown:false}}>
                <RootStack.Screen name="Intro" component={Intro}/>
                <RootStack.Screen name="LoginNav" component={LoginNav}></RootStack.Screen>
                <RootStack.Screen name="MainDrawerNav" component={MainDrawerNav}></RootStack.Screen>
                
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default Main