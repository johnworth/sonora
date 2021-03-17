import React, { useState } from "react";
import { queryCache, useMutation } from "react-query";

import { PlayArrow, Info, Apps } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import { formatDate } from "@cyverse-de/ui-lib";

import { appFavorite, APP_BY_ID_QUERY_KEY } from "serviceFacades/apps";

import * as constants from "../constants";
import ItemBase, { ItemAction } from "./ItemBase";
import { useTranslation } from "i18n";
import AppFavorite from "components/apps/AppFavorite";
import { useAppLaunchLink } from "components/apps/utils";
import { useTheme } from "@material-ui/core";
import { useRouter } from "next/router";

const AppLaunchAction = ({ systemID, appID }) => {
    const { t } = useTranslation("dashboard");
    const theme = useTheme();
    const router = useRouter();
    const [, launchAs] = useAppLaunchLink(systemID, appID);

    return (
        <ItemAction ariaLabel={t("launchAria")} tooltipKey="launchAction">
            <IconButton
                style={{
                    margin: theme.spacing(1),
                }}
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(launchAs);
                }}
            >
                <PlayArrow color="primary" />
            </IconButton>
        </ItemAction>
    );
};

class AppItem extends ItemBase {
    constructor(props) {
        super({
            kind: constants.KIND_APPS,
            content: props.content,
            section: props.section,
            height: props.height,
            width: props.width,
        });
    }

    static create(props) {
        const item = new AppItem(props);
        const { showErrorAnnouncer, setDetailsApp } = props;
        const { t } = useTranslation("dashboard");
        const theme = useTheme();

        // Extract app details. Note: dashboard-aggregator only queries the DE database.
        const app = props.content;

        // State variables.
        const [isFavorite, setIsFavorite] = useState(app.is_favorite);

        // Functions to build keys and links.
        const baseId = `${constants.KIND_APPS}-${app.system_id}-${app.id}`;
        const buildKey = (keyType) => `${baseId}-${keyType}`;
        const [favorite] = useMutation(appFavorite, {
            onSuccess: () => {
                queryCache.invalidateQueries([
                    APP_BY_ID_QUERY_KEY,
                    { systemId: app.system_id, appId: app.id },
                ]);
                setIsFavorite(!isFavorite);
            },
            onError: (e) => {
                showErrorAnnouncer(t("favoritesUpdateError", { error: e }), e);
            },
        });

        const onFavoriteClick = () => {
            favorite({
                isFav: !isFavorite,
                appId: app.id,
                systemId: app.system_id,
            });
        };

        return item.addActions(
            [
                app.is_public && (
                    <AppFavorite
                        key={buildKey("favorite")}
                        isFavorite={isFavorite}
                        isExternal={false}
                        onFavoriteClick={onFavoriteClick}
                        baseId={buildKey("favorite")}
                        buttonStyle={{
                            margin: theme.spacing(1),
                        }}
                    />
                ),
                <AppLaunchAction
                    key={buildKey("launch")}
                    systemID={app.system_id}
                    appID={app.id}
                />,
                <ItemAction
                    ariaLabel={t("openDetailsAria")}
                    key={`${constants.KIND_APPS}-${props.content.id}-details`}
                    tooltipKey="detailsAction"
                >
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setDetailsApp({
                                ...app,
                                onFavoriteUpdated: (isFavoriteNow) =>
                                    setIsFavorite(!isFavoriteNow),
                            });
                        }}
                        style={{
                            margin: theme.spacing(1),
                        }}
                        size="small"
                    >
                        <Info color="primary" />
                    </IconButton>
                </ItemAction>,
            ].filter((e) => e)
        );
    }

    getOrigination(t) {
        let origination;
        let date;

        if (this.content.integration_date) {
            origination = t("integratedBy");
            date = new Date(this.content.integration_date);
        } else {
            origination = t("editedBy");
            date = new Date(this.content.edited_date);
        }

        return [origination, formatDate(date.valueOf())];
    }

    getAvatarIcon(classes) {
        return (
            <Apps
                color="primary"
                classes={{ colorPrimary: classes.avatarIcon }}
            />
        );
    }

    getLinkTarget() {
        return `/apps/${this.content.id}/details`;
    }
}

export default AppItem;
