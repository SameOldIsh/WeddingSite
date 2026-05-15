import { useState, useEffect } from 'react';
import './App.css'
import './index.css'
import EnterName from './assets/component/enterName';
import Rsvp from './assets/component/rsvp';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './assets/header/header';
import Container from 'react-bootstrap/Container';
import AdminPage from './assets/component/adminPage';
import Footer from './assets/header/footer';
import FooterImage from './assets/images/woods.png';



function App() {
  const STORAGE_KEY = 'myapp:people'
  const RSVP_STORAGE_KEY = 'myapp:rsvpPeople'
  const defaultPeople = [{ name: 'Alice', food: "", music: "", rsvp: false, id: 1 }, { name: 'Bob', food: "", music: "", rsvp: false, id: 2 }, { name: 'Charlie', food: "", music: "", rsvp: false, id: 3 }, [{ name: 'David', food: "", music: "", rsvp: false, id: 4 }, { name: 'Eve', food: "", music: "", rsvp: false, id: 5 }], [{ name: 'Bianca Rodriguez', food: "", music: "", rsvp: false, id: 6 },{ name: 'Brianna Concepcion', food: "", music: "", rsvp: false, id: 7 }, { name: 'Larissa De La Rosa', food: "", music: "", rsvp: false, id: 8 }, { name: 'AnnaMarie', food: "", music: "", rsvp: false, id: 9 }, { name: 'Carol', food: "", music: "", rsvp: false, id: 10 }, { name: 'Albert', food: "", music: "", rsvp: false, id: 11 }]];
  const defaultRsvpPeople = [];

  const [people, setPeople] = useState(() => {
    try { const raw = localStorage.getItem('myapp:people'); return raw ? JSON.parse(raw) : defaultPeople }
    catch { return defaultPeople }
  })

  const [rsvpPeople, setRsvpPeople] = useState(() => {
    try { const raw = localStorage.getItem('myapp:rsvpPeople'); return raw ? JSON.parse(raw) : defaultRsvpPeople }
    catch { return defaultRsvpPeople }
  });

  useEffect(() => {
    console.log("storing");

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
      const storedPeople = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      console.log(storedPeople);


    }
    catch (e) { console.warn('save failed', e) }
    try {
      console.log(rsvpPeople);
      
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvpPeople));
      const storedRsvpPeople = JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY) || '[]');
      console.log(storedRsvpPeople);
    } catch (e) {
      console.warn('save failed', e)
    }
  }, [])
 
  return (
    <BrowserRouter basename="/WeddingSite">
    <Container className="Main">
      <Header />
      <Routes>
        <Route path='/' element={<EnterName people={people} />} />
        <Route path='/rsvp/:name' element={<Rsvp people={people} setPeople={setPeople} />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      {/* <Footer /> */}
    </Container>
    </BrowserRouter>
  )
}

export default App
