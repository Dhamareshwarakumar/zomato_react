import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';

import { login } from './features/authSlice';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './screens/Home';
import Login from './screens/Login';
import Admin from './screens/Admin';


const App = () => {
	const dispatch = useDispatch();

	// Check Auth Token
	const auth_token = localStorage.getItem('auth_token');
	if (auth_token) {
		dispatch(login(auth_token));
	}

	const rootRouter = createBrowserRouter([
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/admin',
			element: <ProtectedRoute roles={[1]}><Admin /></ProtectedRoute>
		},
		{
			path: '/',
			element: <ProtectedRoute><Home /></ProtectedRoute>
		}
	]);

	return (
		<>
			<RouterProvider router={rootRouter} />
			<ToastContainer
				position='bottom-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
};

export default App;