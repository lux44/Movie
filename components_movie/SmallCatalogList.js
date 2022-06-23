import React,{Component} from "react";
import {View, Text, StyleSheet, FlatList,Image,TouchableOpacity} from 'react-native'

export default class SmallCatalogList extends Component{

    state={
        movies:[],
    }

    render(){
        return(
            <View style={style.container}>
                <Text style={style.title}>{this.props.title}</Text>
                <FlatList
                    horizontal={true}
                    data={this.state.movies}
                    renderItem={({item, index})=>{   // movies 배열의 요소값(item)과 인덱스 번호(index)를 가진 객체 1개가 전달됨. - [구조분해할당]으로 받기
                        return (
                            <TouchableOpacity 
                                onPress={()=>{this.props.onPress(item.id)}}
                                style={{paddingLeft:4, paddingRight:4}}
                                activeOpacity={0.9}>
                                <Image 
                                    source={{uri:item.large_cover_image}}
                                    style={{width:140,height:200,}}>
                                </Image>
                            </TouchableOpacity>
                        )
                    }}>

                </FlatList>
            </View>
        )
    }

    // 영화 정보 받아오는 기능 메소드
    loadData= ()=>{
        fetch(this.props.url)
        .then(res=>res.json())
        .then(json=>this.setState({movies:json.data.movies}))
        .catch(error=>alert(error))
        // .then(response=>response.text())
        // .then(text=>alert(text))
    }

    componentDidMount(){
        if(this.props.url) this.loadData()
    }
}

const style=StyleSheet.create({
    container:{
        marginTop:8,
        marginBottom:8,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        padding:8,
    }
})