import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './pages/eventLists/EventList';
import EventDetails from './pages/eventDetails/EventDetails.js';
import EventRegister from './pages/eventRegister/EventRegister.js';
import Home from './pages/home/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/events" element={<EventList />} />
        <Route path="/" element={<Home />} />
        <Route path="/event/details/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<EventRegister />} />
        
      </Routes>
    </Router>
  );
}

export default App;
