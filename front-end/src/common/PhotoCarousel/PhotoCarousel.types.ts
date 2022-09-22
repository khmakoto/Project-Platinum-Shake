import React from "react";

export type PhotoCarouselProps = {
  src: string;
  togglePhotoCarousel: (
    ev?:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement>
  ) => void;
};
