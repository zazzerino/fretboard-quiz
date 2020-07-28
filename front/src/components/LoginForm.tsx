import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { loginAsync } from '../actions';

export function LoginForm(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    const { name, password } = data;
    dispatch(loginAsync({ name, password }));
    history.push('/');
  };

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input name="name"
                 type="text"
                 ref={register({ required: true })}
          />
        </label>
        {errors.username && <span>↑ Username required.</span>}
        <label>
          Password:
          <input name="password"
                 type="password"
                 ref={register({ required: true })}
          />
        </label>
        {errors.password && <span>↑ Password required.</span>}
        <input type="submit" className="submit-button" value="Submit" />
      </form>
      <Link to="/register" className="link">
        No account? Click here to register
      </Link>
    </div>
  );
}
