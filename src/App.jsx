import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import RecipePage from "./components/RecipePage/RecipePage";
import { Provider } from "react-redux";
import store from "./utils/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import ErrorPage from './components/ErrorPage/ErrorPage';


const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Header />
      <Routes>
        <Route 
              path='/'
              element={<Body />}
            />
            <Route 
              path='/recipe/:id'
              element={<RecipePage />}
            />
            <Route
              path='/order-confirmation'
              element={<OrderConfirmation />}
            />
            <Route 
              path="*" 
              element={<ErrorPage />} 
        />   
      </Routes>
      <Footer />
  </Provider>
  </BrowserRouter>
  );
};

export default App;


