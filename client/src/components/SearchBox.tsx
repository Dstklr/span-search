import { TextField } from "@mui/material"

export const SearchBox = () => (
    <TextField id="outlined-search" label="Search field" onSubmit={() => console.log('subbmited')} type="search" />
)