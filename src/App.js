import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testpersons from './pages/Testpersons';
import Bookings from './pages/Bookings';
import Search from './pages/Search';
import Users from './pages/Users';
import Groups from './pages/Groups';
import SearchResult from './pages/SearchResult';
import './App.css';

function App() {
  

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        
        <Route exact path="/" element={<Search/>} />
        <Route exact path="/persons" element={<Testpersons/>} />
        <Route exact path="/searchresult" element={<SearchResult/>} />
        <Route exact path="/bookings" element={<Bookings/>} />
        <Route exact path="/users" element={<Users/>} />
        <Route exact path="/groups" element={<Groups/>} />



        
      </Routes>
    </Router>


  </>
  );
}

export default App;
