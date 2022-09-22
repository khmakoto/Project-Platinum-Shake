import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useNavStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: "inherit",
    boxShadow: `0 0 8px ${tokens.colorBrandShadowAmbient}, 0 14px 28px ${tokens.colorNeutralStroke1}`,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "end",
    minHeight: "60px",
    ...shorthands.padding(0, "10px"),
    position: "sticky",
    top: 0,
  },
});
