import SideNavBar from "../Components/SideNavBar";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";

function Ledger() {
  return (
    <>
    <NavBar />
      <Box height={30}/>
      <Box sx={{ display: "flex" }}>
        <SideNavBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Ledger</h1>
        </Box>
      </Box>
    </>
  );
}
export default Ledger;
