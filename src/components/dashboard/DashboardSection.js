import React, { useState } from "react";
import clsx from "clsx";

import {
    Avatar,
    Button,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    useTheme,
} from "@material-ui/core";

import getItem from "./dashboardItem";

import useStyles from "./styles";
import * as fns from "./functions";
import * as constants from "./constants";
import ids from "./ids";
import { useTranslation } from "i18n";

const DashboardSection = ({
    name,
    kind,
    items,
    id,
    section,
    cardWidth,
    cardHeight,
    limit,
    numColumns,
    showErrorAnnouncer,
    setDetailsApp,
    setDetailsAnalysis,
}) => {
    const classes = useStyles();
    const { t } = useTranslation("dashboard");
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();

    const isNewsSection = section === constants.SECTION_NEWS;
    const isEventsSection = section === constants.SECTION_EVENTS;

    if (!limit) {
        limit = numColumns;
    }

    const displayShowMore = limit < items.length || expanded;

    const itemComponent = (item, index) =>
        getItem({
            kind,
            section,
            content: item,
            height: cardHeight,
            width: cardWidth,
            classes,
            showErrorAnnouncer,
            setDetailsApp,
            setDetailsAnalysis,
        }).component(index);

    const uncollapsed = items.slice(0, limit).map(itemComponent);
    const collapsible = items.slice(limit).map(itemComponent);

    return (
        <div
            className={clsx(
                classes.section,
                isNewsSection && classes.sectionNews,
                isEventsSection && classes.sectionEvents
            )}
            id={id}
        >
            <Typography
                variant="h6"
                style={{
                    color: theme.palette.info.main,
                }}
            >
                {name}
            </Typography>
            <Divider
                style={{
                    margin: 0,
                    color: theme.palette.info.main,
                }}
            />
            <div className={classes.sectionItems}>{uncollapsed}</div>
            <Collapse in={expanded}>
                <div className={classes.sectionItems}>{collapsible}</div>
            </Collapse>
            {displayShowMore && (
                <Button
                    onClick={() => setExpanded(!expanded)}
                    className={classes.showMoreBtn}
                    color="primary"
                >
                    <Typography variant="button" display="block">
                        {expanded ? t("showFewer") : t("showMore")}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

// DashboardILSection is the part of the dashboard that contains the listing of instant
// instant launches that are available to the users on log in.
const DashboardILSection = ({ name, items, id, showErrorAnnouncer }) => {
    const classes = useStyles();
    const theme = useTheme();
    //const { t } = useTranslation("dashboard");

    return (
        <div className={classes.section} id={id}>
            <Typography
                variant="h6"
                style={{
                    color: theme.palette.info.main,
                }}
            >
                {name}
            </Typography>

            <List className={classes.sectionList}>
                {items.map((item) => {
                    return (
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar className={classes.sectionAvatar}>
                                    IL
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={item.app_name}
                                secondary={item.app_description}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};

class SectionBase {
    constructor(kind, name, labelName, idBase) {
        this.kind = kind;
        this.name = name;
        this.label = labelName;
        this.id = fns.makeID(idBase);
    }

    getComponent({
        t,
        cardWidth,
        cardHeight,
        data,
        showDivider,
        numColumns,
        limit,
        showErrorAnnouncer,
        setDetailsApp,
        setDetailsAnalysis,
    }) {
        const sorted = data[this.kind][this.name].sort((first, second) => {
            const firstParsed = Date.parse(first.date_added);
            const secondParsed = Date.parse(second.date_added);

            let retval;

            // The return values are reversed so we get reverse chronological order.
            if (firstParsed < secondParsed) {
                retval = 1;
            } else if (firstParsed > secondParsed) {
                retval = -1;
            } else {
                retval = 0;
            }

            return retval;
        });
        return (
            <DashboardSection
                id={this.id}
                kind={this.kind}
                key={`${this.kind}-${this.name}`}
                items={sorted}
                name={t(this.label)}
                section={this.name}
                showDivider={showDivider}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                numColumns={numColumns}
                limit={limit}
                showErrorAnnouncer={showErrorAnnouncer}
                setDetailsApp={setDetailsApp}
                setDetailsAnalysis={setDetailsAnalysis}
            />
        );
    }
}

export class RecentAnalyses extends SectionBase {
    constructor() {
        super(
            constants.KIND_ANALYSES,
            constants.SECTION_RECENT,
            "recentAnalyses",
            ids.SECTION_RECENT_ANALYSES
        );
    }
}

export class RunningAnalyses extends SectionBase {
    constructor() {
        super(
            constants.KIND_ANALYSES,
            constants.SECTION_RUNNING,
            "runningAnalyses",
            ids.SECTION_RECENT_ANALYSES
        );
    }
}

export class RecentlyAddedApps extends SectionBase {
    constructor() {
        super(
            constants.KIND_APPS,
            constants.SECTION_RECENTLY_ADDED,
            "recentlyAddedApps",
            ids.SECTION_RECENTLY_ADDED_APPS
        );
    }
}

export class RecentlyUsedApps extends SectionBase {
    constructor() {
        super(
            constants.KIND_APPS,
            constants.SECTION_RECENTLY_USED,
            "recentlyUsedApps",
            ids.SECTION_RECENTLY_USED_APPS
        );
    }
}

export class PublicApps extends SectionBase {
    constructor() {
        super(
            constants.KIND_APPS,
            constants.SECTION_PUBLIC,
            "publicApps",
            ids.SECTION_PUBLIC_APPS
        );
    }
}

export class InstantLaunches extends SectionBase {
    constructor() {
        super(
            constants.KIND_INSTANT_LAUNCHES,
            "",
            "instantLaunches",
            ids.SECTION_INSTANT_LAUNCHES
        );
    }

    getComponent({ t, data }) {
        const items = data[this.kind];
        return (
            <DashboardILSection
                name={t("instantLaunches")}
                kind={constants.KIND_INSTANT_LAUNCHES}
                items={items}
            />
        );
    }
}

export class NewsFeed extends SectionBase {
    constructor() {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_NEWS,
            "newsFeed",
            ids.SECTION_NEWS
        );
    }

    getComponent(params) {
        if (!params.limit) {
            params.limit = (params.numColumns - 1) * 2;
        }
        return super.getComponent(params);
    }
}

export class EventsFeed extends SectionBase {
    constructor() {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_EVENTS,
            "eventsFeed",
            ids.SECTION_EVENTS
        );
    }

    getComponent(params) {
        if (!params.limit) {
            params.limit = Math.ceil(params.numColumns / 2);
        }
        return super.getComponent(params);
    }
}

export class VideosFeed extends SectionBase {
    constructor() {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_VIDEOS,
            "videosFeed",
            ids.SECTION_VIDEOS
        );
    }

    getComponent(params) {
        if (params.numColumns > 1) {
            params.numColumns = Math.ceil(params.numColumns - 1);
            const dimMulti = 1.0 + 1 / params.numColumns;
            params.cardHeight = params.cardHeight * dimMulti;
            params.cardWidth = params.cardWidth * dimMulti;
        }

        return super.getComponent(params);
    }
}
