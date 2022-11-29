import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setLoading } from '../features/authSlice';
import { setErrors } from '../features/errorsSlice';
import { login } from '../api/auth';

import InlineText from '../components/InlineText';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);
    const errors = useSelector(state => state.error.err);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();

        dispatch(setLoading(true));
        dispatch(setErrors({}));
        dispatch(login(email, password));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        document.title = 'Login | Zomato';
    }, []);

    return (
        <div>
            <div className="login">
                <div className="login__img-container"></div>
                <div className="login__container">
                    <p className='login__container__title'>
                        India's #1 Food Delivery and Dining App
                    </p>

                    <InlineText content='Login or Signup' />

                    <form className='login__container__form' onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            {errors.email && <p className='error-feedback'>{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder='Password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            {errors.password && <p className='error-feedback'>{errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <button className={`btn btn--primary btn--block ${loading && 'btn--loading'}`}>Login</button>
                        </div>
                    </form>

                    <InlineText content='or' />

                    <div className="login__container__other">
                        <button
                            className='btn btn--outlined btn-round'
                            style={{ width: '40px', height: '40px' }}
                            onClick={() => toast('Google Login')}
                        >
                            <i className="fab fa-google"></i>
                        </button>
                        <button className='btn btn--outlined btn-round' style={{ width: '40px', height: '40px' }}>
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                    <div className="login__container__privacy-policy">
                        <p className='login__container__privacy-policy__content'>
                            By continuing, you agree to Zomato's
                            <a href='https://www.zomato.com/privacy'>Terms of Use</a> and
                            <a href='https://www.zomato.com/privacy'>Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;