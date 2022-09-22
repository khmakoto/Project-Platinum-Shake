import {
  makeStyles,
  tokens,
  webLightTheme,
  FluentProvider,
} from "@fluentui/react-components";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0ProviderWithHistory, ProtectedRoute } from "./auth";
import { LoginView, PhotosView } from "./views";

const useAppStyles = makeStyles({
  app: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

<<<<<<< Updated upstream
=======
/* TODO: Remove this function and replace it with actual photo metadata when we retrieve the images */
function createPhotoArray(size: number): PhotoGridItem[] {
  const result: PhotoGridItem[] = [];
  for (let i = 0; i < size; i++) {
    const num = Math.random() * 1700000000000;
    for (let j = 0; j < Math.random() * 9 + 1; j++) {
      const height = Math.ceil(Math.random() * 900) + 100;
      const width = Math.ceil(Math.random() * 900) + 100;
      result.push({
        date: new Date(num),
        src: `https://via.placeholder.com/${width}x${height}.png`,
      });
    }
  }
  return result;
}

>>>>>>> Stashed changes
export const App = () => {
  const photos = createPhotoArray(50);
  const styles = useAppStyles();

  return (
<<<<<<< Updated upstream
    <Router>
      <Auth0ProviderWithHistory>
        <FluentProvider className={styles.app} theme={webLightTheme}>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/photos" element={<ProtectedRoute component={PhotosView} />} />
          </Routes>
        </FluentProvider>
      </Auth0ProviderWithHistory>
    </Router>
=======
    <FluentProvider className={styles.app} theme={webLightTheme}>
      <Nav />
      <SideNav />
      <PhotoGrid photoItems={photos} />
    </FluentProvider>
>>>>>>> Stashed changes
  );
};
