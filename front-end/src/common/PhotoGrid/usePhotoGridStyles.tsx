import { makeStyles, shorthands } from "@fluentui/react-components";

export const usePhotoGridStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    ...shorthands.gap("10px"),
    marginLeft: "250px",
    ...shorthands.padding("30px"),
    width: "calc(100% - 250px)",
  },
  daySection: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap("10px"),
    paddingBottom: "20px",
    overflowX: "hidden",
    width: "100%",

    "::after": {
      content: "''",
      flexGrow: 999999999,
      height: 0,
      minWidth: "200px",
    },
  },
  photoContainer: {
    flexGrow: 1,
    maxHeight: "200px",
    position: "relative",
  },
  photo: {
    cursor: "pointer",
    height: "200px",
    maxWidth: "100%",
    minWidth: "100%",
    objectFit: "cover",
  },
});
