import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img
          className='logo'
          src={assets.logo}
          alt=''
        />
      </Link>
      <ul className='navbar-menu'>
        <li
          onClick={() => {
            setMenu('home');
            navigate('/');
          }}
          className={menu === 'home' ? 'active' : ''}>
          home
        </li>

        <li
          onClick={() => {
            setMenu('menu');
            navigate('/#explore-menu');
          }}
          className={menu === 'menu' ? 'active' : ''}>
          menu
        </li>

        <li
          onClick={() => {
            setMenu('mobile-app');
            navigate('/#app-download');
          }}
          className={menu === 'mobile-app' ? 'active' : ''}>
          mobile-app
        </li>

        <li
          onClick={() => {
            setMenu('contact-us');
            navigate('/#footer');
          }}
          className={menu === 'contact-us' ? 'active' : ''}>
          contact us
        </li>
      </ul>
      <div className='navbar-right'>
        <img
          src={assets.search_icon}
          alt=''
        />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img
              src={assets.basket_icon}
              alt=''
            />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img
              src={assets.profile_icon}
              alt=''
            />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img
                  src={assets.bag_icon}
                  alt=''
                />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img
                  src={assets.logout_icon}
                  alt=''
                />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
