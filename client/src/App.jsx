import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
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
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/updateTask" element={<UpdateTask />} />
          <Route path="/tasks/:taskID" element={<ShowSingleTask />} />
          <Route path="/tasks" element={<ShowTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
