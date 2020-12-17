import Aside from "./Components/Aside/Aside";
import Content from "./Components/Content/Content";
import classes from "./App.module.css";

const App = () => (
  <div className={classes.container}>
    <Aside />
    <Content />
  </div>

);

export default App;
