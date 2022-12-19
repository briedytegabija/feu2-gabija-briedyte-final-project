import {Route, Switch} from 'react-router-dom';
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App() {
  return (
      <Switch>
          <Route path={'/register'} component={Register}/>
          <Route path={'/login'} component={Login}/>
      </Switch>
  );
}

export default App;

