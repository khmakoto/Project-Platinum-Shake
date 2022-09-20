import { makeStyles, shorthands } from "@fluentui/react-components";

export const usePhotoGridStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    ...shorthands.gap("10px"),
    ...shorthands.padding("30px"),
  },
  photo: {
    backgroundColor: "red",
    height: "50px",
    width: "50px",
  },
  daySection: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap("10px"),
    paddingBottom: "20px",
  },
});
