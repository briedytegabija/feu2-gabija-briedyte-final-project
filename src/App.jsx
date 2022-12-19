import {Route, Switch} from 'react-router-dom';
import Register from "./Pages/Register";
import Login from "./Pages/Login";

export const useAuth = () => {
  const user = {loggedIn: localStorage.getItem("user")};
  return user && user.loggedIn;
};



function App() {
  return (
      <Switch>
          <Route path={'/register'} component={Register}/>
          <Route path={'/login'} component={Login}/>
      </Switch>
  );
}

export default App;

