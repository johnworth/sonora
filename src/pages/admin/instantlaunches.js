import React from "react";

import { useUserProfile } from "contexts/userProfile";

import { Tabs, Tab } from "@material-ui/core";

import InstantLaunchList from "components/instantlaunches/admin/InstantLaunchList";
import QuickLaunchList from "components/instantlaunches/admin/QuickLaunchList";
import NotAuthorized from "components/utils/error/NotAuthorized";
import { useTranslation } from "i18n";

export default function InstantLaunchesAdmin() {
    const profile = useUserProfile()[0];
    const { t } = useTranslation("instantlaunches");
    const [tabValue, setTabValue] = React.useState(0);

    if (!profile?.admin) {
        return <NotAuthorized />;
    } else {
        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };
        return (
            <>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label={t("create")} />
                    <Tab label={t("update")} />
                    <Tab label={t("updateDataMapping")} />
                </Tabs>

                <div hidden={tabValue !== 0}>
                    <InstantLaunchList />
                </div>

                <div hidden={tabValue !== 1}>
                    <QuickLaunchList />
                </div>

                <div hidden={tabValue !== 2}>Coming Soon!</div>
            </>
        );
    }
}

InstantLaunchesAdmin.getInitialProps = async () => ({
    namespacesRequired: ["instantlaunches"],
});