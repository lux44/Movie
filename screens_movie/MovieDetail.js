import React, {Component} from "react";
import {View, Text, StyleSheet, ActivityIndicator,ScrollView} from 'react-native'
import BigCatalog from "../components_movie/BigCatalog";

export default class MovieDetail extends Component{

    state={
        movie:null,
    }

    render(){
        return this.state.movie? 
        (
            <ScrollView style={style.root}>
                <BigCatalog movie={this.state.movie} onPress={()=>{}}></BigCatalog>

                {/* 영화 정보 출력 영역 */}
                <View>
                    <Text style={style.title}>영화 정보</Text>
                    <View style={style.infoContainer}>
                        <Text>{this.state.movie.runtime}분</Text>
                        <Text>평점 : {this.state.movie.rating}</Text>
                        <Text>좋아요 : {this.state.movie.like_count}</Text>
                    </View>
                </View>

                {/* 줄거리 출력 영역 */}
                <View>
                    <Text style={style.title}>줄거리</Text>
                    <Text style={style.desc}>{this.state.movie.description_full}</Text>
                </View>

                {/* 배우 캐스팅 정보 별도 컴포넌트 제작 과제 - CastingList.js */}
                {/* 스크린샷 이미지들 별도 컴포넌트 제작 과제 - ScreenShotList.js */}
            </ScrollView>
        ) 
        : 
        (
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <ActivityIndicator size='large' color='blue'></ActivityIndicator>
            </View>
        )
    }

    // 전달받은 id로 영화 상세정보를 feych 하는 기능 메소드
    loadData=()=>{
        // navigation에 의해 스크린이 전환될때 전달되어온 데이터(객체)를 받기   this.props.route.params
        const id=this.props.route.params.id
        fetch('https://yts.lt/api/v2/movie_details.json?movie_id='+id+'&with_image=true&with_cast=true')
        .then(res=>res.json())
        .then(json=>this.setState({movie:json.data.movie}))
        .catch(e=>alert(e))
        // .then(res=>res.text())
        // .then(text=>alert(text))
    }

    componentDidMount(){
        this.loadData()
    }
}

const style= StyleSheet.create({
    root:{
        flex:1,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        paddingTop:24,
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:8,
    },
    infoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:16,
        paddingRight:16,
    },
    desc:{
        paddingLeft:16,
        paddingRight:16,
    }
})