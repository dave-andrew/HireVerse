import { useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from '@dfinity/agent';
import ManageCompany from "./pages/ManageCompany";

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
    <main>
      <ManageCompany />
      {/*<img src="/logo2.svg" alt="DFINITY logo" />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<form onSubmit={login}>*/}
      {/*  <button type='submit'>Login!</button>*/}
      {/*</form>*/}

      {/*<form onSubmit={handleGreet}>*/}
      {/*  <button type="submit">Greet</button>*/}
      {/*</form>*/}
      {/*<section id="greeting">{greeting}</section>*/}
    </main>
  );
}

export default App;
