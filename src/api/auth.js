import axios from 'axios';
import { toast } from 'react-toastify';
import { login as loginAction, setLoading } from '../features/authSlice';
import { setErrors } from '../features/errorsSlice';


export const login = (email, password) => dispatch => {
    axios.post('/api/auth/login', { email, password })
        .then(res => {
            toast.success(res.data.msg);
            dispatch(loginAction(res.data.token));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}