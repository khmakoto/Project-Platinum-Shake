import React from "react";

export type PhotoCarouselCoordinates = { x: number; y: number };

export type PhotoCarouselProps = {
  imageTarget?: HTMLImageElement;
  targetCoordinates?: PhotoCarouselCoordinates;
  togglePhotoCarousel: (
    ev?:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
  ) => void;
  visible?: boolean;
};
