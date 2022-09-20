import * as React from "react";
import { Button, Tooltip } from "@fluentui/react-components";
import { SettingsRegular } from "@fluentui/react-icons";
import { useNavStyles } from "./useNavStyles";

export const Nav: React.FC<{}> = () => {
  const styles = useNavStyles();

  return (
    <div className={styles.root}>
      <Tooltip content="Settings" relationship="label">
        <Button
          appearance="subtle"
          icon={<SettingsRegular />}
          size="large"
          shape="circular"
        />
      </Tooltip>
    </div>
  );
};
