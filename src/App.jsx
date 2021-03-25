import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Groups from "./components/Groups/Groups";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            path="/dialogs"
            render={() => <DialogsContainer store={props.store} />}
          />
          <Route
            path="/profile"
            render={() => <Profile store={props.store} />}
          />
          <Route path="/news" component={News} />
          <Route path="/groups" component={Groups} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;