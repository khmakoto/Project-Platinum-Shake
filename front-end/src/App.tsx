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

export const App = () => {
  const styles = useAppStyles();

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <FluentProvider className={styles.app} theme={webLightTheme}>
          <Routes>
            <Route path="/" element={<LoginView />} />
            <Route
              path="/photos"
              element={<ProtectedRoute component={PhotosView} />}
            />
          </Routes>
        </FluentProvider>
      </Auth0ProviderWithHistory>
    </Router>
  );
};
