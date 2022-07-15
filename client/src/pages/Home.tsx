import { SpanTable } from "../components/SpanTable";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useState } from "react";
import { fetchSpans } from '../services/api';
import { Span } from "../models/Span";
import { Container, Divider } from "@mui/material";

export const Home = () => {
  const [data, setData] = useState<Span[]>()

  useEffect(() => {
    const fetchTrace = async () => {
      setData(await fetchSpans());
    }
    fetchTrace();
  }, []);

  const onSubmitHandler = async (query: string) => {
    setData(await fetchSpans(query));
  }

  return (<>
    {data && data.length > 0 &&
      (
        <Container maxWidth="xl">
          <h1>Span Dashboard</h1>
          <SearchBox onSubmitHandler={async () => { await onSubmitHandler}} />
          <Divider variant="middle" />
          <SpanTable data={data} />
        </Container>
      )
    }
  </>
  );
}
