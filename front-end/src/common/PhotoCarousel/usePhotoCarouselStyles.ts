import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const usePhotoCarouselStyles = makeStyles({
  backdrop: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    display: "flex",
    height: "100vh",
    opacity: 0.85,
    overscrollBehaviorY: "contain",
    position: "fixed",
    top: 0,
    userSelect: "none",
    width: "100vw",
  },
  photoContainer: {
    display: "grid",
    height: "100vh",
    position: "fixed",
    top: 0,
    width: "100vw",
  },
  photo: {
    ...shorthands.margin("auto"),
    maxHeight: "100vh",
    maxWidth: "100%",
  },
  closeButton: {
    color: tokens.colorNeutralForegroundInverted,
    position: "fixed",
    right: "10px",
    top: "10px",

    ":hover": {
      backgroundColor: tokens.colorNeutralForeground2,
      color: tokens.colorNeutralForegroundInvertedHover,
    },

    ":hover:active": {
      backgroundColor: tokens.colorNeutralForeground2Pressed,
      color: tokens.colorNeutralForegroundInvertedPressed,
    },
  },
});
