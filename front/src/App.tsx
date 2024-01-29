import './index.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import Editor from "./pages/Editor.tsx";
import Lounge from "./pages/Lounge.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Missing from "./pages/Missing.tsx";
import LinkPage from "./pages/LinkPage.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import {RequiredAuth} from "./components/RequiredAuth.tsx";
import {UserRoles} from "./model/User.ts";


function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route element={<RequiredAuth allowedRoles={[UserRoles.User]} />}>
                    <Route path={'/'} element={<Home />} />
                </Route>
                <Route element={<RequiredAuth allowedRoles={[UserRoles.Admin]} />}>
                    <Route path={'admin'} element={<Admin />} />
                </Route>
                <Route element={<RequiredAuth allowedRoles={[UserRoles.Editor]} />} >
                    <Route path={'editor'} element={<Editor />} />
                </Route>
                <Route element={<RequiredAuth allowedRoles={[UserRoles.User, UserRoles.Editor, UserRoles.Admin]} />}>
                    <Route path={'lounge'} element={<Lounge />} />
                </Route>

                <Route path={'login'} element={<Login />} />
                <Route path={'register'} element={<Register />} />
                <Route path={'linkpage'} element={<LinkPage />} />
                <Route path={'unauthorized'} element={<Unauthorized />} />

                <Route path={'*'} element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
