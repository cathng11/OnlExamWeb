import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import useToken from './useToken';
export default function useUserInfo() {
    const callToken = useToken();
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        confirm_pass: '',
        email: '',
        imageURL: '',
        role: '',
        isLogin: null,
    });
    const [message, setMessage] = useState(null)

    useEffect(() => {
        let mounted = true;

        function login() {
            let authService = AuthService.getInstance();
            authService.sendRequest({ username: userInfo.username, password: userInfo.password }, 'login')
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            const token = {
                                "AccessToken": items.accessToken
                            };
                            localStorage.setItem('roles', items.data.RoleName.toUpperCase());
                            localStorage.setItem('user', JSON.stringify(items.data))
                            callToken.setToken(token);
                        }
                        else {
                            setMessage(items)
                        }
                    }
                })
        }
        function signup() {
            let authService = AuthService.getInstance();
            authService.sendRequest({
                username: userInfo.username,
                password: userInfo.password,
                email: userInfo.email,
                RoleID: userInfo.role
            }, 'signup')
                .then(items => {
                    if (mounted) {
                        console.log(items)
                        if (items.status.Code === 200) {
                            setMessage(items)
                            setUserInfo({
                                username: '',
                                password: '',
                                confirm_pass: '',
                                email: '',
                                role: '',
                                imageURL: '',
                                isLogin: null,
                            })
                        }
                        else {
                            setMessage(items)
                            setUserInfo(s => { return { ...s, isLogin: null } })
                        }
                    }
                })
        }
        if (userInfo.isLogin) login();
        else if (userInfo.isLogin === false) signup()
        return () => { mounted = false };//eslint-disable-next-line
    }, [userInfo, callToken])
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