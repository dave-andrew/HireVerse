import ManageCompany from "./pages/ManageCompany";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import RegisterCompany from "./pages/RegisterCompany";

function App() {
    // const [greeting, setGreeting] = useState('null');
    //
    // let actor = HireVerse_backend;
    //
    // async function handleGreet(event) {
    //   event.preventDefault();
    //
    //   const actorGreet = await actor.greet();
    //
    //   setGreeting(actorGreet);
    //
    //   return false;
    // }
    //
    // const login = async (event) => {
    //   event.preventDefault();
    //   let authClient = await AuthClient.create();
    //
    //   // start the login process and wait for it to finish
    //   await new Promise((resolve) => {
    //       authClient.login({
    //           identityProvider: 'http://bnz7o-iuaaa-aaaaa-qaaaa-cai.localhost:4943',
    //           onSuccess: resolve,
    //       });
    //   });
    //
    //   const identity = authClient.getIdentity();
    //
    //   const agent = new HttpAgent({identity});
    //
    //   actor = createActor(process.env.CANISTER_ID_HIREVERSE_BACKEND, {
    //       agent,
    //   });
    //
    //   return false;
    // }

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
                    path="/manage-company/register"
                    element={<RegisterCompany />}
                />
            </Routes>
        </BrowserRouter>
        // <main>
        //   <ManageCompany />
        //   {/*<img src="/logo2.svg" alt="DFINITY logo" />*/}
        //   {/*<br />*/}
        //   {/*<br />*/}
        //   {/*<form onSubmit={login}>*/}
        //   {/*  <button type='submit'>Login!</button>*/}
        //   {/*</form>*/}
        //
        //   {/*<form onSubmit={handleGreet}>*/}
        //   {/*  <button type="submit">Greet</button>*/}
        //   {/*</form>*/}
        //   {/*<section id="greeting">{greeting}</section>*/}
        // </main>
    );
}

export default App;
