import React,{Component} from "react";
import {View, Text, Button, StyleSheet,} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

// 공통 사용 컴포넌트 import
import InputComponent from "../components/InputComponent";

export default class Login extends Component{
    render(){
        return(
            <View style={style.root}>
                {/* 크게 2개 영역으로 구성 : 로그인 컨텐츠영역, 아래쪽의 앱이름 표시영역 */}
                {/* 1. 로그인 콘텐츠 영역 */}
                <View style={style.content}>
                    {/* 1.1 로고 글씨 */}
                    <Text style={style.logo}>Film</Text>

                    {/* 1.2 이메일과 비밀번호를 입력하는 입력박스 */}
                    {/* TextInput은 로그인, 회원가입, 비밀번호 재설정 화면에 모두 사용되므로 사용빈도가 아주 높음. 이를 일일이 스타일 하기 번거로우므로 별도의 CustomComponent로 제작하여 재사용*/}
                    <InputComponent secureTextEntry={false} placeholder='이메일' onChangeText={this.onchangeText}></InputComponent>
                    <InputComponent secureTextEntry={true} placeholder='비밀번호'></InputComponent>

                    {/* 1.3 비밀번호 재설정 : Text 컴포넌트는 onPress 동작함 */}
                    <Text style={style.resetPw} onPress={()=>this.props.navigation.navigate('ResetPw')}>비밀번호 재설정</Text>

                    {/* 1.4 로그인 버튼 */}
                    <View style={{width:'100%', marginBottom:32,}}>
                        <Button onPress={this.login} title="로그인" color='#3796ef'></Button>
                    </View>

                    {/* 1.5 회원가입 글씨 */}
                    <Text style={style.signup}>
                        계정이 없으신가요? <Text onPress={()=>this.props.navigation.navigate('SignUp')} style={style.signupLink}>가입하기</Text>
                    </Text>
                </View>
                {/* 2. footer 영역 */}
                <View style={style.footer}>
                    <Text style={style.footerCopyright}>MovieApp by Lux</Text>
                </View>
            </View>
        )
    }

    // '이메일'을 입력하는 InputComponent에 전달할 메소드
    onChangeText=(value)=>{     // TextInput의 글씨가 변경될때마다 파라미터로 글씨가 전달됨.
        this.email=value
    }

    // 입력된 이메일 글씨를 저장할 일반 멤버변수
    email = ''

    // 로그인 버튼 클릭시 
    login=()=>{
        // 다음 접속할 때 로그인을 또 요청하지 않도록 디바이스에
        // 로그인 정보를 저장해놓기 [android - SharedPreference와 비슷]
        // AsyncStorage -- library
        // 비동기처리이기에 저장이 완료되기 전에 아래 화면전환코드가 실행될 수도 있음.
        // 그렇기에 저장이 완료되는 것을 듣고 다음 코드로 화면 전환이 이루어지도록
        // 이때 사용하는 기법을 js에서는 promise 문법이라고 부름.
        // 이 promise를 위해 만들어진 메소드 : then() 메소드 - 작업 완료시 파라미터로 지정한 함수가 자동 실행됨.
        AsyncStorage.setItem('email',this.email).then(()=>{
            // alert('로그인 저장 완료')

            // 로그인 되었으니 앱의 메인화면인 MovieList 화면을 가진 drawNav로 이동
            // 전환할때 현재 Login 화면은 finish 하기 위해 .replace() 메소드로 전환
            this.props.navigation.replace('MainDrawerNav')
        })

        
    }

}

const style=StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#feffff'
    },
    content:{
        flex:1, // footer 영역을 제외한 모든 공간 사용
        justifyContent:'center',
        alignItems:'center',
        padding:32,
    },
    footer:{
        borderTopWidth:1,
        borderTopColor:'#d3d3d3',
        padding:8,
    },
    footerCopyright:{
        color:'#929292',
        textAlign:'center',   
    },
    logo:{
        color:'#292929',
        fontSize:40,
        fontWeight:'bold',
        marginBottom:32,
    },
    resetPw:{
        width:'100%',
        textAlign:'right',
        color:'#3796ef',
        marginTop:8,
        marginBottom:16,
        marginRight:8,
    },
    signup:{
        color:'#929292',
        textAlign:'center',
    },
    signupLink:{
        color:'#3796ef'
    }
})