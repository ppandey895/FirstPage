import { useState, useEffect } from 'react';
import { HashRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Home from './Components/Home/Home';
import Explore from './Components/Explore/Explore';
import Nav from './Components/Nav/Nav'
import ProfilePage from './Components/ProfilePage/ProfilePage';
import EditProfile from './Components/ProfilePage/EditProfile/EditProfile';
import BookPage from './Components/BookPage/BookPage';
import BookMarks from './Components/BookMarks/BookMarks';
import authManage from './reducers';

import './App.css';

const store = createStore(authManage, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">

          <Nav />
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="book/:id" element={ <BookPage /> } />
            <Route path="/explore" element={ <Explore /> } />
            <Route exact path="/profile" element={ <ProfilePage /> } />
            <Route path="/profile/edit" element={ <EditProfile /> } />
            <Route path="/bookmarks" element={ <BookMarks /> } />
          </Routes>

        </div>
      </HashRouter>
    </Provider>
  )
}

export default App;
