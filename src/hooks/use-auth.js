import { useSelector } from 'react-redux';

export function useAuth() {
  const {
    user,
    email,
    name,
    password,
    accessToken,
    refreshToken,
    isAuthChecked,
    userRegisterFailed,
    userRegisterRequest,
    isForgotPasswordRequest
  } = useSelector((state) => state.user);

  return {
    user,
    email,
    name,
    password,
    accessToken,
    refreshToken,
    isAuthChecked,
    userRegisterFailed,
    userRegisterRequest,
    isForgotPasswordRequest
  };
} 