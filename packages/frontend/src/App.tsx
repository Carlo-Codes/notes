
import { Route, RouteProps, Routes, useNavigate } from "react-router-dom";
import './App.css'
import Navbar from './containers/navBar/NavBar.tsx';
import NavItem from './containers/navItem/navItem.tsx';
import NotFound from "./containers/notFound/notfound.tsx";
import Home from './containers/home/home';
import { useEffect, useState } from "react";
import SignInPage from "./containers/signIn/signin.tsx";
import { Auth } from 'aws-amplify';
import {CognitoUser} from '@aws-amplify/auth'
import Notes from "./containers/notes/notes.tsx";
interface IRoutes extends Omit<RouteProps, "children">{
  name?:string,
  //route:string
}

function App() {
  const [authenticated, setAuthenticated] = useState<CognitoUser>();
  const navigate = useNavigate()
  const navbarItems:IRoutes[] = [
    {
      name: "Notes",
      path: '/notes',
      element: <Notes/>
    },
    {
      name: "New Note",
      path: '/newNote'
    },
    {
      name: "Home",
      path: '/',
      element: <Home/>
    },
  ]
  
  const misc:IRoutes[] = [
    {
      name: "Not Found",
      path: '*',
      element : <NotFound/>
    },
  
    {
      name: "Note",
      path:  "/note/:id",
      element : "/note/:id"
    },
  
    {
      name: "SignIn",
      path: "/signin",
      element: <SignInPage authStateFn={setAuthenticated} authState={authenticated}/>
    }
  ]
  
  const miscRoutes = misc.map(item => {
    return (
      <Route path={item.path} element={item.element}/>
    )
  })
  
  const navbarRoutes = navbarItems.map(item => {
    return (
      <Route path={item.path} element={item.element} />
    )
  })
  
  const navBarItemsComponents = navbarItems.map(item => {
    const navitem = item.name && item.path ? <NavItem name={item.name} route={item.path}/> : null
    return (
      navitem
    )
  })

  async function getAuthetication(){
    try {
      setAuthenticated(await Auth.currentAuthenticatedUser())   
    } catch (error) {
      return(
        navigate('/signin')
      )
    }
  }

useEffect(()=>{
    getAuthetication();
},[authenticated])

    return (
      <div className="App">
        <Navbar>
          {navBarItemsComponents}
        </Navbar>
        <Routes>
          {[...navbarRoutes, ...miscRoutes]}
        </Routes>
      </div>
    );
  }



export default App
