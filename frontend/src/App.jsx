import React from 'react'
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
// import toast from "react-hot-toast";

function App() {
  return (
    <div className='h-screen'>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/create" element={<CreatePage></CreatePage>}></Route>
        <Route
          path="/note/:id"
          element={<NoteDetailPage></NoteDetailPage>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;