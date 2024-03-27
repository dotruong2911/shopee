import SignUp from 'pages/SignUp';
import './App.scss';
import SignIn from 'pages/SignIn/SignIn';
import Home from 'pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import ProductInfo from 'pages/Home/Content/Products/Product/ProductInfo/ProductInfo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/productinfo" element={<ProductInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
