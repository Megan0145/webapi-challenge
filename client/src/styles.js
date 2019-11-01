import styled from 'styled-components';

export const StyledAppContainer = styled.div`
    width: 100vw;
    background-color: whitesmoke;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const StyledNav = styled.nav`
    width: 100%;
    background-color: #e3e3e3;
    display: flex;
    justify-content: center;
    padding: 1.5rem 0;
    a {
        text-decoration: none;
        margin: 0 1rem;
        font-size: 1.8rem;
        color: grey;
    }
`;

export const StyledProjectCard = styled.div`
    background-color: #e4e7ff;
    padding: 2rem;
    margin: 3vh 0;
    width: 80%;
    color: grey;
    box-shadow: 5px 5px 15px grey;
    border-radius: 15px;
    h2 {
        color: #636363;
    }
    button {
        padding: 1rem;
        border-radius: 15px;
        border: none;
        margin-right: 1rem;
        box-shadow: 5px 5px 15px grey;
        font-size: 1rem;
        cursor: pointer;
    }
`;
export const StyledDashboard = styled.div`
    width: 100%;
    display: flex;
    min-height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;