import React, { useState } from "react";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { fetchSpan } from '../services/api';
import { Span } from "../models/Span";
import axios from "axios";
import { useParams } from "react-router";

const SpanDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState<Span>();

    useEffect(() => {
        const fetchTrace = async () => {
            setData(await fetchSpan(id ?? ''));
        }
        fetchTrace();
    }, [id]);

    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            {data && Object.entries(data).map(([key, value]) => (
              <ListItem>
                <ListItemText primary={key} />
                <ListItemText primary={value} />
              </ListItem>
            ))}
          </List>
      </Box>
    );
}

export const MemoSpanDetails = React.memo(SpanDetails);