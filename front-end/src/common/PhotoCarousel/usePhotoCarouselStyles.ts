import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const usePhotoCarouselStyles = makeStyles({
  backdrop: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    display: "flex",
    height: "100vh",
    left: 0,
    opacity: 0.85,
    overscrollBehaviorY: "contain",
    position: "fixed",
    top: 0,
    userSelect: "none",
    width: "100vw",
    zIndex: 2,
  },
  animationWrapper: {
    display: "grid",
    left: 0,
    height: 0,
    position: "fixed",
    top: 0,
    width: 0,
    zIndex: 2,
  },
  photoToAnimate: {
    left: 0,
    maxHeight: 0,
    maxWidth: 0,
    marginLeft: "var(--left)",
    marginTop: "var(--top)",
    position: "fixed",
    top: 0,
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.33, 0, 0.67, 1)",
    transitionProperty: "max-height, max-width, margin-left, margin-top",
  },
  unhideAnimationWrapper: {
    height: "100vh",
    width: "100vw",
  },
  unhidePhotoToAnimate: {
    ...shorthands.margin(0),
    maxHeight: "100vh",
    maxWidth: "100%",
  },
  closeButton: {
    color: tokens.colorNeutralForegroundInverted,
    position: "fixed",
    right: "10px",
    top: "10px",
    zIndex: 2,

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
