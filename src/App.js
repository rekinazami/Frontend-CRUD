import {BrowserRouter, Routes, Route} from "react-router-dom";
import HarianList from "./components/HarianList";
import AddHarian from "./components/AddHarian";
import EditHarian from "./components/EditHarian";

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HarianList/>}/>
          <Route path="/add" element={<AddHarian/>}/>
          <Route path="/edit/:id" element={<EditHarian/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
