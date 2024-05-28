import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Coures from './components/Courses'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Coures />} />
      </Routes>
    </div>
  );
}

export default App;
