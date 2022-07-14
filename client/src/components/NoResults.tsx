import styled from "@emotion/styled"

const StyledText = styled.div`
    font-size: 20px;
    border: 1px solid yellow;
`;

export const NoResults = () => (
    <StyledText>Sorry no results, try searching again...</StyledText>
)