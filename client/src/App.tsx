import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MemoSpanDetails } from './pages/SpanDetails';

const App = () => {
  return (
    <div className="App">
           <h1>Span Dashboard</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/span:id" element={<MemoSpanDetails />} />
      </Routes>
    </div>
  );
}

export default App;
