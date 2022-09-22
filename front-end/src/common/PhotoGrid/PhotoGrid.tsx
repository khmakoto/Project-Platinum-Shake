import * as React from "react";
import { Escape } from "@fluentui/keyboard-keys";
import { Image, Title3 } from "@fluentui/react-components";
import { PhotoCarousel } from "../PhotoCarousel";
import { usePhotoGridStyles } from "./usePhotoGridStyles";
import type { PhotoCarouselCoordinates } from "../PhotoCarousel";
import type { PhotoGridItem, PhotoGridProps } from "./PhotoGrid.types";

const sortPhotos = (a: PhotoGridItem, b: PhotoGridItem): number => {
  return a.date.getTime() < b.date.getTime()
    ? 1
    : a.date.getTime() === b.date.getTime()
    ? 0
    : -1;
};

const localeDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};

export const PhotoGrid: React.FC<PhotoGridProps> = (props) => {
  const [photoCarouselTargetElement, setPhotoCarouselTargetElement] =
    React.useState<HTMLImageElement | null>(null);
  const [
    photoCarouselTargetMouseCoordinates,
    setPhotoCarouselTargetMouseCoordinates,
  ] = React.useState<PhotoCarouselCoordinates>();
  const [showPhotoCarousel, setShowPhotoCarousel] = React.useState(false);

  const styles = usePhotoGridStyles();

  const onEscapePhotoCarousel = React.useCallback((ev: KeyboardEvent) => {
    if (ev.key === Escape) {
      // setTimeout(() => {
      setShowPhotoCarousel(false);
      window.removeEventListener("keydown", onEscapePhotoCarousel);
      // }, 200);
    }
  }, []);

  const togglePhotoCarousel = React.useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
      if (showPhotoCarousel) {
        setShowPhotoCarousel(false);
        window.removeEventListener("keydown", onEscapePhotoCarousel);
      } else if (ev) {
        const target = ev.target as HTMLImageElement;
        setPhotoCarouselTargetElement(target);
        setPhotoCarouselTargetMouseCoordinates({
          x: ev.clientX,
          y: ev.clientY,
        });
        setTimeout(() => {
          window.addEventListener("keydown", onEscapePhotoCarousel);
          setShowPhotoCarousel(true);
        }, 300);
      }
    },
    [onEscapePhotoCarousel, showPhotoCarousel]
  );

  const photoItems = props.photoItems;
  photoItems.sort(sortPhotos);

  const renderPhotos = React.useCallback((): React.ReactNode => {
    const photoGrid: JSX.Element[] = [];
    let currentSection: JSX.Element[] = [];
    let currentDate;
    let daySectionCount = 0;
    let photoCount = 0;

    for (const photo of photoItems) {
      if (currentDate === undefined) {
        currentDate = photo.date;
        photoGrid.push(
          <Title3
            key={
              photo.date.toLocaleDateString(undefined, localeDateOptions) +
              "-label"
            }
          >
            {photo.date.toLocaleDateString(undefined, localeDateOptions)}
          </Title3>
        );
      } else if (currentDate.getDate() !== photo.date.getDate()) {
        currentDate = photo.date;
        photoGrid.push(
          <div
            key={`daySection${daySectionCount++}`}
            className={styles.daySection}
          >
            {currentSection}
          </div>
        );
        currentSection = [];
        photoGrid.push(
          <Title3
            key={
              photo.date.toLocaleDateString(undefined, localeDateOptions) +
              "-label"
            }
          >
            {photo.date.toLocaleDateString(undefined, localeDateOptions)}
          </Title3>
        );
      }

      currentSection.push(
        <div
          className={styles.photoContainer}
          key={`photoContainer${photoCount}`}
        >
          <Image
            className={styles.photo}
            key={`photo${photoCount++}`}
            onClick={togglePhotoCarousel}
            shadow
            src={photo.src}
          />
        </div>
      );
    }

    photoGrid.push(
      <div key={`daySection${daySectionCount++}`} className={styles.daySection}>
        {currentSection}
      </div>
    );
    return photoGrid;
  }, [
    photoItems,
    styles.daySection,
    styles.photo,
    styles.photoContainer,
    togglePhotoCarousel,
  ]);

  return (
    <div className={styles.root}>
      {renderPhotos()}

      <PhotoCarousel
        imageTarget={
          photoCarouselTargetElement ? photoCarouselTargetElement : undefined
        }
        targetCoordinates={photoCarouselTargetMouseCoordinates}
        togglePhotoCarousel={togglePhotoCarousel}
        visible={showPhotoCarousel}
      />
    </div>
  );
};
