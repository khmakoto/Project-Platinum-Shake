import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useSideNavStyles = makeStyles({
  root: {
    boxShadow: `0px 4px 8px ${tokens.colorBrandShadowAmbient}, 0 14px 28px ${tokens.colorNeutralStroke1}`,
    boxSizing: "border-box",
    height: "calc(100vh - 60px)",
    position: "fixed",
    ...shorthands.padding("30px", "10px"),
    top: "60px",
    width: "250px",
  },
  tab: {
    columnGap: tokens.spacingHorizontalL,
  },
  tabContent: {
    fontSize: tokens.fontSizeBase400,
  },
  tabIcon: {
    fontSize: tokens.fontSizeBase600,
    height: "28px",
    width: "28px",
  },
});
