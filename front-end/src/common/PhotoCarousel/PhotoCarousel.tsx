import * as React from "react";
import { Button, Image } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { Portal } from "@fluentui/react-portal";
import { usePhotoCarouselStyles } from "./usePhotoCarouselStyles";
import type { PhotoCarouselProps } from "./PhotoCarousel.types";

export const PhotoCarousel: React.FC<PhotoCarouselProps> = (props) => {
  const styles = usePhotoCarouselStyles();

  const { src, togglePhotoCarousel } = props;

  return (
    <Portal>
      <div className={styles.backdrop}></div>
      <div className={styles.photoContainer}>
        <Image className={styles.photo} fit="contain" src={src} />
      </div>
      <Button
        appearance="transparent"
        className={styles.closeButton}
        icon={<DismissRegular />}
        onClick={togglePhotoCarousel}
        shape="circular"
        size="large"
      />
    </Portal>
  );
};
