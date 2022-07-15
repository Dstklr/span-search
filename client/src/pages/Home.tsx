import { SpanTable } from "../components/SpanTable";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useState } from "react";
import { fetchSpans } from '../services/api';
import { Span } from "../models/Span";
import { Container, Divider } from "@mui/material";
import { NoResults } from '../components/NoResults';

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

  return (
    (
      <Container maxWidth="xl">
        <h1>Span Dashboard</h1>
        <SearchBox onSubmitHandler={onSubmitHandler} />
        <Divider variant="middle" />
        {data && data.length > 0 ? <SpanTable data={data} /> : <NoResults />}
      </Container>
    )
  );
}
