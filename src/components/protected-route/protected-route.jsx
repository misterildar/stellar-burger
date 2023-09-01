import { useAuth } from '../../hooks/use-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../utils/constants';

const Protected = ({ onlyUnAuth = false, component }) => {
  const { user, isAuthChecked } = useAuth();

  const location = useLocation();

  if (!isAuthChecked) {
    return <h1>Подождите...</h1>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: routes.home } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={routes.register} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
