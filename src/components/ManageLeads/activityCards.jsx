import { Box, Card, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import LinearProgress from '@mui/material/LinearProgress'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { startGetActivityList } from "../../actions/ManageLeads/manageLeads";

const ActivityCards = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audio] = useState(new Audio())
  const [progress, setProgress] = useState(0)
  const { state } = location;
  useEffect(() => {
    const formData = {
      phone_num: state.phone_num,
    };
    dispatch(startGetActivityList(formData));
  }, [state.phone_num]);
  const data = useSelector((state) => state.manageLeadsSlice?.callActivityList);

  const audioPlay = (url) => {
    // setId(id)
    // const result=data?.find(ele =>ele.id == id)
    // if (isAudioPlaying  && result.id == id) {
    //   audio.pause()
    //   setIsAudioPlaying(false)
    // } else {
    //   audio.src = recLink
    //   audio.play()
    //   setIsAudioPlaying(true)
    // }
    console.log("url",url)
    window.open(url, '_blank')

  };
  useEffect(() => {
    const updateProgress = () => {
      const duration = audio.duration
      const currentTime = audio.currentTime
      const progress = (currentTime / duration) * 100
      setProgress(progress)
    }

    audio.addEventListener('timeupdate', updateProgress)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [audio])
  console.log("adaddadd",data);
  return (
    <Box sx={{ height: "65vh" }}>
      {data?.map((data) => {
        return (
          <>
            <Card sx={{ width: "100%", borderTop: "1px solid blue", p: 2, mt: 1 }} key={data.id}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography variant="subtitle2" fontWeight={"bold"}>
                  Date:{data.created_at}
                </Typography>
                <Typography variant="subtitle2" fontWeight={"bold"}>
                  Agent:{data.agent_num}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                  Rec:{' '}
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                    <IconButton onClick={() => audioPlay(data.rec_link)}>
                      { <PlayArrowIcon />}
                    </IconButton >
                    {/* <LinearProgress variant="determinate" value={progress} sx={{ width: 100 }} /> */}
                  </Box>
                </Typography>
                <Typography variant="subtitle2">Status:{'  '}{data.call_status}</Typography>
                <Typography variant="subtitle2">Duration:{'  '}{data.duration}</Typography>
                <Typography variant="subtitle2">Method:{'  '}{data.call_method}</Typography>
                <Typography variant="subtitle2">Customer Number:{'  '}{data.customer_num}</Typography>

              </Box>
            </Card>
          </>
        );
      })}
      {
        data?.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1" >No Data Found</Typography>
          </Box>

        )
      }
    </Box>
  );
};

export default ActivityCards;
