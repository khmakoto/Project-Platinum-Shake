import * as React from "react";
import { mergeClasses, Button, Image } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { Portal } from "@fluentui/react-portal";
import { usePhotoCarouselStyles } from "./usePhotoCarouselStyles";
import type { PhotoCarouselProps } from "./PhotoCarousel.types";

export const PhotoCarousel: React.FC<PhotoCarouselProps> = (props) => {
  const { imageTarget, targetCoordinates, togglePhotoCarousel, visible } =
    props;

  const hiddenPhotoRef = React.useRef<HTMLImageElement>(null);

  const styles = usePhotoCarouselStyles();

  return (
    <Portal>
      {visible && <div className={styles.backdrop}></div>}
      <div
        className={mergeClasses(
          styles.animationWrapper,
          visible && styles.unhideAnimationWrapper
        )}
        style={
          {
            "--left": targetCoordinates ? `${targetCoordinates?.x}px` : "50%",
            "--top": targetCoordinates ? `${targetCoordinates?.y}px` : "50vh",
          } as any
        }
      >
        <Image
          className={mergeClasses(
            styles.photoToAnimate,
            visible && styles.unhidePhotoToAnimate
          )}
          fit="contain"
          ref={hiddenPhotoRef}
          src={imageTarget?.src}
        />
      </div>
      {visible && (
        <Button
          appearance="transparent"
          className={styles.closeButton}
          icon={<DismissRegular />}
          onClick={togglePhotoCarousel}
          shape="circular"
          size="large"
        />
      )}
    </Portal>
  );
};
