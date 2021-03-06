import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from './redux/store';
import firebase from 'firebase';
import config from './firebase/config';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Container from './components/Container';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Account from './pages/Account';
import SearchResult from './pages/SearchResult';
import NoMatch from './pages/NoMatch';

const rrf = {
  config,
  firebase,
  dispatch:store.dispatch
}

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state=>state.firebaseReducer.auth);
  if(!isLoaded(auth)) return "";
  return children;
}

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrf}>
        <AuthIsLoaded>
          <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Container>
              <Home/>

              </Container>

            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/products/:productId">
              <Container>
              <Product/>
              </Container>

            </Route>
            <Route exact path="/cart">
              <Container>
              <Cart/>
              </Container>

            </Route>
            <Route exact path="/checkout/shipping">
              <Container>
              <Shipping/>
              </Container>

            </Route>
            <Route exact path="/checkout/payment">
              <Container>
              <Payment/>
              </Container>

            </Route>
            <Route exact path="/account/:part">
              <Container>
              <Account/>
              </Container>

            </Route>
            <Route exact path="/search">
              <Container>
              <SearchResult/>
              </Container>

            </Route>
            <Route path="*">
              <Container>
                <NoMatch/>
              </Container>
            </Route>
          </Switch>
          </BrowserRouter>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
 
export default App;
