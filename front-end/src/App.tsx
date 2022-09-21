import {
  makeStyles,
  tokens,
  webLightTheme,
  FluentProvider,
} from "@fluentui/react-components";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./auth";
import { LoginView, PhotosView } from "./views";

const useAppStyles = makeStyles({
  app: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const App = () => {
  const styles = useAppStyles();

  return (
    <FluentProvider className={styles.app} theme={webLightTheme}>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/photos" element={<ProtectedRoute component={PhotosView} />} />
      </Routes>
    </FluentProvider>
  );
};
