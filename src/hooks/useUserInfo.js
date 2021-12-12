import { set } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import UserContext from './../context/UserContext';
import useToken from './useToken';
export default function useUserInfo() {
    const { user, setUser } = useContext(UserContext);
    const callToken = useToken();
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        confirm_pass: '',
        fullName: '',
        imageURL: '',
        isLogin: null,
    });
    const [message, setMessage] = useState(null)

    useEffect(() => {
        async function login() {
            let authService = AuthService.getInstance();
            const result = await authService.sendRequest({ username: userInfo.username, password: userInfo.password }, 'login');
            setUser(result.data)

            if (result.status) {
                setMessage(result)
            }
            else {
                const token = {
                    "AccessToken": result.accessToken
                };
                localStorage.setItem('roles', result.data.RoleName.toUpperCase());
                localStorage.setItem('user', JSON.stringify(result.data))
                callToken.setToken(token);
            }
        }
        async function signup() {
            let authService = AuthService.getInstance();
            let result=null
            try{
                result = await authService.sendRequest({ username: userInfo.username, password: userInfo.password, email: userInfo.email }, 'signup');
                console.log(result);
                setUserInfo({
                    username: '',
                    password: '',
                    confirm_pass: '',
                    fullName: '',
                    imageURL: '',
                    isLogin: null,
                })
            }catch{
                result={
                    status:{
                        Status:'Error',
                        Code:601
                    },
                    message: 'Can not register. Try again!'
                }
            }
            setMessage(result)

        }
        if (userInfo.isLogin) login();
        else if (userInfo.isLogin === false) signup()
    }, [userInfo])
    function saveUserInfo(data) {
        setUserInfo(pre => pre = data);
    };
    function saveMessage(data) {
        setMessage(null);
    };
    return {
        setUserInfo: saveUserInfo,
        userInfo,
        setMessage: saveMessage,
        message: message
    }
}