import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    albumContainer : {flex: 1, justifyContent: 'center'},
    divider: {
        height: SCREEN_HEIGHT*6/100,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#e6e6e6',
        alignItems:'center',
        paddingHorizontal:8,
        marginVertical: 5,
        elevation: 2,
        shadowOpacity: 0.29,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    dividerText: {
        fontSize: 17,
        fontWeight: '500',
        marginStart: 17
    },
    verticalListComponentInner : {        
        marginHorizontal:18,
        paddingHorizontal : 10,
        paddingVertical : 8,
        marginTop:5, 
        marginBottom: 5,
        backgroundColor:"#fff", 
        borderRadius : 10, 
        height:(SCREEN_HEIGHT*11)/100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.29,
        shadowRadius: 2.65,
        elevation: 7
    },
    verticalListComponentRow : {flexDirection:"row", width:(SCREEN_WIDTH*100)/100},
    verticalListComponentColumn : {flexDirection:"column",paddingHorizontal:10, width:(SCREEN_WIDTH*25)/100},
    verticalListComponentColumn1 : {flexDirection:"column",paddingHorizontal:10, width:(SCREEN_WIDTH*60)/100, justifyContent : "center"},
    verticalListComponentTitleOne : { fontWeight: "bold",color:"#000",fontSize:12,marginTop:3, textAlign : "left"},
    verticalListComponentTitle : { fontSize: 12,color:"#000",marginTop:3, textAlign : "left"},
    verticalListComponentTitleSuccess : { fontSize: 12,color:"green",marginTop:3, textAlign : "left"},
    verticalListComponentTitleDanger : { fontSize: 12,color:"red",marginTop:3, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }
})