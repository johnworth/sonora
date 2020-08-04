import React from "react";

import { Launch, Info, Favorite, Share, Apps } from "@material-ui/icons";

import { formatDate } from "@cyverse-de/ui-lib";

import * as constants from "../constants";

import ItemBase, { ItemAction } from "./ItemBase";

class AppItem extends ItemBase {
    constructor(props) {
        super({
            kind: constants.KIND_APPS,
            content: props.content,
            section: props.section,
            height: props.height,
            width: props.width,
            classes: props.classes,
        });
    }

    static create(props) {
        const item = new AppItem(props);
        return item
            .addActions([
                <ItemAction
                    ariaLabel="launch"
                    key={`${constants.KIND_APPS}-${props.content.id}-launch`}
                >
                    <Launch />
                </ItemAction>,
                <ItemAction
                    arialLabel="open details"
                    key={`${constants.KIND_APPS}-${props.content.id}-details`}
                >
                    <Info />
                </ItemAction>,
                <ItemAction
                    arialLabel="favorite"
                    key={`${constants.KIND_APPS}-${props.content.id}-favorite`}
                >
                    <Favorite />
                </ItemAction>,
                <ItemAction
                    arialLabel="share"
                    key={`${constants.KIND_APPS}-${props.content.id}-share`}
                >
                    <Share />
                </ItemAction>,
            ])
            .setSectionClass();
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

    getAvatarIcon() {
        if (!this.headerClass || !this.avatarClass) {
            this.setSectionClass();
        }
        return (
            <Apps
                color="primary"
                classes={{ colorPrimary: this.avatarClass }}
            />
        );
    }

    getLinkTarget() {
        return `/apps/${this.content.id}/details`;
    }
}

export default AppItem;