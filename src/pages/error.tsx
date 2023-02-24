import { useRouteError, Link } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function Error() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className='error-container'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        You can go to <Link to='/'>Main page</Link>
      </p>
    </div>
  );
}
