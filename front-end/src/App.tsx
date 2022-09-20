import React from "react";
import {
  makeStyles,
  tokens,
  webLightTheme,
  FluentProvider,
} from "@fluentui/react-components";
import { Nav } from "./common";

const useAppStyles = makeStyles({
  app: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const App = () => {
  const styles = useAppStyles();

  return (
    <FluentProvider className={styles.app} theme={webLightTheme}>
      <Nav />
    </FluentProvider>
  );
};
