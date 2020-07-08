import CustomerLogin from "../views/Customers/CustomerLogin"
import CustomerAccount from "../views/Customers/CustomerAccount"
import ProductList from "../views/Product/ProductList";
import Product from "../views/Product/Product"; 
import AdminSetup from "../views/Admin/AdminSetup"
import AdminLogin from "../views/Admin/AdminLogin"

var mainRoutes = [
    { 
        path: "/:page([0-9]*)?", 
        name: "Home", 
        component: ProductList,
        navBar: true,
    }, 
    { 
        path: "/product/:id", 
        name: "Product", 
        component: Product,
        navBar: true , 
    },
    { 
        path: "/customer/login", 
        name: "Login", 
        component: CustomerLogin, 
        navBar: false,
        auth: true 
    },
    { 
        path: "/customer/account", 
        name: "Account", 
        component: CustomerAccount, 
        navBar: false,
        protected: true 
    }
];

export default mainRoutes;
