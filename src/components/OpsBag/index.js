import React from "react";

import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
} from "@material-ui/core";
import { Label, Delete, InsertDriveFile } from "@material-ui/icons";

import { useQuery } from "react-query";
import * as facade from "../../serviceFacades/bags";
import { Skeleton } from "@material-ui/lab";

export class BagItem {
    constructor(item) {
        this.item = item;
    }

    get icon() {
        return <Label />;
    }

    get label() {
        return (
            this.item?.label ||
            this.item?.name ||
            this.item?.description ||
            "override label() please"
        );
    }
}

export class FileBagItem extends BagItem {
    get icon() {
        return <InsertDriveFile />;
    }
}

export const createNewBagItem = (item) => {
    if (item?.name && item?.path) {
        return new FileBagItem(item);
    }
};

const BagSkeleton = () => (
    <Skeleton variant="rect" animation="wave" height={100} width="100%" />
);

export default ({ open, remove }) => {
    const { status, data, error } = useQuery(
        [facade.DEFAULT_BAG_QUERY_KEY],
        facade.getDefaultBag
    );

    const isLoading = status === "loading";
    const hasErrored = status === "error";

    if (hasErrored) {
        console.log(error.message);
    }

    let bagItems = data?.items || [];
    bagItems = bagItems.map((item) => createNewBagItem(item));

    return (
        <Drawer anchor="left" open={open}>
            {isLoading ? (
                <BagSkeleton />
            ) : (
                <List>
                    {bagItems.map((bagItem, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>{bagItem.icon}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={bagItem.label} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={remove(index)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                    ;
                </List>
            )}
        </Drawer>
    );
};
