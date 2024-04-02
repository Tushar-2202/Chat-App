import { Dimensions } from "react-native";

const GOOGLE_WEB_API_KEY = '496317948610-l8dq0sk6g4qarqfv8gb4n1tisl7p6npv.apps.googleusercontent.com'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const REGEX = {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
}

const storyData = [
    {
        id: 1,
        profileImage: { uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        borderColor:'#FFC746',
        name: 'Adil'
    },
    {
        id: 2,
        profileImage: {uri:'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#EDA0A8',
        name: 'Marina'
    },
    {
        id: 3,
        profileImage: {uri:'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM='},
        borderColor:'#98A1F1',
        name: 'Dean'
    },
    {
        id: 4,
        profileImage: {uri:'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?b=1&s=170667a&w=0&k=20&c=cVdVl-0bpliZ0Sduc7ZDkMPwLnbxaMXZONllS39oeFc='},
        borderColor:'#00FF00',
        name: 'Max'
    },
    {
        id: 5,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Virat'
    },
    {
        id: 6,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Dhoni'
    },
    {
        id: 7,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Jhon'
    },
    {
        id: 8,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Rohit'
    },
    {
        id: 9,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Hardik'
    },
    {
        id: 10,
        profileImage: {uri:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        borderColor:'#FFC746',
        name: 'Tushar'
    }
];

export { width, height, REGEX ,GOOGLE_WEB_API_KEY ,storyData}