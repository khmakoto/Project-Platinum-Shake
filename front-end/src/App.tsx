import React from "react";
import {
  makeStyles,
  tokens,
  webLightTheme,
  FluentProvider,
} from "@fluentui/react-components";
import { Nav, PhotoGrid } from "./common";
import type { PhotoGridItem } from "./common";

const useAppStyles = makeStyles({
  app: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

/* TODO: Remove this function and replace it with actual photo metadata when we retrieve the images */
function createPhotoArray(size: number): PhotoGridItem[] {
  const result: PhotoGridItem[] = [];
  for (let i = 0; i < size; i++) {
    const num = Math.random() * 1700000000000;
    for (let j = 0; j < Math.random() * 9 + 1; j++) {
      result.push({
        date: new Date(num),
        src: "https://fabricweb.azureedge.net/fabric-website/placeholders/300x300.png",
      });
    }
  }
  return result;
}

export const App = () => {
  const styles = useAppStyles();

  return (
    <FluentProvider className={styles.app} theme={webLightTheme}>
      <Nav />
      <PhotoGrid photoItems={createPhotoArray(50)} />
    </FluentProvider>
  );
};
