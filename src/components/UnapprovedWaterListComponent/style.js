import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({    
    albumContainer : { marginHorizontal:5, backgroundColor:"#fff",height:110},
    verticalListComponentInner : {
        marginHorizontal:18,
        paddingHorizontal : 10,
        paddingVertical : 8,
        marginTop:10, 
        backgroundColor:"#fff", 
        borderRadius : 10, 
        height:90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    verticalListComponentRow : {flexDirection:"row"},
    verticalListComponentColumn : {flex:1.2},
    verticalListComponentColumn1 : {flex:2},
    verticalListComponentColumn2 : {flex:0.7},
    verticalListComponentTitle : { fontSize: 14, fontWeight:"bold",color:"#000",marginTop:5, textAlign : "left"},
    verticalListComponentTitleOne : { fontSize: 14, fontWeight:"600",color:"#000",marginTop:5, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 },
    statusContainer : {flexDirection:'row', padding:10}

});