import React, { useState } from "react";
import { useEffect } from "react";
import { fetchSpan } from '../services/api';
import { Span } from "../models/Span";
import { useParams } from "react-router";
import { Divider, Button, Box, ListItemText, ListItem, List } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SpanViewer = () => {
  const { id } = useParams();
  const [data, setData] = useState<Span>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrace = async () => {
      setData(await fetchSpan(id ?? ''));
    }
    fetchTrace();
  }, [id]);

  const onClickHandler = () => navigate(`/`);

  return (
    <>
      <Button onClick={onClickHandler} variant="outlined">Back</Button><Box textAlign="center" fontWeight="fontWeightBold" fontSize={40}>Span Viewer</Box>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          {data && Object.entries(data).map(([key, value]) => (
            <React.Fragment key={key}>
              <ListItem>
                <Box marginRight={10} component="span">
                  <ListItemText primary={key} />
                </Box>
                <Box component="span">
                  <ListItemText primary={value} />
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
}

export const MemoSpanViewer = React.memo(SpanViewer);