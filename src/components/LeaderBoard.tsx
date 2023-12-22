import { Box, Card, Container, Typography } from "@mui/material";
import React from "react";

import UserCard from "./UserCard";
import { useAppContext } from "../context/AppContext";

export function LeaderBoard() {
  const { userList } = useAppContext();
  return (
    <Container>
      <Card
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Box sx={{ width: 70 }}></Box>
          <Box sx={{ flex: 1 }}>
            {" "}
            <Typography>Username</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {" "}
            <Typography>Email</Typography>
          </Box>
          <Box sx={{ width: 70 }}>
            {" "}
            <Typography>Score</Typography>
          </Box>
          <Box sx={{ width: 70 }}></Box>
        </Box>
      </Card>
      {userList.map((user, index) => (
        <UserCard
          key={user.userId}
          userInfo={user}
          last={index === userList.length - 1}
        />
      ))}
    </Container>
  );
}
