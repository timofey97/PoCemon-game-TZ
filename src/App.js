import {Redirect, Route, Switch, useRouteMatch, } from 'react-router-dom';
import cn from 'classnames';
import GamePage from './routes//Game/routes/index';
import HomePage from './routes/HomePage';
import MenuHeader from './components/MenuHeader';
import AboutPage from './routes/AboutPage';
import NotFound from './routes/NotFound';
import Footer from './components/Footer';
import s from './style.module.css';
import ContactPage from './routes/ContactPage';
import { FireBaseContext } from './context/FirebaseContext';
import Firebase from './data/firebase';



const App = () => {
  const match = useRouteMatch('/');

    return (
          <FireBaseContext.Provider value ={new Firebase()}>
            <Switch>
            <Route path="/404" 
                    component={NotFound}/>
            <Route>
                <>
                  <MenuHeader bgActive={!match.isExact}/>
                  <div className={cn(s.wrap, {
                    [s.isHomePage]: match.isExact})
                  }>
                    <Switch>
                      <Route path="/" exact component={HomePage}/>
                      <Route path="/game" component={GamePage}/>
                      <Route path="/about" component={AboutPage}/>
                      <Route path="/contact" component={ContactPage}/>
                      <Route render={() => (<Redirect to="/404"/>)}/>
                    </Switch>
                  </div>
                  <Footer/>
                </>
            </Route>
          </Switch>
          </FireBaseContext.Provider>
    )
};

export default App;
