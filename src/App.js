import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import CommentBoard from './components/CommentBoard'
import PostsComponent from './components/PostComponent/PostsComponent'

function App() {
  return (
    <>
      <PostsComponent />
      {/* <CommentBoard /> */}
    </>
  );
}

export default App;
