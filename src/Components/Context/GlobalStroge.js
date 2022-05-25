import React, { createContext, useEffect, useState } from 'react'
import SimpleBackdrop from '../Waiting/ProgressBar'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
let initialState = {
    allPosts: [],
    userData: {},
    Temp: 2,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, setstate] = useState(initialState);
    let [progressbar, Changeprogressbar] = useState({a: true, b: false});
    const getdata = async () => {
        const result1 = await axios.post('https://desktop70app.herokuapp.com/allposts', {});
        const result = await axios.post('https://desktop70app.herokuapp.com/home', {});
        Changeprogressbar({a: false, b: true});
        setstate({ ...state, userData: { ...result.data.data?._doc }, allPosts: [...result1.data.allposts] });
    }
    const ChangePosts = (newposts) => {
        setstate({ ...state, allPosts: [...newposts] });
    }
    const ChangeuserData = (newuserData) => {
        setstate({ ...state, userData: newuserData });
    }
    const ChangeTemp = (val) => {
        setstate({ ...state, Temp: val })
    }
    const ChangeBoth = (newposts, newuserData) => {
        setstate({ ...state, userData: newuserData, allPosts: [...newposts] });
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    useEffect(() => {
        getdata();
    }, []);
    console.log(state);
    return (
        <GlobalContext.Provider value={{
            allPosts: state.allPosts,
            userData: state.userData,
            Temp: state.Temp,
            myid: state.userData?._id,
            myname: state.userData?.fullname,
            friends: state.userData?.friends,
            ChangePosts,
            ChangeuserData,
            ChangeTemp,
            ChangeBoth
        }}>
            {children}
            <SimpleBackdrop progressbar={progressbar.a} />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} 
                onClose = {() => {Changeprogressbar({a: false, b: false})}}
                open={progressbar.b} autoHideDuration={4000}>
                <Alert severity={(state.userData.fullname === undefined) ? 'error' : 'success'}>
                    {(state.userData.fullname === undefined) ? 'Please login to use all features': 'you have successfully logged In'}
                </Alert>
            </Snackbar>
        </GlobalContext.Provider>
    );
}