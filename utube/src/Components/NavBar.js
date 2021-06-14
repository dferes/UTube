import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, NavbarBrand, Button, UncontrolledDropdown, 
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import useInputFilter from '../hooks/useInputFilter';
import './NavBar.css';
import UserContext from '../FormContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const UTubeLogo = process.env.PUBLIC_URL + 'images/UTube_Button2.png';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';
const searchButtonIcon = process.env.PUBLIC_URL + 'images/search_glass_symbol.png';
const sidebarMenuIcon = process.env.PUBLIC_URL + 'images/hamburger_icon5.png';


const NavBar = () => {
  // const { user, videoSearchList, setVideoSearchList, isLoggedIn } = useContext(UserContext);
  const { videoSearchList, setVideoSearchList, isLoggedIn } = useContext(UserContext);
  const [ formSubmit, setFormSubmit ] = useState(false);
  const history = useHistory();

  const [  
    filter, 
    handleChange, 
    handleSubmit
  ] = useInputFilter({ apiMethod: 'videoSearch', termKey: 'title', globalUpdateFunction: setVideoSearchList} );

  
  useEffect( () => {
    const goToResultsPage = async () => {
      await setFormSubmit(false);
      history.push('/search');
    }

    if(formSubmit) goToResultsPage();
    
  }, [videoSearchList, formSubmit, setFormSubmit, history]);

  return (
    <Navbar fixed='top' className='UTube-navbar navbar-dark'>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle 
          className='navbar-dropdown-menu-toggle-button' nav
          style={{
            backgroundColor: 'rgb(32, 32, 32)', 
            width: '4em',
            marginTop: '-0.8em',
            height: '3em',
            marginLeft: '0.9em'
          }}  
        />
        <img className='collapse-menu-hamburger-icon-collapse' src={sidebarMenuIcon} alt=''/>
        <DropdownMenu className='navbar-dropdown-menu' left
          style={{
            backgroundColor: 'rgb(32, 32, 32)',
            marginLeft: '0',
            borderWidth: '0'
          }}
        >
          <DropdownItem>
            <NavLink to='/'>
              <div className='nav-link-div'>
                <FontAwesomeIcon icon={faHome} className="font-awesome-menu-icon" /> 
                  <p className='navlink-text'>Home</p> 
              </div>
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to='/subscriptions'>
              <div className='nav-link-div'>
                <FontAwesomeIcon icon={faUser} className="font-awesome-menu-icon" /> 
                  <p className='navlink-text'>Subscriptions</p>
              </div>
            </NavLink>  
          </DropdownItem>
          <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64)'}}/>
          <DropdownItem>
            <NavLink to='library'>
              <div className='nav-link-div'>
                <FontAwesomeIcon icon={faBook} className="font-awesome-menu-icon" /> 
                  <p className='navlink-text'>Library</p>
              </div>
            </NavLink>  
          </DropdownItem>
          <DropdownItem>
            <NavLink to='/history'>
              <div className='nav-link-div'>
                <FontAwesomeIcon icon={faHistory} className="font-awesome-menu-icon" /> 
                <p className='navlink-text'>History</p>      
              </div>
            </NavLink>
          </DropdownItem>
          <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64)'}} />

          { !isLoggedIn &&
            <div className='collapse-menu-sign-in-button-div'>
              <p>Sign in to like videos, comment, and subscribe.</p>
              <Button outline color='primary' className='sidebar-sign-in-button'>SIGN IN
                <img className='default-avatar-icon' src={defaultAvatarImage} alt=''></img>
              </Button> 
            </div>
          }
        </DropdownMenu>
      </UncontrolledDropdown>
      <div style={{
          marginLeft: '-14em',
          marginBottom: '0.6em'
      }}>
        <NavbarBrand href='/' >
          <img className='UTubeLogo' src={UTubeLogo} alt='UTube'/>UTube
        </NavbarBrand>
      </div>    

      <div className='video-search-div'>
        <form className='video-title-search-form' onSubmit={ async (evt) => {
          await handleSubmit(evt);
          await setFormSubmit(true);
        } }>
          <label htmlFor='video-title-search' />
          <input 
            className='video-title-search-input'
            id='video-title-search'
            name='title'
            placeholder='Search'
            value={filter.title}
            onChange={handleChange}
          />
          <button className='video-title-search-button'>
            <img 
              className='video-title-search-button-icon' 
              src={searchButtonIcon} 
              alt=''/>
          </button>    
        </form>
      </div>
      { !isLoggedIn &&
        <Button outline color='primary' className='navbar-sign-in-button'>SIGN IN
        <img className='default-avatar-icon' src={defaultAvatarImage} alt='' />
        </Button> 
      }
    </Navbar>
  );
};

export default NavBar;