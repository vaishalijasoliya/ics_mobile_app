import {StyleSheet, Dimensions, Platform} from 'react-native';
import theme from '../../config/theme'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles1 = StyleSheet.create({
    segmentContainer: {
        flexDirection:'row', 
        justifyContent:'center',
        marginTop: 20,
        marginBottom: 5,
    },
    buttonActive: {
        marginEnd: 8,
        backgroundColor: theme.BLUE_COLOR,
    },
    button: {
        marginEnd: 8,
        color: theme.GREY_COLOR,
        backgroundColor: theme.GREY_COLOR
    },
    text: {

    }
})