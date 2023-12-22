import React, { useEffect, useState } from "react";
import { UserData } from "../types/types";
import { Box, Card, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "../context/AppContext";

function UserCard({ userInfo, last }: { userInfo: UserData; last: boolean }) {
  // const [isNewUser, setIsNewUser] = useState(true);
  const { onDelete, prevUsers, addPrevUser } = useAppContext();

  const isUserNew = !prevUsers.some((user) => user.userId === userInfo.userId);

  // useState to manage the animation state
  const [isNewUser, setIsNewUser] = useState(isUserNew);

  useEffect(() => {
    if (isNewUser) {
      // Add user to prevUsers if new
      addPrevUser(userInfo);

      const timer = setTimeout(() => {
        setIsNewUser(false); // Reset the state after 1 second
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isNewUser, userInfo, addPrevUser]);

  const cardStyle = () => {
    if (last) {
      return {
        borderTopLeftRadius: "0px",
        borderRightRadius: "0px",
        height: 60,
      };
    } else {
      return {
        borderRadius: "0px",
        height: 60,
      };
    }
  };
  return (
    <Card className={isNewUser ? "new-user-fade" : ""} style={cardStyle()}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box sx={{ width: 70 }}>
          <img
            style={{ width: 40, height: 40 }}
            src={userInfo.avatar}
            alt={userInfo.username}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          {" "}
          <Typography>{userInfo.username}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          {" "}
          <Typography>{userInfo.email}</Typography>
        </Box>
        <Box sx={{ width: 70 }}>
          {" "}
          <Typography>{userInfo.score}</Typography>
        </Box>
        <Box sx={{ width: 70 }}>
          <IconButton
            onClick={() => {
              onDelete(userInfo.userId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default UserCard;
