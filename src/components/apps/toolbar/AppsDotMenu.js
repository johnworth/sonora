/**
 * @author sriram
 *
 * A dot menu intended for the Apps view.
 */

import React from "react";
import { useTranslation } from "i18n";
import Link from "next/link";

import ids from "../ids";
import QLMenuItem from "../menuItems/QLMenuItem";
import DocMenuItem from "../menuItems/DocMenuItem";
import shareIds from "components/sharing/ids";
import NavigationConstants from "common/NavigationConstants";

import { build, DotMenu } from "@cyverse-de/ui-lib";
import {
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import {
    Add as CreateAppIcon,
    FilterList,
    Build,
    Info,
    Queue as AddToBagIcon,
} from "@material-ui/icons";
import SharingMenuItem from "components/sharing/SharingMenuItem";

function AppsDotMenu(props) {
    const {
        baseId,
        ButtonProps,
        detailsEnabled,
        onDetailsSelected,
        onFilterSelected,
        addToBagEnabled,
        onAddToBagClicked,
        canShare,
        setSharingDlgOpen,
        onDocSelected,
        onQLSelected,
    } = props;
    const { t } = useTranslation(["apps", "common"]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    if (!detailsEnabled && !canShare && !isMobile) {
        return null;
    }
    return (
        <DotMenu
            baseId={baseId}
            ButtonProps={ButtonProps}
            buttonText={t("common:dotMenuText")}
            render={(onClose) => [
                detailsEnabled && (
                    <MenuItem
                        key={build(baseId, ids.DETAILS_MENU_ITEM)}
                        id={build(baseId, ids.DETAILS_MENU_ITEM)}
                        onClick={() => {
                            onClose();
                            onDetailsSelected();
                        }}
                    >
                        <ListItemIcon>
                            <Info fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("details")} />
                    </MenuItem>
                ),
                addToBagEnabled && (
                    <MenuItem
                        key={build(baseId, ids.ADD_TO_BAG_MENU_ITEM)}
                        id={build(baseId, ids.ADD_TO_BAG_MENU_ITEM)}
                        onClick={() => {
                            onClose();
                            onAddToBagClicked();
                        }}
                    >
                        <ListItemIcon>
                            <AddToBagIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("addToBag")} />
                    </MenuItem>
                ),
                isMobile && (
                    <MenuItem
                        key={build(baseId, ids.FILTER_MENU_ITEM)}
                        id={build(baseId, ids.FILTER_MENU_ITEM)}
                        onClick={() => {
                            onClose();
                            onFilterSelected();
                        }}
                    >
                        <ListItemIcon>
                            <FilterList fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("filterLbl")} />
                    </MenuItem>
                ),
                canShare && (
                    <SharingMenuItem
                        key={build(baseId, shareIds.SHARING_MENU_ITEM)}
                        baseId={baseId}
                        onClose={onClose}
                        setSharingDlgOpen={setSharingDlgOpen}
                    />
                ),
                detailsEnabled && (
                    <DocMenuItem
                        key={build(baseId, ids.DOC_MENU_ITEM)}
                        baseId={baseId}
                        onClose={onClose}
                        onDocSelected={onDocSelected}
                    />
                ),
                detailsEnabled && (
                    <QLMenuItem
                        key={build(baseId, ids.QL_MENU_ITEM)}
                        baseId={baseId}
                        onClose={onClose}
                        onQLSelected={onQLSelected}
                    />
                ),
                <Divider
                    key={build(baseId, ids.MANAGE_TOOLS_DIVIDER)}
                    id={build(baseId, ids.MANAGE_TOOLS_DIVIDER)}
                />,
                <Link
                    key={ids.TOOLS_MENU_ITEM}
                    href={NavigationConstants.TOOLS}
                >
                    <MenuItem id={build(baseId, ids.TOOLS_MENU_ITEM)}>
                        <ListItemIcon>
                            <Build fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("manageTools")} />
                    </MenuItem>
                </Link>,
                <Link
                    key={ids.CREATE_MENU_ITEM}
                    href={NavigationConstants.NEW_APP}
                >
                    <MenuItem id={build(baseId, ids.CREATE_MENU_ITEM)}>
                        <ListItemIcon>
                            <CreateAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t("create")} />
                    </MenuItem>
                </Link>,
            ]}
        />
    );
}

export default AppsDotMenu;
