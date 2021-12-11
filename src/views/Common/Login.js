import GoogleIcon from '@mui/icons-material/Google';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { useHistory } from 'react-router-dom';
import '../../styles/Login.css';
import AlertBar from './../../components/Alert/AlertBar';
import APP_CONSTANTS from './../../constants';
import useUserInfo from './../../hooks/useUserInfo';

const CLIENT_ID = APP_CONSTANTS.CLIENT_ID;

function Login() {
    const history = useHistory();
    const user = useUserInfo();
    const username = useRef(null);
    const password = useRef(null);
    const un_signup = useRef(null);
    const email_signup = useRef(null);
    const pass_signup = useRef(null);
    const confirm_pass = useRef(null);

    const [rightPanelActive, setRightPanelActive] = useState("");
    const [mobileRes, setMobileRes] = useState({ login: "m-container", signup: "display-none" });

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = useState({ value: false, count: 0 });
    const [title, setTitle] = useState('')
    let TOKEN = localStorage.getItem(APP_CONSTANTS.USER_TOKEN);
    useEffect(() => {
        if (TOKEN) {
            let role = localStorage.getItem('roles')
            let username = JSON.parse(TOKEN).Username

            setLoading(false)
            if (role === 'STUDENT') history.push(`/${username}`)
            else history.push(`/`)
        }
        // if (user.message && user.message.status.Code & alert.count === 0) {
        //     setLoading(false)
        //     setAlert({ value: true, count: 1 })
        //     setTitle(user.message)
        // }
        if (user.message != null && user.message.status.Code === 601 && alert.count === 0) {
            setLoading(false)
            setAlert({ value: true, count: 1 })
            setTitle(user.message.message)
            user.setMessage(null)
        }
        if (user.message && user.message.status.Code === 200 ){
            setLoading(false)
            setAlert({ value: true, count: 1 })
            setTitle("Signup Successfully")
            user.setMessage(null)
            openLogin()
            history.push('/login')
        }
    }, [mobileRes, TOKEN, user, loading]);


    function stringContainsNumber(_input) {
        let string1 = String(_input);
        for (let i = 0; i < string1.length; i++) {
            if (!isNaN(string1.charAt(i))) {
                return true;
            }
        }
        return false;
    }
    const handleClose = () => {
        setLoading(false);
    };
    const handleLogin = e => {
        setLoading(true);
        setAlert({ value: false, count: 0 })
        e.preventDefault();
        const userInfo = {
            username: username.current.value,
            password: password.current.value
        };
        user.setUserInfo({
            username: userInfo.username,
            password: userInfo.password,
            isLogin: true
        });

    }
    const handleSignUp = e => {
        setLoading(true);
        setAlert({ value: false, count: 0 })
        e.preventDefault();
        const userInfo = {
            username: un_signup.current.value,
            password: pass_signup.current.value,
            email: email_signup.current.value
        };
        user.setUserInfo({
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            isLogin: false
        });
        // history.push(`./login`)
    }
    const responseGoogleSuccess = async (response, isLogin) => {
        const userInfo = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            token: response.googleId,
            image: response.profileObj.imageUrl,
        };
        if (userInfo.name) {
            user.setUserInfo({
                username: userInfo.email,
                password: userInfo.token,
                isLogin: isLogin
            });
        }
    };
    function responseGoogleError(response) {
        setAlert({ value: true })
        setTitle(response)
        console.log(response);
    };
    function openLogin(e) {
        if (e) e.preventDefault();
        setRightPanelActive(" ");
        if (window.innerWidth < 600) {
            setRightPanelActive("");
            setMobileRes(preState => preState = { login: "m-container", signup: "display-none" });

        }
        history.replace('/login')
    }
    function openSignUp(e) {

        e.preventDefault();
        setRightPanelActive(" right-panel-active");
        if (window.innerWidth < 600) {
            setRightPanelActive("");
            setMobileRes(preState => preState = { login: "display-none", signup: "m-container" });

        }
        history.replace('/register')
    }

    return (
        <div className="login" style={{ boxSizing: 'border-box' }}>
            <div className={"container" + rightPanelActive} id="login">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <AlertBar
                    title={title}
                    openAlert={alert.value}
                    closeAlert={() => setAlert({ value: false, count: alert.count })}
                />
                <div className={"form-container sign-up-container  " + mobileRes.signup}>
                    <form action="#" >
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                render={renderProps => (
                                    <a
                                        href="/#"
                                        className="social"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}>
                                        <GoogleIcon /></a>
                                )}
                                buttonText="Sign Up with Google"
                                onSuccess={(response) => responseGoogleSuccess(response, false)}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Username" ref={un_signup} required autoComplete="new-password"/>
                        <input type="text" placeholder="Email" ref={email_signup} required autoComplete="new-password"/>
                        <input type="password" placeholder="Password" ref={pass_signup} required autoComplete="new-password"/>
                        <input type="password" placeholder="Confirm Password" ref={confirm_pass} required autoComplete="new-password"/>
                        <button onClick={handleSignUp}>Sign Up</button>
                        <button className="ghost-m" id="signIn" onClick={openLogin} >Sign In</button>

                    </form>
                </div>
                <div className={"form-container sign-in-container " + mobileRes.login}>
                    <form action="/#" >
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                render={renderProps => (
                                    <a
                                        href="/#"
                                        className="social"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}>
                                        <GoogleIcon /></a>
                                )}
                                buttonText="Sign In with Google"
                                onSuccess={(response) => responseGoogleSuccess(response, true)}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <span>or use your account</span>

                        <input type="email" placeholder="Email" ref={username} required />
                        <input type="password" placeholder="Password" ref={password} required />
                        <a href="/#">Forgot your password?</a>
                        <button onClick={handleLogin}>Sign In</button>
                        <button className="ghost-m" id="signUp" onClick={openSignUp} >Sign Up</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={openLogin} >Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={openSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
