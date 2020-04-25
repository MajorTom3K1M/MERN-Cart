import React from "react";
import Dashboard from '../views/Dashboard/Dashboard';
import Products from '../views/Products/Products';
import ProductCreate from '../views/Products/ProductsCreate';
import Orders from '../views/Orders/Orders';
import OrderCreate from '../views/Orders/OrderCreate';
import Customers from '../views/Customers/Customers';
import Users from '../views/Users/Users';
import UserCreate from '../views/Users/UserCreate';
import GeneralSetting from '../views/Settings/GeneralSettings';
import Menu from '../views/Settings/Menu';
import StaticPages from '../views/Settings/StaticPages';
import CreateStaticPage from '../views/Settings/CreateStaticPage';
import DiscountCodes from '../views/Settings/DiscountCodes';
import CreateDiscountCode from '../views/Settings/CreateDiscountCode';

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
        addon: true,
        addonPath: "/products/new",
        component: Products
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
        addon: true,
        addonPath: "/orders/new",
        component: Orders
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
        component: Customers 
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
        addon: true,
        addonPath: "/users/new",
        component: Users
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
        component: GeneralSetting
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
        component: Menu
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
        component: StaticPages
    },
    {
        path: "/settings/pages/new",
        subPath: true,
        name: "New Pages",
        component: CreateStaticPage
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
        component: DiscountCodes
    },
    {
        path: "/settings/discount/new",
        subPath: true,
        name: "New Discount",
        component: CreateDiscountCode
    },
    { isAddon: true, addonPath: "/products/new", addonComponent: ProductCreate },
    { isAddon: true, addonPath: "/orders/new", addonComponent: OrderCreate },
    { isAddon: true, addonPath: "/users/new", addonComponent: UserCreate },
    // { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;