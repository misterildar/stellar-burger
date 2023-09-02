import { useEffect } from 'react';
import Feed from '../../pages/feed';
import Home from '../../pages/home';
import styles from './app.module.css';
import Loader from '../loader/loader';
import Login from '../../pages/login';
import { api } from '../../utils/api';
import { Modal } from '../modal/modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Register from '../../pages/register';
import { routes } from '../../utils/constants';
import { Route, Routes } from 'react-router-dom';
import ProfileNav from '../../pages/profile-nav';
import ProfileDataChange from '../../pages/profile';
import ProfileHistoryOrders from '../../pages/orders';
import { AppHeader } from '../app-header/app-header';
import ResetPassword from '../../pages/reset-password';
import ForgotPassword from '../../pages/forgot-password';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStatus } from '../../services/store/ingredientsSlice';
import { getIngredients } from '../../services/store/ingredientsSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { loading, error } = useSelector(getStatus);

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(api.checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {loading && (
        <Modal>
          <Loader text={'Идет загрузка данных ...'} />
        </Modal>
      )}
      {error && (
        <Modal>
          <Loader text={`Произошла ошибка: ${error}`} />
        </Modal>
      )}

      <Routes location={background || location}>
        <Route path={routes.home} element={<Home />} />
        <Route
          path={routes.register}
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path={routes.login}
          element={<OnlyUnAuth component={<Login />} />}
        />

        <Route
          path={routes.forgotPassword}
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />

        <Route
          path={routes.resetPassword}
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />

        <Route path={routes.ingredients} element={<IngredientDetails />} />

        <Route
          path={routes.feed}
          element={<OnlyUnAuth component={<Feed />} />}
        />

        <Route
          path={routes.profile}
          element={<OnlyAuth component={<ProfileNav />} />}
        >
          <Route
            index
            element={<OnlyAuth component={<ProfileDataChange />} />}
          />
          <Route
            path={routes.order}
            element={<OnlyAuth component={<ProfileHistoryOrders />} />}
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path={routes.ingredients}
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
