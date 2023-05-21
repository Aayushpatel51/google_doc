import IndexPage from './components/IndexPage/IndexPage';
import Login from './components/Auth/Login'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectUserName } from './redux/userSlice'
import Docs from './components/Docs/Docs';

function App() {
  const userName = useSelector(selectUserName);
  return (
    <div className="App">
        <BrowserRouter>
        {
          !userName ?
            <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
            </> : <>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/doc/:id" element={<Docs />}/> 
            </Routes>
            </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
