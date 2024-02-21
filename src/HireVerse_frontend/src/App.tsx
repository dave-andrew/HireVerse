import ManageCompany from "./pages/ManageCompany";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import RegisterCompany from "./pages/RegisterCompany";
import FindCompany from "./pages/FindCompany";
import Landing from "./pages/Landing";
import RegisterUser from "./pages/RegisterUser";
import { Authenticated } from "./middleware/UserMiddleware";

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<FindJobs />}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany />}
                />
                <Route
                    path="/find-company"
                    element={<FindCompany />}
                />
                <Route
                    path="/manage-company/register"
                    element={<RegisterCompany />}
                />
                <Route element={<Authenticated />}>
                    <Route
                        path="/login"
                        element={<Landing />}
                    />
                </Route>
                <Route
                    path="/register"
                    element={<RegisterUser />}
                />
                <Route
                    path="*"
                    element={<h1>404 NOT FOUND</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
