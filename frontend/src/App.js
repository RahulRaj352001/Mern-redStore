import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import react from "react";

import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from './component/product/Products.js'
import Search from './component/product/Search.js'
import LoginSignup from "./component/User/LoginSignup";

function App() {
  react.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilnka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />

      <Footer />
    </Router>
  );
}
// const mapStateToProps = (state) => ({ invoices: state.IcmWebReducer });

export default App;
