import Dashboard from "../layouts/Dashboard";
import HomePage from "../layouts/HomePage"; 

import AdminLogin from "../views/Admin/AdminLogin"
import AdminSetup from "../views/Admin/AdminSetup"

var indexRoutes = [
    { 
        path: "/admin/login", 
        name: "AdminLogin", 
        component: AdminLogin,
        restrictType: "setup"
    },
    { 
        path: "/admin/setup", 
        name: "AdminSetup", 
        component: AdminSetup,
        restrictType: "setup"
    },
    { 
        path: "/admin", 
        name: "Admin", 
        component: Dashboard,
        restrictType: "setup"
    },
    { 
        path: "/", 
        name: "Home", 
        component: HomePage 
    } 
];

export default indexRoutes;
