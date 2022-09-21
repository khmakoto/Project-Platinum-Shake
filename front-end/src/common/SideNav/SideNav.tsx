import * as React from "react";
import { Tab, TabList } from "@fluentui/react-components";
import {
  CollectionsRegular,
  ImageMultipleRegular,
} from "@fluentui/react-icons";
import { useSideNavStyles } from "./useSideNavStyles";

export const SideNav: React.FC<{}> = () => {
  const styles = useSideNavStyles();

  return (
    <div className={styles.root}>
      <TabList appearance="subtle" defaultSelectedValue="photos" vertical>
        <Tab
          className={styles.tab}
          content={{ className: styles.tabContent }}
          icon={{
            className: styles.tabIcon,
            children: <ImageMultipleRegular />,
          }}
          value="photos"
        >
          Photos
        </Tab>
        <Tab
          className={styles.tab}
          content={{ className: styles.tabContent }}
          icon={{ className: styles.tabIcon, children: <CollectionsRegular /> }}
          value="albums"
        >
          Albums
        </Tab>
      </TabList>
    </div>
  );
};
