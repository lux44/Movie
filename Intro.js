import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native'

// 로그인정보가 저장 되어 있는지 확인 후에 로그인 화면 or 메인 화면으로 이동하는 역할만 하는 컴포넌트
// 단순하게 함수형 컴포넌트로 제작

// 화면 전환 기능을 가진 Navigation 이라는 객체가 props로  전달되어 오지만
// 함수형 컴포넌트는 props라는 멤버 변수가 없기에 함수 파라미터로 전달되어 옴.
const Intro = (props)=>{

    // AsyncStorage에 저장되어 있는 로그인 정보 확인 : promise 문법
    AsyncStorage.getItem('email').then((value)=>{
        if(value==null || value==''){
            props.navigation.replace('LoginNav')
        } 
        else {
            props.navigation.replace('MainDrawerNav')
        }
    })

    return(
        <View style={style.root}>
            {/* 로그인 정보를 읽어오는 시간이 소요될 수 있기에 */}
            {/* 로딩 컴포넌트를 배치 */}
            <ActivityIndicator size='large' color='indigo'></ActivityIndicator>
        </View>
    )
}

const style=StyleSheet.create({
    root:{flex:1, justifyContent:'center', alignItems:'center',}
})

export default Intro