import Home from './Home';
import Automator from './Automator';
import Lists from './Lists';
import About from './About';
import ScannerTest from "./ScannerTest";
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ClipboardIcon from './assets/vectors/clipboard.svg'

const NavigatorAssistant = (args) =>{
    const [navbarIsOpen, navbarSetIsOpen] = useState(false);

    const toggle = () => navbarSetIsOpen(!navbarIsOpen); 
    
    return (
            <div>
                <Navbar {...args}>
                    <NavbarBrand href="/"><img src={ClipboardIcon} alt="logo" style={{ height: 40, width:40 }}/>TPR Automator</NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={navbarIsOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/automator/" > Create TPR List </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/lists/" > View TPR Lists </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/about/" > About </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/devscanner/" > ScannerTest </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
    );
};


function App() {
  return (
    <div className="App">
            <NavigatorAssistant />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/automator' element={<Automator />} />
                <Route exact path='/lists' element={<Lists />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/devscanner' element={<ScannerTest />} />
            </Routes>
    </div>
  );
}

export default App;
