import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BigCatalogList from "../components_movie/BigCatalogList";
import SmallCatalogList from "../components_movie/SmallCatalogList";

export default class MovieList extends Component{
    render(){

         //인기 영화 정보 불러오는 url [get방식]
        const bigUrl="https://yts.lt/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5";

        // 최신등록순 영화 정보 불러오는 url 
        const recentUrl="https://yts.lt/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=10";
        
        // 평점순 영화 정보 불러오는 url 
        const ratingUrl="https://yts.lt/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=10";
        
        // 다운로드순 영화 정보 불러오는 url 
        const downloadUrl="https://yts.lt/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10";

        return(
            <ScrollView style={style.root}>
                {/* 큰 이미지를 보여주는 곳에 정보를 가져오는 fetch 작업의 코드가  */}
                {/* 복잡할 수 있어서 별도의 컴포넌트를 만들어 작업을 분리 */}
                <BigCatalogList 
                    url={bigUrl}
                    onPress={(id)=>{this.props.navigation.navigate('MovieDetail',{id:id,})}}>
                </BigCatalogList>

                {/* 최신등록순, 평점순, 다운로드순 영화목록을 보여주는 작은 사이즈의 가로 스크롤 리스트 */}
                {/* 3종류의 리스트가 모두 같은 디자인을 가졌기에 별도의 컴포넌트를 만들어서 재사용 */}
                <SmallCatalogList 
                    // onPress={(id)=>{this.props.navigation.navigate('MovieDetail',{id:id})}}  //첫 번째 id는 식별자, 두 번째는 파라미터 id
                    onPress={(id)=>{this.props.navigation.navigate('MovieDetail',{id})}}      // 식별자와 파라미터 이름이 같으면 한 번만
                    title='최신등록순' 
                    url={recentUrl}>
                </SmallCatalogList>
                <SmallCatalogList 
                    onPress={(id)=>{this.props.navigation.navigate('MovieDetail',{id,})}} 
                    title='평점순' 
                    url={ratingUrl}>
                </SmallCatalogList>
                <SmallCatalogList 
                    onPress={id=>this.props.navigation.navigate('MovieDetail',{id,})} 
                    title='다운로드순' 
                    url={downloadUrl}>
                </SmallCatalogList>
            </ScrollView>
        )
    }

    // render() 실행 후 컴포넌트가 장착되면 자동으로 발동하는 라이프사이클 메소드
    componentDidMount(){
        // 제목줄에 [햄버거 메뉴 아이콘], [로그아웃] 메뉴 버튼 배치 및 타이틀 중앙정렬
        this.props.navigation.setOptions({
            headerTitleAlign:'center',
            headerLeft:()=>{
                return(
                    <TouchableOpacity onPress={()=>this.props.navigation.toggleDrawer()} style={{marginLeft:16,}}>
                        <Image source={require('../Images/ic_menu.png')}></Image>
                    </TouchableOpacity>
                )
            },
            headerRight:()=> (
                <TouchableOpacity 
                style={{flexDirection:'row', marginRight:16,}}
                onPress={async()=>{
                    // 로그아웃이므로 AsyncStorage에 저장된 로그인정보 email 제거
                    // AsyncStorage.removeItem('email')
                    // promise 문법의 .then() 메소드 호출 문법이 다소 
                    // 지저분해 보여서 좀 더 쉽게 하기 위해 
                    // ES7 에서 등장한 async-await 문법
                    await AsyncStorage.removeItem('email')

                    // 로그아웃되면 자동으로 인트로 화면으로 다시 바뀌도록 
                    this.props.navigation.replace('Intro')
                }}>
                    <Image source={require('../Images/Tabs/ic_profile.png')}></Image>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            )
        })
    }
}

const style= StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#feffff',
    },
})