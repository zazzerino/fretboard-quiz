import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { loginAsync } from '../actions';

export function LoginForm(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data: any) => {
    const { username, password } = data;
    dispatch(loginAsync({ username, password }));
    history.push('/');
  };

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          username:
          <input name="username"
                 type="text"
                 ref={register({ required: true })}
          />
        </label>
        {errors.username && <span>↑ Username required.</span>}
        <label>
          password:
          <input name="password"
                 type="password"
                 ref={register({ required: true })}
          />
        </label>
        {errors.password && <span>↑ Password required.</span>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
