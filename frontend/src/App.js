import { Router } from "./routes/router";
import {Navbar} from './components/app/navbar'
function App() {
  return (
    <>
    <Navbar></Navbar>
      <Router />
    </>
  );
}

export default App;
