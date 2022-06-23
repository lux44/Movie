import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// 사용할 스크린 컴포넌트들 import
import Login from '../screens_login/Login'
import SignUp from '../screens_login/SignUp'
import ResetPw from '../screens_login/ResetPw'

// Stack Navigator 객체 생성
const Stack = createStackNavigator()

// 단순 Navigator 컴포넌트이기에 함수형 컴포넌트로 제작
const LoginNav =()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
            <Stack.Screen name="ResetPw" component={ResetPw}></Stack.Screen>
        </Stack.Navigator>   
    )
}

export default LoginNav