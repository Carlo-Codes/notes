
import { Route, RouteProps, Routes } from "react-router-dom";
import './App.css'
import Navbar from './containers/navBar/NavBar.tsx';
import NavItem from './containers/navItem/navItem.tsx';
import NotFound from "./containers/notFound/notfound.tsx";
import Home from './containers/home/home';

interface IRoutes extends Omit<RouteProps, "children">{
  name?:string,
  //route:string
}


export const navbarItems:IRoutes[] = [
  {
    name: "Notes",
    path: '/notes'
  },
  {
    name: "Create New Note",
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
    path: '*',
    element : "/note/:id"
  }
]

const miscRoutes = misc.map(item => {
  return (
    <Route path={item.path} element={item.element}/>
  )
})

const navbarRoutes = navbarItems.map(item => {
  return (
    <Route path={item.path} element={item.element}/>
  )
})



const navBarItemsComponents = navbarItems.map(item => {
  const navitem = item.name && item.path ? <NavItem name={item.name} route={item.path}/> : null
  return (
    navitem
  )
})



function App() {
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
