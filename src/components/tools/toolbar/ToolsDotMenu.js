/**
 * @author sriram
 *
 * A dot menu for Tools View.
 *
 */

import React from "react";
import { useTranslation } from "i18n";

import ids from "../ids";
import shareIds from "components/sharing/ids";
import SharingMenuItem from "components/sharing/SharingMenuItem";
import { isWritable } from "../utils";

import { build, DotMenu } from "@cyverse-de/ui-lib";

import {
    Hidden,
    ListItemIcon,
    ListItemText,
    MenuItem,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";

import { Add, Delete, Info, Edit, FilterList, Send } from "@material-ui/icons";

function DotMenuItems(props) {
    const {
        baseId,
        onDetailsSelected,
        isSingleSelection,
        onClose,
        canShare,
        setSharingDlgOpen,
        onAddToolSelected,
        onEditToolSelected,
        onRequestToolSelected,
        allowEditing,
        onFilterSelected,
        onDeleteToolSelected,
        allowDeletes,
    } = props;

    const { t } = useTranslation("tools");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return [
        <Hidden mdUp>
            {isSingleSelection && (
                <MenuItem
                    key={build(baseId, ids.MANAGE_TOOLS.TOOL_INFO_MI)}
                    id={build(baseId, ids.MANAGE_TOOLS.TOOL_INFO_MI)}
                    onClick={() => {
                        onClose();
                        onDetailsSelected();
                    }}
                >
                    <ListItemIcon>
                        <Info fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t("detailsLbl")} />
                </MenuItem>
            )}
            {canShare && (
                <SharingMenuItem
                    key={build(baseId, shareIds.SHARING_MENU_ITEM)}
                    baseId={baseId}
                    onClose={onClose}
                    setSharingDlgOpen={setSharingDlgOpen}
                />
            )}
        </Hidden>,
        <MenuItem
            key={build(baseId, ids.MANAGE_TOOLS.ADD_TOOL_MI)}
            id={build(baseId, ids.MANAGE_TOOLS.ADD_TOOL_MI)}
            onClick={() => {
                onClose();
                onAddToolSelected();
            }}
        >
            <ListItemIcon>
                <Add fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("addTool")} />
        </MenuItem>,

        <MenuItem
            key={build(baseId, ids.MANAGE_TOOLS.REQUEST_TOOL_MI)}
            id={build(baseId, ids.MANAGE_TOOLS.REQUEST_TOOL_MI)}
            onClick={() => {
                onClose();
                onRequestToolSelected();
            }}
        >
            <ListItemIcon>
                <Send fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("requestToolMI")} />
        </MenuItem>,

        allowEditing && (
            <MenuItem
                key={build(baseId, ids.MANAGE_TOOLS.EDIT_TOOL_MI)}
                id={build(baseId, ids.MANAGE_TOOLS.EDIT_TOOL_MI)}
                onClick={() => {
                    onClose();
                    onEditToolSelected();
                }}
            >
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("edit")} />
            </MenuItem>
        ),

        allowDeletes && (
            <MenuItem
                key={build(baseId, ids.MANAGE_TOOLS.DELETE_TOOL_MI)}
                id={build(baseId, ids.MANAGE_TOOLS.DELETE_TOOL_MI)}
                onClick={() => {
                    onClose();
                    onDeleteToolSelected();
                }}
            >
                <ListItemIcon>
                    <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t("delete")} />
            </MenuItem>
        ),

        isMobile && (
            <MenuItem
                key={build(baseId, ids.MANAGE_TOOLS.FILTER_TOOLS_MI)}
                id={build(baseId, ids.MANAGE_TOOLS.FILTER_TOOLS_MI)}
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
    ];
}

export default function ToolsDotMenu({
    ButtonProps,
    canShare,
    setSharingDlgOpen,
    onEditToolSelected,
    getSelectedTools,
    onRequestToolSelected,
    onDeleteToolSelected,
    ...props
}) {
    const {
        baseId,
        isSingleSelection,
        onDetailsSelected,
        onAddToolSelected,
    } = props;
    const selectedTools = getSelectedTools ? getSelectedTools() : null;
    const allowEditing =
        isSingleSelection && isWritable(selectedTools[0]?.permission);
    const allowDeletes =
        selectedTools?.length > 0 &&
        selectedTools.filter((tool) => !isWritable(tool.permission)).length ===
            0;

    return (
        <DotMenu
            baseId={baseId}
            ButtonProps={ButtonProps}
            render={(onClose) => (
                <DotMenuItems
                    {...props}
                    isSingleSelection={isSingleSelection}
                    onClose={onClose}
                    onDetailsSelected={onDetailsSelected}
                    canShare={canShare}
                    setSharingDlgOpen={setSharingDlgOpen}
                    onAddToolSelected={onAddToolSelected}
                    onEditToolSelected={onEditToolSelected}
                    allowEditing={allowEditing}
                    onRequestToolSelected={onRequestToolSelected}
                    onDeleteToolSelected={onDeleteToolSelected}
                    allowDeletes={allowDeletes}
                />
            )}
        />
    );
}
