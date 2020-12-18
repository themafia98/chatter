import Aside from "./Components/Aside/Aside";
import ChatContainer from "./Components/ChatContainer/ChatContainer";
import classes from "./App.module.css";

const App = () => (
  <div className={classes.container}>
    <Aside />
    <ChatContainer />
  </div>

);

export default App;
