import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import { Button, Section, Box } from "../components/elements";
import data from "../data/master/sidebar.json";
import { Logo } from "../components";
import datas from "../data/master/header.json";

export default function Sidebar() {
  const { drawer, toggleDrawer } = useContext(DrawerContext);

  return (
    <>
    <Section as="div" className="mc-sidebar-container">
      <Section as="aside" className={`mc-sidebar thin-scrolling ${drawer ? "active" : ""}`}>
        {datas && datas.logo && (
          <Logo
            src={datas.logo.src}
            alt={datas.logo.alt}
            name={datas.logo.name}
            href={datas.logo.path}
          />
        )}


        {/* <Box className="mc-header-group">
          <Box className="mc-header-left">
            <Button
              icon={datas?.search.icon}
              className="mc-header-icon search"
              onClick={() => setSearch("show")}
            />
          </Box>
        </Box> */}
        <MultipleMenu data={data?.navs} />
        <Logout data={data?.button} />
      </Section>
    </Section>
{/* 
  <Button

    icon={drawer ? "menu_open" : "menu"}
    className="mc-sidebar-toggle-button"
    onClick={toggleDrawer}
  /> */}
  </>
  );
}






// import React, { useContext, useState } from "react";
// import { MultipleMenu, Logout } from "../components/sidebar";
// import { DrawerContext } from "../context/Drawer";
// import { Button, Section, Box } from "../components/elements";
// import data from "../data/master/sidebar.json";
// import { Logo } from "../components";
// import datas from "../data/master/header.json";

// export default function Sidebar() {
//   const { drawer, toggleDrawer } = useContext(DrawerContext);
//   const [search, setSearch] = useState("");
//   return (
// //   <Section as="header" className={`mc-header ${scroll}`}>
// //       <Logo
// //         src={data?.logo.src}
// //         alt={data?.logo.alt}
// //         name={data?.logo.name}
// //         href={data?.logo.path}
// //       />
// //       <Box className="mc-header-group">
// //         <Box className="mc-header-left">
// //           <Button
// //             icon={data?.search.icon}
// //             className="mc-header-icon search"
// //             onClick={() => setSearch("show")}
// //           />
// //           <Button
// //             icon={drawer ? "menu_open" : "menu"}
// //             className="mc-header-icon toggle"
// //             onClick={toggleDrawer}
// //           />
// //           </Box>
// // </Box>
// // </Section>
//     <Section as="aside"
//       className={`mc-sidebar thin-scrolling ${drawer ? "active" : ""}`}
//     >
// {datas && datas.logo && (
//   <Logo
//     src={datas.logo.src}
//     alt={datas.logo.alt}
//     name={datas.logo.name}
//     href={datas.logo.path}
//   />
// )}

//        <Box className="mc-header-group">
//         <Box className="mc-header-left">
//           <Button
//             icon={datas?.search.icon}
//             className="mc-header-icon search"
//             onClick={() => setSearch("show")}
//           />
//           <Button
//             icon={drawer ? "menu_open" : "menu"}
//             className="mc-header-icon toggle"
//             onClick={toggleDrawer}
//           />
//           </Box>
// </Box> 
//       <MultipleMenu data={data?.navs} />
//       <Logout data={data?.button} />
//     </Section>
//   );
// }
