import {Redirect, Route, Switch, useRouteMatch, useLocation} from 'react-router-dom';
import cn from 'classnames';
import {NotificationContainer} from 'react-notifications';

import PrivateRoute from './components/PrivateRoute'
import GamePage from './routes//Game/routes/index';
import HomePage from './routes/HomePage';
import MenuHeader from './components/MenuHeader';
import AboutPage from './routes/AboutPage';
import NotFound from './routes/NotFound';
import Footer from './components/Footer';

import s from './style.module.css';
import ContactPage from './routes/ContactPage';
import { FireBaseContext } from './context/FirebaseContext';
import FirebaseClass from './data/firebase';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAsync, selectUserLoading } from './store/user';
import UserPage from './routes/UserPage';



const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const match = useRouteMatch('/');
  const location = useLocation('/');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, [])

  if (isUserLoading) {
    return 'loading...'
  }

    return (
          <FireBaseContext.Provider value ={FirebaseClass}>
            <Switch>
            <Route path="/404" 
                    component={NotFound}/>
            <Route>
                <>
                  <MenuHeader bgActive={!(location.pathname === '/' || location.pathname === '/game/board')}/>
                  <div className={cn(s.wrap, {
                    [s.isHomePage]: match.isExact})
                  }>
                    <Switch>
                      <Route path="/" exact component={HomePage}/>
                      <PrivateRoute path="/game" component={GamePage}/>
                      <PrivateRoute path="/about" component={AboutPage}/>
                      <Route path="/contact" component={ContactPage}/>
                      <Route path="/user" component={UserPage}/>
                      <Route render={() => (<Redirect to="/404"/>)}/>
                    </Switch>
                  </div>
                  <Footer/>
                </>
            </Route>
          </Switch>
          <NotificationContainer/>
          </FireBaseContext.Provider>
    )
};

export default App;
