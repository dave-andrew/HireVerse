import ManageCompany from "./pages/ManageCompany";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import RegisterCompany from "./pages/RegisterCompany";
import FindCompany from "./pages/FindCompany";

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
            </Routes>
        </BrowserRouter>

    );
}

export default App;
