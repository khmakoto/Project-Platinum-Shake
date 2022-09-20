import * as React from "react";
import { Image, Title3 } from "@fluentui/react-components";
import { usePhotoGridStyles } from "./usePhotoGridStyles";
import type { PhotoGridItem, PhotoGridProps } from "./PhotoGrid.types";

const sortPhotos = (a: PhotoGridItem, b: PhotoGridItem): number => {
  return a.date < b.date ? 1 : -1;
};

const localeDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};

export const PhotoGrid: React.FC<PhotoGridProps> = (props) => {
  const styles = usePhotoGridStyles();

  const photoItems = props.photoItems;
  photoItems.sort(sortPhotos);

  const renderPhotos = React.useCallback((): React.ReactNode => {
    const photoGrid: JSX.Element[] = [];
    let currentSection: JSX.Element[] = [];
    let currentDate;

    for (const photo of photoItems) {
      if (currentDate === undefined) {
        currentDate = photo.date;
        photoGrid.push(
          <Title3>
            {photo.date.toLocaleDateString(undefined, localeDateOptions)}
          </Title3>
        );
      } else if (currentDate.getDate() !== photo.date.getDate()) {
        currentDate = photo.date;
        photoGrid.push(
          <div className={styles.daySection}>{currentSection}</div>
        );
        currentSection = [];
        photoGrid.push(
          <Title3>
            {photo.date.toLocaleDateString(undefined, localeDateOptions)}
          </Title3>
        );
      }

      currentSection.push(<Image shadow src={photo.src} />);
    }

    photoGrid.push(<div className={styles.daySection}>{currentSection}</div>);

    return photoGrid;
  }, [photoItems, styles.daySection]);

  return <div className={styles.root}>{renderPhotos()}</div>;
};
