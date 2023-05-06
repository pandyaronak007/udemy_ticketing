import { useState } from 'react';
import Router from 'next/router';
import userRequest from '../../hooks/userRequest';

const singUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let url = '/api/users/signUp';
  if (process.env.USE_LOCAL === 'true') {
    url = `http:localhost:3001${url}`;
  }

  const { doRequest, errors } = userRequest({
    url: url,
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sing Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default singUp;