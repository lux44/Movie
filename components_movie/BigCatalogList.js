import React,{Component} from "react";
import {View, Text, Image, Button,StyleSheet,FlatList,} from 'react-native'

// 아이템 1개의 모양 컴포넌트
import BigCatalog from "./BigCatalog";

export default class BigCatalogList extends Component{

    state={
        data:[],
    }

    render(){
        return(
            <View style={style.container}>
                <FlatList
                    horizontal={true}
                    pagingEnabled={true}
                    data={this.state.data}
                    renderItem={(obj)=>{   // 배열의 요소값(item), 인덱스 번호(index)를 가진 객체 1개로 파라미터로 전달됨
                        return <BigCatalog onPress={this.props.onPress} movie={obj.item}></BigCatalog>
                    }}>
                    
                </FlatList>
            </View>
        )
    }

    // 컴포넌트가 화면에 보여진 후 자동 발동하는 라이프사이클 메소드
    componentDidMount(){
        // 인기순의 api url을 통해 데이터 받아오기(네트워크 작업)
        // 네트워크 라이브러리 - fetch library 
        // JS에 fetch 라이브러리가 내장되어있음.
        // 네트워크는 비동기 작업이므로 결과를 받으려면 promise 문법 사용
        fetch(this.props.url)
        .then((response)=>response.json())      // 응답객체의 결과를 json 파싱하여 객체로 변환
        .then((json)=>{
            // alert(json.data.movies.length)
            this.setState({data:json.data.movies})
        })

        // .then((response)=> response.text() )     // 응답객체의 결과를 단순 string으로 변환 
        // .then((responseText)=>{
        //     alert(responseText)
        // })
    }
}

const style = StyleSheet.create({
    container:{height:300, marginBottom:8,}
})