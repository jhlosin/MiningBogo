// Imports
import { COLOR } from 'react-native-material-ui';

const mainColor = 'blueGrey'

//--------- NATIVE-BASE THEME
// header
export const toolbarBtnColor = COLOR[mainColor + '900']
export const toolbarDefaultBg = COLOR[mainColor + '900']

// color
export const brandPrimary = COLOR[mainColor + '500']
export const brandDark = COLOR[mainColor + '900']
export const brandLight = COLOR[mainColor + '200']

// container
export const containerBgColor = COLOR[mainColor + '100']

// card
export const cardDefaultBg = COLOR[mainColor + '800']
export const cardBorderColor = COLOR[mainColor + '700']

// text
export const textColor =  COLOR[mainColor + '50']


//--------- APP THEME
// header
export const headerBg = COLOR[mainColor + '900']
export const headerTitleColor = COLOR[mainColor + '50']
export const headerIconsColor = COLOR[mainColor + '50']
export const headerTintColor = COLOR[mainColor + '50'] //arrow

// Card
export const cardBackgroundColor = containerBgColor // match with
