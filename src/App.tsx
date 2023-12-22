import React, { ChangeEvent, useEffect, useState } from "react";

import "./App.css";
import { socket } from "./socket";

import { LeaderBoard } from "./components/LeaderBoard";
import { Box, Container, Tab, Tabs } from "@mui/material";
import Settings from "./components/Settings";
import { useAppContext } from "./context/AppContext";

function App() {
  const { onAddUser } = useAppContext();

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (e: ChangeEvent<{}>, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  useEffect(() => {
    socket.on("userData", onAddUser);

    return () => {
      socket.off("userData", onAddUser);
    };
  }, [onAddUser]);

  return (
    <Box sx={{ padding: 5 }}>
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
        aria-label="navigation tabs"
      >
        <Tab label="Leaderboard" />
        <Tab label="Settings" />
      </Tabs>
      <Container sx={{ padding: 5 }}>
        {currentTabIndex === 0 && <LeaderBoard />}
        {currentTabIndex === 1 && <Settings />}
      </Container>
    </Box>
  );
}

export default App;
