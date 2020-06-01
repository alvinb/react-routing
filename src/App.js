import React, {useState, useEffect} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

// components
import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Geo } from 'components/Geo';
import { Login } from 'components/Login';
import { Dashboard } from 'components/Dashboard';
import { Landing } from 'components/Landing';
import { Loading } from 'components/Loading';

import { fetchGeo, isInRegion } from 'util/api';

import './App.css';

const logo = process.env.PUBLIC_URL + '/images/logo.svg';

function App() {
  const [ ready, setReady ] = useState(false);
  const [ inRegion, setInRegion ] = useState(false);
  const [ isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    avatar: '',
  });

  fetchGeo().then((response) => {
    if (response.geoheaders) {
      const country = response.geoheaders.country;
      const inRegion = isInRegion(country, 'US,CA');
      
      setInRegion(inRegion);
    }
    setReady(true);
  });

  useEffect(() => {
    if(user.userName){
      setIsAuthed(true);
    }
  },[user])

  if(!ready) return <Loading/>
  console.log(user);
  return (
    <div className='App'>
      <Header />
      <h1>Blabla</h1>
      <Switch>
        <PublicRoute exact path='/login' user={user} isInRegion={inRegion} onUserLoginSuccess={setUser} component={Login} />
        <PrivateRoute exact path='/dashboard' user={user} isInRegion={inRegion} component={Dashboard} />
        <Route exact path='/geo' component={Geo} />
        <PublicRoute exact path='/' component={Landing} isInRegion={inRegion} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
