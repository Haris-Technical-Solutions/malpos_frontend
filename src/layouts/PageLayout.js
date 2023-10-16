import React from "react";
import Main from "./Mian";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { DrawerProvider } from "../context/Drawer";
import data from "../data/master/header.json";
import {
      ProfileDropdown } from "../components/header";

export default function PageLayout({ children }) {

    const location = useLocation();

    return (
        <DrawerProvider>
            <Header />
            <Sidebar />
            <Main>
                <>

                {/* {<ProfileDropdown
             name={data.profile.name}
             image={data.profile.image}
             username={data.profile.username}
             dropdown={data.profile.dropdown}
      />} */}
                    { children }
                    {/* {location.pathname !== "/message" } */}
                </>
            </Main>
        </DrawerProvider>
    )
}
// ? <Footer /> : ""