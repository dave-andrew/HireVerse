import ManageCompany from "./pages/ManageCompany";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FindJobs from "./pages/FindJobsPage";
import RegisterCompany from "./pages/RegisterCompany";
import FindCompany from "./pages/FindCompany";
import Landing from "./pages/Landing";
import RegisterUser from "./pages/RegisterUser";
<<<<<<< HEAD
import {Authenticated} from "./middleware/UserMiddleware";
import CompanyManagers from "./components/company/CompanyManagers";
import JobPostingTable from "./components/company/JobPostingTable";
import CompanyJobs from "./components/company/CompanyJobs";
=======
import { Authenticated } from "./middleware/UserMiddleware";
>>>>>>> caf82958e0ef7c6e75c74f1e4e4e122706360505

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<FindJobs/>}
                />
                <Route
<<<<<<< HEAD
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
=======
                    path="/find-job"
                    element={<FindJobs />}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany />}
>>>>>>> caf82958e0ef7c6e75c74f1e4e4e122706360505
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
                    path="/register"
                    element={<RegisterUser/>}
                />
                <Route
                    path="*"
                    element={<h1>404 NOT FOUND</h1>}
                />
                <Route
                    path="/manage-company"
                    element={<ManageCompany/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
