import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  
  return (
    <Provider store={store}>
       <Header />
       <Body />
       <Footer />
    </Provider>
  )
}

export default App
