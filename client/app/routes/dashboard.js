import React from "react";
import Dashboard from '../views/Dashboard';
import * as Icon from 'react-feather';

var dashRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: ({ size, color, props }) => (
            <Icon.BarChart 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    {
        heading: "manage"
    },
    {
        path: "/products",
        name: "Products",
        icon: ({ size, color, props }) => (
            <Icon.Tag 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    {
        path: "/orders",
        name: "Orders",
        icon: ({ size, color, props }) => (
            <Icon.Package 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    { 
        path: "/customers", 
        name: "Customers", 
        icon: ({ size, color, props }) => (
            <Icon.Users 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard 
    },
    {
        path: "/users",
        name: "Users",
        icon: ({ size, color, props }) => (
            <Icon.User 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    { 
        heading: "Settings"
    },
    {
        path: "/settings",
        name: "General Settings",
        icon: ({ size, color, props }) => (
            <Icon.Sliders 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    {
        path: "/settings/menu",
        name: "Menu",
        icon: ({ size, color, props }) => (
            <Icon.Menu 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    {
        path: "/settings/pages",
        name: "Static pages",
        icon: ({ size, color, props }) => (
            <Icon.FileText 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
        component: Dashboard
    },
    {
        path: "/settings/discounts",
        name: "Discount codes",
        icon: ({ size, color, props }) => (
            <Icon.Code 
                size={size || "16px"} 
                color={color || "#000"} 
                {...props}
            />
        ),
    },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;