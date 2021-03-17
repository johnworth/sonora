import React from "react";

import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
    IconButton,
    ListItemIcon,
} from "@material-ui/core";

import getItem from "./dashboardItem";

import useStyles from "./styles";
import * as fns from "./functions";
import * as constants from "./constants";
import ids from "./ids";

import { ExpandLess, ExpandMore, PlayArrow } from "@material-ui/icons";

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
    const theme = useTheme();

    if (!limit) {
        limit = numColumns;
    }

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

    const content = items.map(itemComponent);

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

            <div className={classes.sectionItems}>{content}</div>
        </div>
    );
};

const DashboardILListItem = ({ item }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <ListItem alignItems="flex-start">
            <ListItemIcon>
                <PlayArrow />
            </ListItemIcon>

            <ListItemText>{item.app_name}</ListItemText>

            <IconButton>
                <PlayArrow />
            </IconButton>

            <IconButton edge="end" onClick={handleExpandClick}>
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ListItemText>
                    <Typography paragraph>{item.app_description}</Typography>
                </ListItemText>
            </Collapse>
        </ListItem>
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
                {items.map((item) => (
                    <DashboardILListItem item={item} />
                ))}
            </List>
        </div>
    );
};

class SectionBase {
    constructor(kind, name, labelName, idBase, gridSizes = {}) {
        this.kind = kind;
        this.name = name;
        this.label = labelName;
        this.id = fns.makeID(idBase);
        this.gridSizes = gridSizes;
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
    constructor(sizes = {}) {
        super(
            constants.KIND_ANALYSES,
            constants.SECTION_RECENT,
            "recentAnalyses",
            ids.SECTION_RECENT_ANALYSES,
            sizes
        );
    }
}

export class RunningAnalyses extends SectionBase {
    constructor(sizes = {}) {
        super(
            constants.KIND_ANALYSES,
            constants.SECTION_RUNNING,
            "runningAnalyses",
            ids.SECTION_RECENT_ANALYSES,
            sizes
        );
    }
}

export class RecentlyAddedApps extends SectionBase {
    constructor(sizes = {}) {
        super(
            constants.KIND_APPS,
            constants.SECTION_RECENTLY_ADDED,
            "recentlyAddedApps",
            ids.SECTION_RECENTLY_ADDED_APPS,
            sizes
        );
    }
}

export class RecentlyUsedApps extends SectionBase {
    constructor(sizes = {}) {
        super(
            constants.KIND_APPS,
            constants.SECTION_RECENTLY_USED,
            "recentlyUsedApps",
            ids.SECTION_RECENTLY_USED_APPS,
            sizes
        );
    }
}

export class PublicApps extends SectionBase {
    constructor(sizes = {}) {
        super(
            constants.KIND_APPS,
            constants.SECTION_PUBLIC,
            "publicApps",
            ids.SECTION_PUBLIC_APPS,
            sizes
        );
    }
}

export class InstantLaunches extends SectionBase {
    constructor(sizes = {}) {
        super(
            constants.KIND_INSTANT_LAUNCHES,
            "",
            "instantLaunches",
            ids.SECTION_INSTANT_LAUNCHES,
            sizes
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
    constructor(sizes = {}) {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_NEWS,
            "newsFeed",
            ids.SECTION_NEWS,
            sizes
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
    constructor(sizes = {}) {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_EVENTS,
            "eventsFeed",
            ids.SECTION_EVENTS,
            sizes
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
    constructor(sizes = {}) {
        super(
            constants.KIND_FEEDS,
            constants.SECTION_VIDEOS,
            "videosFeed",
            ids.SECTION_VIDEOS,
            sizes
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
