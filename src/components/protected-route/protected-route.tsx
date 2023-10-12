import { FC, ReactElement } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { routes } from '../../utils/constants';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtected {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected: FC<IProtected> = ({ onlyUnAuth = false, component }) => {
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
    return <Navigate to={routes.login} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth: FC<IProtected> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
