import React from "react";
import clsx from "clsx";
import { useTranslation } from "i18n";
import { Trans } from "react-i18next";
import ReactPlayer from "react-player/youtube";

import {
    Avatar,
    CardHeader,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Link,
    Typography,
    useMediaQuery,
    Tooltip,
    MenuItem,
    useTheme,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";

import { build as buildID } from "@cyverse-de/ui-lib";

import ids from "../ids";
import * as constants from "../constants";
import * as fns from "../functions";
import useStyles from "./styles";

const DashboardLink = ({ target, kind, children }) => {
    const isNewTab =
        kind === constants.KIND_EVENTS || kind === constants.KIND_FEEDS;

    return isNewTab ? (
        <Link
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="always"
        >
            {children}
        </Link>
    ) : (
        <Link href={target} color="inherit" underline="always">
            {children}
        </Link>
    );
};

/**
 * An item in the dashboard.
 *
 * @param {Object} props - The props for the component.
 * @param {String} props.kind - The kind of item. Example: "app" or "analysis".
 * @param {Object} props.content - The content for the item returned from the API.
 * @returns {Object}
 */
const DashboardItem = ({ item }) => {
    const theme = useTheme();
    const color = getSectionColor(item.section, theme);
    const classes = useStyles({
        width: item.width,
        height: item.height,
        color,
    });

    const { t } = useTranslation(["dashboard", "apps"]);

    const isMediumOrLarger = useMediaQuery(theme.breakpoints.up("md"));

    const cardID = item.id;
    const user = item.username;

    const description = fns.cleanDescription(item.content.description);
    const [origination, date] = item.getOrigination(t);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                id={fns.makeID(ids.ITEM, cardID)}
            >
                <CardHeader
                    avatar={
                        isMediumOrLarger && (
                            <Avatar className={classes.avatar}>
                                {item.getAvatarIcon(classes)}
                            </Avatar>
                        )
                    }
                    classes={{
                        root: classes.cardHeaderDefault,
                        content: classes.cardHeaderContent,
                    }}
                    title={item.content.name}
                    titleTypographyProps={{
                        noWrap: true,
                        variant: "subtitle2",
                        classes: { colorPrimary: classes.cardHeaderText },
                    }}
                    subheader={
                        item.kind === constants.KIND_ANALYSES ? (
                            <Trans
                                t={t}
                                i18nKey={"analysisOrigination"}
                                values={{
                                    status: item.content.status,
                                    date: date,
                                }}
                                components={{ bold: <strong /> }}
                            />
                        ) : (
                            t("origination", {
                                origination,
                                user,
                                date,
                            })
                        )
                    }
                    subheaderTypographyProps={{
                        noWrap: true,
                        variant: "caption",
                        classes: { colorPrimary: classes.cardHeaderText },
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        direction: "row",
                    }}
                >
                    {item.actions}
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                    {description || t("noDescriptionProvided")}
                </Typography>
            </AccordionDetails>
        </Accordion>

        // <Card
        //     classes={{ root: classes.dashboardCard }}
        //     id={fns.makeID(ids.ITEM, cardID)}
        //     elevation={4}
        // >

        //     <CardContent
        //         classes={{
        //             root: classes.root,
        //         }}
        //     >
        //         <Typography
        //             color="textSecondary"
        //             variant="body2"
        //             style={{ overflow: "ellipsis", height: "4.0em" }}
        //         >
        //             {description || t("noDescriptionProvided")}
        //         </Typography>
        //     </CardContent>

        //</Card>
    );
};

export const DashboardFeedItem = ({ item }) => {
    const classes = useStyles({ width: item.width, height: item.height });
    const { t } = useTranslation(["dashboard", "apps"]);

    const [origination, date] = item.getOrigination(t);
    const description = fns.cleanDescription(item.content.description);
    const user = item.username;

    return (
        <div
            className={clsx(
                item.section === constants.SECTION_NEWS && classes.newsItem,
                item.section === constants.SECTION_EVENTS && classes.eventsItem
            )}
        >
            <Typography variant="h6" color="primary">
                <DashboardLink target={item.getLinkTarget()} kind={item.kind}>
                    {item.content.name}
                </DashboardLink>
            </Typography>

            <Typography noWrap color="textSecondary" variant="subtitle2">
                {t("origination", {
                    origination,
                    user,
                    date,
                })}
            </Typography>

            <Typography variant="body2" component="p">
                {description || t("noDescriptionProvided")}
            </Typography>
        </div>
    );
};

export const DashboardVideoItem = ({ item }) => {
    const classes = useStyles(item);

    return (
        <div
            className={classes.dashboardVideo}
            aria-label={item.content.name}
            title={item.content.name}
            width="100%"
            height="100%"
        >
            <ReactPlayer
                url={item.getLinkTarget()}
                light={item.content.thumbnailUrl || true}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
            />
        </div>
    );
};

export const ItemAction = ({ children, tooltipKey, ariaLabel }) => {
    const { t } = useTranslation(["dashboard", "apps"]);

    // The nested div prevents props from the Tooltip from getting propagated
    // down to components that may not support them, like Next.js's Link.
    return (
        <Tooltip title={t(tooltipKey)} aria-label={ariaLabel}>
            {children}
        </Tooltip>
    );
};

export const MenuAction = ({
    children,
    ariaLabel,
    handleClick,
    tooltipKey,
}) => {
    const { t } = useTranslation(["dashboard", "apps"]);
    return (
        <Tooltip title={t(tooltipKey)}>
            <MenuItem onClick={handleClick} aria-label={ariaLabel}>
                {children}
            </MenuItem>
        </Tooltip>
    );
};

export const getSectionColor = (section, theme) => {
    let color;

    switch (section) {
        case constants.SECTION_EVENTS:
            color = theme.palette.primary.violet;
            break;
        case constants.SECTION_NEWS:
            color = theme.palette.indigo;
            break;
        case constants.SECTION_PUBLIC:
            color = theme.palette.darkNavy;
            break;
        case constants.SECTION_RECENT:
            color = theme.palette.navy;
            break;
        case constants.SECTION_RECENTLY_ADDED:
            color = theme.palette.gold;
            break;
        default:
            color = theme.palette.primary.main;
            break;
    }

    return color;
};

class ItemBase {
    constructor({
        kind,
        section,
        content,
        height,
        width,
        actions = [],
        menuActions = [],
    }) {
        this.kind = kind;
        this.section = section;
        this.content = content;
        this.actions = actions;
        this.height = height;
        this.width = width;
        this.id = buildID(content.id);
        this.username = fns.cleanUsername(content.username);
        this.menuActions = menuActions;
    }

    addActions(actions) {
        this.actions = [...this.actions, ...actions];
        return this;
    }

    addMenuActions(actions) {
        this.menuActions = [...this.menuActions, ...actions];
        return this;
    }

    // meant to be implemented by sub-classes.
    getOrigination(_intl) {
        return [];
    }

    getAvatarIcon(_classes) {
        return {};
    }

    getLinkTarget() {
        return this.content.link;
    }

    component(index) {
        return <DashboardItem key={fns.makeID(this.id, index)} item={this} />;
    }
}

export default ItemBase;
