import React from 'react'
import styled from 'styled-components'
import themeIconLight from '../assets/moon-light-petrol.svg'
import themeIconDark from '../assets/sun-green.svg'

const AppHeader = ({headerName, isDarkTheme, setIsDarkTheme}) => {

    const changeColorTheme = () => {
        let chatBodyClassList = document.body.classList;
        if (chatBodyClassList.contains("darkTheme")) {
            setIsDarkTheme(false);
            chatBodyClassList.remove("darkTheme");
        } else {
            setIsDarkTheme(true);
            chatBodyClassList.add("darkTheme");
        }
    }

    return (
        <HeaderWrapper>
            <Header>
                <StyledUsername>
                    {headerName}
                </StyledUsername>
                <StyledThemeIcon
                    onClick={() => changeColorTheme()}>
                    <img src={isDarkTheme ? themeIconDark : themeIconLight} alt="moon/ sun icon from feathericons.com" />
                    <TooltipTheme>Activate {isDarkTheme ? "light theme":"dark theme"}.</TooltipTheme>
                </StyledThemeIcon>
            </Header>
        </HeaderWrapper>
    )
}

export default AppHeader;

const HeaderWrapper = styled.div`
display: inline;
padding: 10px;
border-bottom: 1px solid var(--structural-elements);
`
const Header = styled.div`
display: flex;
width: 100%;
background: var(--structural-elements);
border-radius: 10px;
padding: 15px;
color: var(--color-accent-light);
font-weight: 700;
justify-content: right;
`

const StyledUsername = styled.div`
padding: 4px 8px 0px 0px;
color: var(--color-accent-light);
font-weight: 700;
`

const StyledThemeIcon = styled.div`
cursor: pointer;
font-weight: 700;
`

const TooltipTheme = styled.div`
position: absolute;
display: inline-block;
font-size: var(--p-small-size);
right: 21px;
top: 45px;
width: 75px;
background: var(--color-accent-light);
color: var(--structural-elements);
padding: 5px;
margin-top: 5px;
border-radius: 5px;
opacity: 0;
transform: scaleY(0);
transform-origin: top;
transition: all 0.1s;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);

${StyledThemeIcon}:hover & {
    opacity: 1;
    transform: scaleY(1);
}
`;