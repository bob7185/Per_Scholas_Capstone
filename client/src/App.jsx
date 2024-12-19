import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import ShowSingleTask from "./pages/ShowSingleTask";
import ShowTasks from "./pages/ShowTasks";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/update/:taskId" element={<UpdateTask />} />
          <Route path="/tasks/user/:taskId" element={<ShowSingleTask />} />
          <Route path="/tasks" element={<ShowTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
