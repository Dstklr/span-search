import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MemoSpanViewer } from './pages/SpanViewer';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/span/:id" element={<MemoSpanViewer />} />
      </Routes>
    </div>
  );
}

export default App;
