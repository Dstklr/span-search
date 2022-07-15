import { Box, TextField, Button } from "@mui/material"
import { useState } from "react";

interface SearchBoxProps {
    onSubmitHandler: (e) => void;
}

export const SearchBox = ({ onSubmitHandler }: SearchBoxProps) => {
    const [searchTerm, setSearchTerm] = useState();

    return (
        <Box>
            <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth id="outlined-search" label="Search field" onSubmit={() => console.log('subbmited')} type="search" />
            <Button onClick={() => onSubmitHandler(searchTerm)} variant="contained">Search</Button>
        </Box>
    );
}