import logo from './logo.svg';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import react from 'react';
import AllProducts from './components/AllProducts';
import OneProduct from './components/OneProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AllProducts}></Route>
          <Route exact path="/:_id" component={OneProduct}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
