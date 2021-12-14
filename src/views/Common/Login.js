import GoogleIcon from '@mui/icons-material/Google';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
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

    const [loginForm, setLoginForm] = useState({
        username: null,
        password: null,
    })
    const [signupForm, setSignupForm] = useState({
        username: null,
        email: null,
        password: null,
        conf: null
    })
    const [rightPanelActive, setRightPanelActive] = useState("");
    const [mobileRes, setMobileRes] = useState({ login: "m-container", signup: "display-none" });

    const [state, setState] = useState({
        loading: false,
        alert: false,
        title: ''
    });

    let TOKEN = localStorage.getItem(APP_CONSTANTS.USER_TOKEN);

    useEffect(() => {
        if (TOKEN) {
            let role = localStorage.getItem('roles')
            let username = JSON.parse(TOKEN).Username
            setState(s => { return { ...s, loading: false } });
            if (role === 'STUDENT') history.push(`/${username}`)
            else history.push(`/`)
        }
        if (user.message != null && user.message.status.Code === 601) {
            setState(s => { return { loading: false, alert: true, title: user.message.message } })
            user.setMessage(null)
        }
        if (history.location.pathname==='/register' && user.message && user.message.status.Code === 200) {
            setState(s => { return { loading: false, alert: true, title: "Signup Successfully" } })
            user.setMessage(null)
            openLogin() 
            history.push('/login')
        }// eslint-disable-next-line
    }, [mobileRes, TOKEN, user, state,history]);

    const handleClose = () => {
        setState(s => { return { ...s, loading: false } });
    };
    const handleLogin = e => {
        setState(s => { return { ...s, loading: true, alert: false } });
        e.preventDefault();
        user.setUserInfo({
            username: loginForm.username,
            password: loginForm.password,
            isLogin: true
        });
    }
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);//eslint-disable-line

    const handleSignUp = e => {
        e.preventDefault();
        let { username, email, password, conf } = signupForm
        if (!username || !email || !password || !conf) {
            setState(s => { return { ...s, alert: true, title: 'Input fields is required!' } });
        }
        else if (username.length < 5) {
            setState(s => { return { ...s, alert: true, title: 'Username must be 5 characters long!' } });
        }
        else if (!validEmailRegex.test(email)) {
            setState(s => { return { ...s, alert: true, title: 'Email is not valid!' } });
        }
        else if (password.length < 8) {
            setState(s => { return { ...s, alert: true, title: 'Password must be 8 characters long1' } });
        }
        else if (password !== conf) {
            setState(s => { return { ...s, alert: true, title: 'Confirm password is not matched!' } });
        }
        else {
            setState(s => { return { ...s, loading: true, alert: false } });
            user.setUserInfo({
                username: username,
                password: password,
                email: email,
                isLogin: false
            });
        }

    }
    const handleChangeLogin = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginForm(s => { return { ...s, [name]: value } })
    }

    const handleChangeSignup = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignupForm(s => { return { ...s, [name]: value } },)
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
        setState(s => { return { ...s, alert: true, title: response } })
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
                    open={state.loading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
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
                        <input type="text" placeholder="Username" id="username-su" name="username" onChange={handleChangeSignup} required autoComplete="new-password" />
                        <input type="text" placeholder="Email" id="email-su" name="email" required onChange={handleChangeSignup} autoComplete="new-password" />
                        <input type="password" placeholder="Password" id="password-su" name="password" required onChange={handleChangeSignup} autoComplete="new-password" />
                        <input type="password" placeholder="Confirm Password" id="conf-su" name="conf" required onChange={handleChangeSignup} autoComplete="new-password" />
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

                        <input type="email" placeholder="Email" id="username" name="username" onChange={handleChangeLogin} required />
                        <input type="password" placeholder="Password" id="password" name="password" onChange={handleChangeLogin} required />
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
