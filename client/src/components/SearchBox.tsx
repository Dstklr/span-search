import { Box, TextField, Button } from "@mui/material"
import { useState } from "react";

interface SearchBoxProps {
    onSubmitHandler(e: string): void;
}

export const SearchBox = ({ onSubmitHandler }: SearchBoxProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const onChangeHandler = (e: any) => {
        console.log(searchTerm);
        setSearchTerm(e.target.value);
    }

    const onSearchClick = () => {
        onSubmitHandler(searchTerm ?? '');
    }

    return (
        <Box display="flex" justifyItems="center" justifyContent="center" flexDirection="row">
            <Box marginRight="10px" width="100%">
                <TextField size="medium" fullWidth value={searchTerm} onChange={onChangeHandler} id="outlined-search" label="Search field" onSubmit={() => console.log('subbmited')} type="search" />
            </Box>
            <Button onClick={onSearchClick} variant="contained">Search</Button>
        </Box>
    );
}