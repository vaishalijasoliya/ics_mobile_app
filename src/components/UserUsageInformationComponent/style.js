import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    albumContainer : { marginHorizontal:5, backgroundColor:"#fff",height:110, justifyContent:'center'},
    verticalListComponentInner : {        
        marginHorizontal:18,
        paddingHorizontal : 10,
        paddingVertical : 8,
        marginTop:12, 
        backgroundColor:"#fff", 
        borderRadius : 10, 
        height: 95,
        justifyContent:'center',
        //height:(SCREEN_HEIGHT*12)/100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.29,
        shadowRadius: 2.65,
        elevation: 7
    },
    verticalListComponentRow : {flexDirection:"row"},
    verticalListComponentColumn : {flexDirection:"column",paddingHorizontal:10, flex:1, justifyContent:'center'},
    verticalListComponentColumn1 : {flexDirection:"column",paddingHorizontal:10, flex:1,justifyContent : "center"},
    verticalListComponentTitleOne : { fontWeight: "bold",color:"#000",fontSize:12,marginTop:3, textAlign : "left"},
    verticalListComponentTitle : { fontSize: 12,color:"#000",marginTop:3, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }
})