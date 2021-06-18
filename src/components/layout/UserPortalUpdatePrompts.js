/**
 * @author aramsey
 *
 * The components for prompting users to update their user account information
 * within the User Portal if necessary.
 *
 * The Snackbar is used when the user is within the grace period to update
 * their information.
 *
 * The dialog is used when the grace period has expired and the user must
 * update their information in order to use CyVerse services.
 */

import React, { useEffect, useState } from "react";

import { build } from "@cyverse-de/ui-lib";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useUserProfile } from "contexts/userProfile";
import { Trans, useTranslation } from "i18n";
import ids from "./ids";
import { usePortalStatus } from "serviceFacades/users";

function UserPortalUpdatePrompts() {
    const [userProfile] = useUserProfile();
    const { t } = useTranslation("common");
    const theme = useTheme();

    const baseId = ids.USER_PORTAL_UPDATE_DLG;
    const dialogTitleId = build(baseId, ids.DIALOG_TITLE);

    const [showSnackbar, setShowSnackbar] = useState(false);

    const { data: userPortalResp } = usePortalStatus(userProfile?.id, (err) => {
        console.log("Received error response from user portal API", err);
    });

    useEffect(() => {
        setShowSnackbar(userPortalResp?.warning_required);
    }, [userPortalResp]);

    const onCloseAnnouncer = () => setShowSnackbar(false);

    const onUpdateNow = () => {
        const updateUrl = userPortalResp?.update_url;
        if (updateUrl) {
            const portalUrl = `${updateUrl}&redirectUrl=${encodeURIComponent(
                window.location.href
            )}`;
            window.location.replace(portalUrl);
        }
    };

    return (
        <>
            <Snackbar
                id={ids.USER_PORTAL_ANNOUNCER}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={showSnackbar}
            >
                <Alert
                    variant="filled"
                    severity="warning"
                    style={{
                        color: theme.palette.warning.contrastText,
                    }}
                    action={[
                        <Button
                            variant="outlined"
                            onClick={onUpdateNow}
                            id={build(
                                ids.USER_PORTAL_ANNOUNCER,
                                ids.UPDATE_BTN
                            )}
                            key={ids.UPDATE_BTN}
                        >
                            <Typography>
                                {t("updateAccountInformation")}
                            </Typography>
                        </Button>,
                        <IconButton
                            id={build(ids.USER_PORTAL_ANNOUNCER, ids.CLOSE_BTN)}
                            key={ids.CLOSE_BTN}
                            size="small"
                            style={{
                                color: theme.palette.warning.contrastText,
                            }}
                            onClick={onCloseAnnouncer}
                        >
                            <Close />
                        </IconButton>,
                    ]}
                >
                    <Trans
                        t={t}
                        i18nKey="userPortalGracePeriodText"
                        components={{
                            br: <br />,
                        }}
                    />
                </Alert>
            </Snackbar>

            <Dialog
                open={!!userPortalResp?.update_required}
                id={baseId}
                fullWidth
                aria-labelledby={dialogTitleId}
            >
                <DialogTitle id={dialogTitleId}>
                    {t("updateAccountInformation")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t("userPortalExpiredText")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        id={build(baseId, ids.UPDATE_BTN)}
                        onClick={onUpdateNow}
                        color="primary"
                        variant="contained"
                    >
                        {t("updateAccountInformation")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserPortalUpdatePrompts;
