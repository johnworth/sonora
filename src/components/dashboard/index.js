/**
 * @author johnworth
 *
 * The dashboard component.
 *
 * @module dashboard
 */
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";

import { parse, format } from "date-fns";

import { getMessage, withI18N, build as buildID } from "@cyverse-de/ui-lib";

import callApi from "../../common/callApi";

import messages from "./messages";
import ids from "./ids";
import * as constants from "./constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    dividerRoot: {
        marginBottom: 15,
    },
    subtitle: {
        marginBottom: 15,
    },
    gridRoot: {
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
        height: "70vh",
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "95%",
        },
        margin: theme.spacing(2),
    },
    dashboardCard: {
        height: 225,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            width: 375,
        },
        [theme.breakpoints.down("xs")]: {
            width: 275,
        },
        margin: theme.spacing(2),
    },
    actionsRoot: {
        marginLeft: "auto",
    },
}));

const getOrigination = (kind, content) => {
    let origination;
    let date;

    switch (kind) {
        case constants.KIND_ANALYSES:
            origination = getMessage("startedBy");
            date = content.start_date;
            break;
        case constants.KIND_APPS:
            if (content.integration_date) {
                origination = getMessage("integratedBy");
                date = content.integration_date;
            } else {
                origination = getMessage("editedBy");
                date = content.edited_date;
            }
            break;
        case constants.KIND_FEEDS:
            origination = getMessage("publishedBy");
            date = content.date_added;
            break;
        default:
            origination = getMessage("by");
            date = new Date();
    }

    date = parse(date);
    date = format(date, "MMMM Do YYYY, h:mm:ss a");

    return [origination, date];
};

const cleanUsername = (username) => {
    let user;
    if (username) {
        if (username.endsWith(constants.USER_SUFFIX)) {
            user = username.replace(constants.USER_SUFFIX, "");
        } else {
            user = username;
        }
    } else {
        user = constants.CYVERSE;
    }
    return user;
};

const cleanDescription = (description) => {
    let desc;
    if (description.length > constants.DESC_MAX_LENGTH) {
        desc = description.slice(0, constants.DESC_MAX_LENGTH) + "...";
    } else {
        desc = description;
    }
    return desc;
};

/**
 * An item in the dashboard.
 *
 * @param {Object} props - The props for the component.
 * @param {String} props.kind - The kind of item. Example: "app" or "analysis".
 * @param {Object} props.content - The content for the item returned from the API.
 * @returns {Object}
 */
export const DashboardItem = (props) => {
    const classes = useStyles();
    const { kind, content } = props;
    const cardID = `${kind}-${content.id}`;

    const description = cleanDescription(content.description);
    const [origination, date] = getOrigination(kind, content);
    const user = cleanUsername(content.username);

    return (
        <Card
            className={classes.dashboardCard}
            id={buildID(ids.ITEM_BASE, cardID)}
            raised={true}
        >
            <CardContent
                classes={{
                    root: classes.root,
                }}
            >
                <Typography noWrap variant="h6" component="h6">
                    {content.name}
                </Typography>

                <Typography
                    classes={{ root: classes.subtitle }}
                    gutterBottom
                    noWrap
                    color="textSecondary"
                >
                    {origination} {`${user} on ${date}`}
                </Typography>

                <Typography color="textSecondary" variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>

            <CardActions
                classes={{
                    root: classes.actionsRoot,
                }}
            >
                <Button
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                >
                    {getMessage("open")}
                </Button>
            </CardActions>
        </Card>
    );
};

const DashboardSection = ({ name, kind, items }) => {
    const classes = useStyles();

    return (
        <>
            <Divider classes={{ root: classes.dividerRoot }} />
            <Typography noWrap variant="h5" color="primary">
                {name}
            </Typography>
            <Divider classes={{ root: classes.dividerRoot }} />
            <Grid container item xs={12} spacing={6}>
                {items.map((item) => (
                    <Grid item key={item.id}>
                        <DashboardItem kind={kind} content={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

const Dashboard = () => {
    const classes = useStyles();
    const [data, setData] = useState({});

    useEffect(() => {
        callApi({
            endpoint: "/api/dashboard",
        }).then((data) => {
            setData(data);
        });
    }, []);

    const sections = [
        [
            constants.KIND_ANALYSES,
            constants.SECTION_RECENT,
            getMessage("recentAnalyses"),
        ],
        [
            constants.KIND_ANALYSES,
            constants.SECTION_RUNNING,
            getMessage("runningAnalyses"),
        ],
        [
            constants.KIND_APPS,
            constants.SECTION_RECENTLY_ADDED,
            getMessage("recentlyAddedApps"),
        ],
        [
            constants.KIND_APPS,
            constants.SECTION_PUBLIC,
            getMessage("publicApps"),
        ],
        [constants.KIND_FEEDS, constants.SECTION_NEWS, getMessage("newsFeed")],
        [
            constants.KIND_FEEDS,
            constants.SECTION_EVENTS,
            getMessage("eventsFeed"),
        ],
    ];

    return (
        <Paper className={classes.gridRoot} elevation={0}>
            {sections
                .filter(
                    ([kind, section, _label]) =>
                        data[kind] !== undefined &&
                        data[kind][section] !== undefined
                )
                .filter(
                    ([kind, section, _label]) => data[kind][section].length > 0
                )
                .map(([kind, section, label]) => {
                    return (
                        <DashboardSection
                            kind={kind}
                            key={`${kind}-${section}`}
                            items={data[kind][section]}
                            name={label}
                        />
                    );
                })}
        </Paper>
    );
};

export default withI18N(Dashboard, messages);
