// import { Button} from 'antd';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Group from "./pages/Group";
import Expense from "./pages/Expense";
import Settle from "./pages/Settle";
import Members from "./pages/Members";
import SettleHistory from "./pages/SettleHistory";
function App() {
  const {loading} = useSelector(state=>state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
          <Route path="/product/:id" element={<ProtectedPage><Group/></ProtectedPage>}/>
          <Route path="/product/:id/expenses" element={<ProtectedPage><Expense/></ProtectedPage>}/>
          <Route path="/product/:id/members" element={<ProtectedPage><Members/></ProtectedPage>}/>
          <Route path="/product/:id/settle" element={<ProtectedPage><Settle/></ProtectedPage>}/>
          <Route path="/product/:id/settlehistory" element={<ProtectedPage><SettleHistory/></ProtectedPage>}/>
          <Route path="/profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
          <Route path="/admin" element={<ProtectedPage><Admin/></ProtectedPage>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
