import { Box, Slider, Typography } from "@mui/material";

import { useAppContext } from "../context/AppContext";

function Settings() {
  const { displayUserCount, setDisplayUserCount } = useAppContext();
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setDisplayUserCount(newValue as number);
  };

  return (
    <Box>
      <Typography id="limit-slider" gutterBottom>
        Limit
      </Typography>
      <Box>
        <Slider
          value={displayUserCount}
          onChange={handleSliderChange}
          aria-labelledby="limit-slider"
          min={1}
          max={20}
          size="medium"
          valueLabelDisplay="on"
        />
      </Box>
    </Box>
  );
}

export default Settings;
