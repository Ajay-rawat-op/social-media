import './App.css';
import Navbar from './Component/Navbar/Navbar.js';
import CreatePost from './Pages/Createpost/CreatePost.js';
import Homepage from './Pages/Home/Home.js';
import { Route, Routes } from 'react-router-dom';
import SinglePost from './Pages/SinglePost/SinglePost.js';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/singlepost/:postID" element={<SinglePost />} />
        <Route path="/updatePost/:postID" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
