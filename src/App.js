import {Route, Switch} from 'react-router-dom';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Shops from "./Pages/Shops";
import AddShops from "./Pages/AddShops";
import Home from "./Pages/Home";

export const useAuth = () => {
  const user = {loggedIn: localStorage.getItem("user")};
  return user && user.loggedIn;
};

function App() {
  return (
      <Switch>
          <Route path={'/register'} component={Register}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/add-shops'} component={AddShops}/>
          <Route path={'/shops'} component={Shops}/>
          <Route path={'/'} exact component={Home}/>
      </Switch>
  );
}

export default App;

