import { SpanTable } from "../components/SpanTable";
import { SearchBox } from "../components/SearchBox";
import { useEffect, useState } from "react";
import { fetchSpans } from '../services/api';
import { Span } from "../models/Span";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [data, setData] = useState<Span[]>()

  useEffect(() => {
    const fetchTrace = async () => {
      setData(await fetchSpans());
    }
    fetchTrace();
  }, []);

  return (<>
    {data && data.length > 0 &&
      (
        <>
          <SearchBox />
          <SpanTable data={data} />
        </>
      )
    }
  </>
  );
}
