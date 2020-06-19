import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 0,
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    dividerRoot: {
        marginBottom: theme.spacing(1),
    },
    footer: {
        width: "100%",
        height: 128, // This is needed to get the vertical scrolling to stop cutting off the bottom of the content.

        [theme.breakpoints.down("sm")]: {
            height: 32,
        },
    },
    section: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
    },
    sectionItems: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,

        // Try to eek as much space out of the iPhone SE cards as possible.
        [theme.breakpoints.down("sm")]: {
            padding: 0,
            justifyContent: "center",
        },
    },
    subtitle: {
        marginBottom: theme.spacing(2),
    },
    gridRoot: {
        overflow: "auto", // Needed for vertical scrolling.
        height: "90vh", // Needed to get the vertical scrolling working.
        paddingTop: 0,
        paddingLeft: theme.spacing(3),
        paddingBottom: 0,
        paddingRight: theme.spacing(3),

        [theme.breakpoints.down("sm")]: {
            paddingTop: 0,
            paddingLeft: theme.spacing(1),
            paddingBottom: 0,
            paddingRight: theme.spacing(1),
        },
    },
    dashboardCard: {
        height: 225,
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(2),

        [theme.breakpoints.up("xs")]: {
            width: 300,
            marginRight: theme.spacing(0),
        },

        [theme.breakpoints.up("sm")]: {
            marginRight: theme.spacing(2),
        },

        [theme.breakpoints.up("lg")]: {
            width: 425,
            marginRight: theme.spacing(2),
        },
    },
    actionsRoot: {
        marginLeft: "auto",
    },
    avatar: {
        background: theme.palette.white,
        color: theme.palette.gray,
    },
    cardHeaderDefault: {
        background: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
    },
    cardHeaderDefaultAvatar: {
        color: theme.palette.primary.main,
    },
    cardHeaderEvents: {
        background: theme.palette.violet,
    },
    cardHeaderEventsAvatar: {
        color: theme.palette.violet,
    },
    cardHeaderNews: {
        background: theme.palette.indigo,
    },
    cardHeaderNewsAvatar: {
        color: theme.palette.indigo,
    },
    cardHeaderPublic: {
        background: theme.palette.darkNavy,
    },
    cardHeaderPublicAvatar: {
        color: theme.palette.darkNavy,
    },
    cardHeaderRecent: {
        background: theme.palette.navy,
    },
    cardHeaderRecentAvatar: {
        color: theme.palette.navy,
    },
    cardHeaderRecentlyAdded: {
        background: theme.palette.gold,
    },
    cardHeaderRecentlyAddedAvatar: {
        color: theme.palette.gold,
    },
    cardHeaderText: {
        color: theme.palette.primary.contrastText,
    },
}));
