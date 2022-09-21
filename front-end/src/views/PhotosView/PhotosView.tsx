import { Nav, PhotoGrid, SideNav } from "../../common";
import type { PhotoGridItem } from "../../common";

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

export const PhotosView = () => {
  return (
    <div>
      <Nav />
      <SideNav />
      <PhotoGrid photoItems={createPhotoArray(50)} />
    </div>
  );
}