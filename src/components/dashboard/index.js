/**
 * @author johnworth
 *
 * The dashboard component.
 *
 * @module dashboard
 */
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { useQuery } from "react-query";

import { useTranslation } from "i18n";

import { Grid, Typography, Box } from "@material-ui/core";

import { Skeleton } from "@material-ui/lab";

import ids from "./ids";
import * as constants from "./constants";
import useStyles from "./styles";
import * as fns from "./functions";
import {
    // NewsFeed,
    // EventsFeed,
    RecentlyUsedApps,
    PublicApps,
    RecentAnalyses,
    RunningAnalyses,
    VideosFeed,
    InstantLaunches,
} from "./DashboardSection";

import {
    getDashboard,
    DASHBOARD_QUERY_KEY,
} from "../../serviceFacades/dashboard";

import withErrorAnnouncer from "components/utils/error/withErrorAnnouncer";
import { useUserProfile } from "contexts/userProfile";
import Banner from "./dashboardItem/Banner";

const AppDetailsDrawer = dynamic(() =>
    import("components/apps/details/Drawer")
);
const AnalysesDetailsDrawer = dynamic(() =>
    import("components/analyses/details/Drawer")
);

const DashboardSkeleton = () => {
    const classes = useStyles();
    const [userProfile] = useUserProfile();

    let skellyTypes = [classes.sectionNews, classes.sectionEvents, "", ""];
    if (userProfile?.id) {
        skellyTypes = [
            "",
            "",
            "",
            "",
            classes.sectionNews,
            classes.sectionEvents,
            "",
        ];
    }

    const skellies = skellyTypes.map((extraClass, index) => (
        <div className={clsx(classes.section, extraClass)} key={index}>
            <Skeleton
                variant="rect"
                animation="wave"
                height={50}
                width="100%"
            />
            <div className={classes.sectionItems}>
                <Skeleton
                    variant="rect"
                    animation="wave"
                    height={225}
                    width="100%"
                />
            </div>
        </div>
    ));

    return <>{skellies}</>;
};

const Dashboard = (props) => {
    const { showErrorAnnouncer } = props;
    const classes = useStyles();
    const { t } = useTranslation("dashboard");
    const [userProfile] = useUserProfile();

    const dashboardEl = useRef();
    const [cardWidth, cardHeight, numColumns] = fns.useDashboardSettings({
        dashboardEl,
    });

    const { status, data, error } = useQuery(
        [DASHBOARD_QUERY_KEY, { limit: constants.SECTION_ITEM_LIMIT }],
        getDashboard
    );
    const isLoading = status === "loading";
    const hasErrored = status === "error";

    // Display the error message if an error occurred.
    if (hasErrored) {
        showErrorAnnouncer(t("dashboardInitError", { error: error.message }));
    }

    // State variables.
    const [detailsApp, setDetailsApp] = useState(null);
    const [detailsAnalysis, setDetailsAnalysis] = useState(null);

    let sections = [
        // new NewsFeed(),
        // new EventsFeed(),
        new VideosFeed(),
        new PublicApps(),
    ];

    if (userProfile?.id) {
        sections = [
            new InstantLaunches({ xs: 12 }),
            new RecentAnalyses(),
            new RunningAnalyses(),
            new RecentlyUsedApps(),
            new PublicApps({ xs: 12 }),
            // new NewsFeed(),
            // new EventsFeed(),
            new VideosFeed({ xs: 12 }),
        ];
    }

    const filteredSections = data
        ? sections
              .filter((section) => data.hasOwnProperty(section.kind))
              .filter((section) => {
                  if (section.name && section.name !== "") {
                      return (
                          data[section.kind].hasOwnProperty(section.name) &&
                          data[section.kind][section.name].length > 0
                      );
                  } else if (Array.isArray(data[section.kind])) {
                      return data[section.kind].length > 0;
                  }

                  // If we get here, assume it's an object. Make sure it has properties.
                  return Object.keys(data[section.kind]).length > 0;
              })
        : [];

    let componentContent;

    if (filteredSections.length > 0) {
        componentContent = (
            <Box maxWidth={1024} width={1}>
                <Grid container spacing={3}>
                    {filteredSections.map((section) => {
                        return (
                            <Grid item {...section.gridSizes}>
                                {section.getComponent({
                                    t,
                                    data,
                                    cardWidth,
                                    cardHeight,
                                    numColumns,
                                    showErrorAnnouncer,
                                    setDetailsApp,
                                    setDetailsAnalysis,
                                })}
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        );
    } else {
        componentContent = (
            <Typography color="textSecondary">{t("noContentFound")}</Typography>
        );
    }

    // The base ID for the dashboard.
    const baseId = fns.makeID(ids.ROOT);

    return (
        <div ref={dashboardEl} id={baseId} className={classes.gridRoot}>
            {!userProfile?.id && <Banner />}
            {isLoading ? <DashboardSkeleton /> : componentContent}

            {detailsApp && (
                <AppDetailsDrawer
                    appId={detailsApp.id}
                    systemId={detailsApp.system_id}
                    open={true}
                    baseId={baseId}
                    onClose={() => setDetailsApp(null)}
                    onFavoriteUpdated={detailsApp.onFavoriteUpdated}
                />
            )}
            {detailsAnalysis && (
                <AnalysesDetailsDrawer
                    selectedAnalysis={detailsAnalysis}
                    baseId={baseId}
                    open={detailsAnalysis !== null}
                    onClose={() => setDetailsAnalysis(null)}
                />
            )}
            <div className={classes.footer} />
        </div>
    );
};

export default withErrorAnnouncer(Dashboard);
