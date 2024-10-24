import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Store } from "../Store";
import { getError } from '../utils';
import toast from "react-hot-toast";


export default function SigninScreen() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User Logged In Successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card w-full max-w-md bg-base-200 shadow-lg p-5">
        <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="form-control mb-3">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <button className="btn btn-primary w-full" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-sm">
            New customer?{' '}
            <Link to="/signup" className="text-primary">
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
