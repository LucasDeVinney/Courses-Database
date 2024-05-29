import { Route, Routes } from 'react-router-dom';

// Imports components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import PrivateRoute from './components/PrivateRoute';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Header />
      {/* non-auth routes */}
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />

        {/* Private apps that require authentication */}
        <Route element={<PrivateRoute />}>
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:id/update" element={<UpdateCourse />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
