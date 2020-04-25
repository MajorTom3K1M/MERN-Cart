import CustomerLogin from "../views/Customers/CustomerLogin"
import ProductList from "../views/Product/ProductList";
import Product from "../views/Product/Product"; 

var mainRoutes = [
    { path: "/", name: "Home", component: ProductList }, 
    { path: "/product/test", name: "Home", component: Product },
    { path: "/customer/login", name: "Home", component: CustomerLogin, navBar: false }
];

export default mainRoutes;
