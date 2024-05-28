import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </div>
  );
}

export default App;
