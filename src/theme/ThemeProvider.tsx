import { FC, ReactNode } from "react";

import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { themeCreator } from "@theme/base";
import { useSelector } from "@store/index";

const ThemeProviderWrapper: FC<{ children: ReactNode }> = (props) => {
  const themeName = useSelector((state) => state.theme.themeName);
  const theme = themeCreator(themeName);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
