import React,{Component} from "react";
import {View, Text, Button, StyleSheet, Image, Alert} from 'react-native'

// 재사용 하는 컴포넌트 import
import TabComponent from "../components/TabComponent";
import InputComponent from "../components/InputComponent";

export default class ResetPw extends Component{

    state={
        tabs:['이메일','전화번호'],
        tabIndex:0,
        // 탭 선택에 따른 안내메세지
        messages:[
            '이메일을 입력하면 임시 비밀번호를 보내드립니다.',
            '전화번호를 입력하면 임시 비밀번호를 보내드립니다.',
        ],
    }

    // 탭번호 변경하는 기능 메소드 - 축약형 (), {} 모두 생략
    setTabIndex= index => this.setState({tabIndex:index})
    

    render(){
        return(
            <View style={style.root}>
                {/* 크게 2개 영역 */}
                {/* 1. 본문 영역 */}
                <View style={style.content}>
                    {/* 1.1 자물쇠 이미지 표시 영역 */}
                    <View style={style.lockImageContainer}>
                        <Image source={require('../Images/lock.png')}></Image>
                    </View>

                    {/* 1.2 타이틀 글씨 */}
                    <Text style={style.title}>로그인에 문제가 있나요?</Text>

                    {/* 1.3 안내메세지 */}
                    <Text style={style.message}>{this.state.messages[this.state.tabIndex]}</Text>

                    {/* 1.4 탭들 만들기 */}
                    <View style={{flexDirection:'row', marginBottom:16,}}>
                        {
                            this.state.tabs.map((value, index)=>{
                                return <TabComponent label={value} selected={this.state.tabIndex==index} onPress={()=>this.setTabIndex(index)}></TabComponent>
                            })
                        }
                    </View>

                    {/* 1.5 정보 입력 */}
                    <InputComponent placeholder={this.state.tabs[this.state.tabIndex]}></InputComponent>
                    
                    {/* 1.6 버튼 */}
                    <View style={{width:'100%',margin:16,}}>
                        <Button title='보내기' onPress={()=>{Alert.alert('임시 비밀번호가 발송되었습니다.', '로그인 후 정보수정을 통해 안전한 비밀번호로 변경해주시기 바랍니다.')}}></Button>
                    </View>
                </View>
                {/* 2. footer 영역 */}
                <View style={style.footer}>
                    <Text style={style.goBack} onPress={()=>this.props.navigation.goBack()}>로그인 화면으로 돌아가기</Text>
                </View>
            </View>
        )
    }
}

const style=StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#feffff'
    },
    content:{
        flex:1,
        width:'100%',
        alignItems:'center',
        padding:32,
    },
    footer:{
        borderTopColor:'#d3d3d3',
        borderTopWidth:1,
        padding:8,
    },
    goBack:{
        color:'#3796ef',
        textAlign:'center',
    },
    lockImageContainer:{
        padding:24,
        borderWidth:2,
        borderColor:'#292929',
        borderRadius:200,
        margin:16,
    },
    title:{
        fontSize:16,
        color:'#929292',
        marginBottom:16,
    },
    message:{
        textAlign:'center',
        marginBottom:16,
        color:'#292929',
    }
})