import { useAppSelector } from './hooks';

export const useAuth = () => {
  const {
    user,
    email,
    name,
    password,
    accessToken,
    refreshToken,
    isAuthChecked,
    //TODO
    // userRegisterFailed,
    // userRegisterRequest,
    isForgotPasswordRequest,
  } = useAppSelector((state) => state.user);

  return {
    user,
    email,
    name,
    password,
    accessToken,
    refreshToken,
    isAuthChecked,
    //TODO
    // userRegisterFailed,
    // userRegisterRequest,
    isForgotPasswordRequest,
  };
};
