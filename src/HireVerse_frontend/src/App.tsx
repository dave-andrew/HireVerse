import ManageCompany from "./pages/ManageCompany";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FindJobs from "./pages/FindJobsPage";
import RegisterCompany from "./pages/RegisterCompany";
import FindCompany from "./pages/FindCompany";
import Landing from "./pages/Landing";
import RegisterUser from "./pages/RegisterUser";

import {Authenticated} from "./middleware/UserMiddleware";
import CompanyJobs from "./components/company/CompanyJobs";
import CompanyManagers from "./components/company/CompanyManagers";
import CompleteRegistration from "./pages/CompleteRegistration";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<FindJobs/>}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany/>}
                />
                <Route
                    path="/manage-company/managers"
                    element={<CompanyManagers/>}
                />
                <Route
                    path="/manage-company/jobs"
                    element={<CompanyJobs/>}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany/>}
                />
                <Route
                    path="/find-company"
                    element={<FindCompany/>}
                />
                <Route
                    path="/manage-company/register"
                    element={<RegisterCompany/>}
                />
                <Route element={<Authenticated/>}>
                    <Route
                        path="/login"
                        element={<Landing/>}
                    />
                </Route>
                <Route
                    path="*"
                    element={<h1>404 NOT FOUND</h1>}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany/>}
                />
                <Route path="/complete-registration"
                       element={<CompleteRegistration/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
