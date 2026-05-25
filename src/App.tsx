import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './screens/Landing';
import { Overview } from './screens/Overview';
import { Test } from './screens/Test';
import { Results } from './screens/Results';
import { Review } from './screens/Review';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/overview/:section" element={<Overview />} />
      <Route path="/test" element={<Test />} />
      <Route path="/test/:n" element={<Test />} />
      <Route path="/results" element={<Results />} />
      <Route path="/review" element={<Review />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
