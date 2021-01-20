import React, { useMemo, useState } from "react";

import { build, EmptyTable } from "@cyverse-de/ui-lib";
import { IconButton, Table, TableBody } from "@material-ui/core";
import { Info } from "@material-ui/icons";

import ids from "./ids";
import { useTranslation } from "i18n";
import TableLoading from "../utils/TableLoading";
import { useQuery } from "react-query";
import {
    ALL_TEAMS_QUERY,
    getAllTeams,
    getMyTeams,
    MY_TEAMS_QUERY,
    SEARCH_TEAMS_QUERY,
} from "serviceFacades/groups";
import { TEAM_FILTER } from "./index";
import { useUserProfile } from "contexts/userProfile";
import isQueryLoading from "../utils/isQueryLoading";
import BasicTable from "../utils/BasicTable";
import teamColumns from "./teamColumns";
import DELink from "../utils/DELink";
import { useTeamsSearch } from "../search/searchQueries";
import WrappedErrorHandler from "../utils/error/WrappedErrorHandler";
import ErrorTypographyWithDialog from "../utils/error/ErrorTypographyWithDialog";

function Listing(props) {
    const {
        parentId,
        teamFilter,
        searchTerm,
        onTeamNameSelected,
        updateResultCount,
    } = props;

    const { t } = useTranslation("teams");
    const [data, setData] = useState([]);
    const [userProfile] = useUserProfile();

    const tableId = build(parentId, ids.TEAMS.TABLE);
    const TEAM_COLUMNS = teamColumns(t);
    const isSearchPage = !!searchTerm;

    const columns = useMemo(() => {
        const baseColumns = [
            {
                Header: TEAM_COLUMNS.NAME.fieldName,
                accessor: TEAM_COLUMNS.NAME.key,
                Cell: ({ row, value }) => {
                    const team = row.original;
                    const rowId = build(tableId, team.id);
                    return (
                        <DELink
                            id={build(rowId, ids.TEAMS.LINK)}
                            onClick={() => onTeamNameSelected(team)}
                            searchTerm={searchTerm}
                            text={value}
                        />
                    );
                },
            },
            {
                Header: TEAM_COLUMNS.CREATOR.fieldName,
                accessor: TEAM_COLUMNS.CREATOR.key,
            },
            {
                Header: TEAM_COLUMNS.DESCRIPTION.fieldName,
                accessor: TEAM_COLUMNS.DESCRIPTION.key,
            },
        ];

        return !isSearchPage
            ? baseColumns
            : [
                  ...baseColumns,
                  {
                      Header: TEAM_COLUMNS.DETAILS.fieldName,
                      accessor: TEAM_COLUMNS.DETAILS.key,
                      defaultCanSort: false,
                      Cell: ({ row }) => {
                          const team = row.original;
                          return (
                              <IconButton
                                  onClick={() =>
                                      console.log(
                                          "Show details for",
                                          team.display_extension
                                      )
                                  }
                                  size="small"
                                  color="primary"
                                  title={t("details")}
                              >
                                  <Info fontSize="small" />
                              </IconButton>
                          );
                      },
                  },
              ];
    }, [
        tableId,
        TEAM_COLUMNS,
        onTeamNameSelected,
        isSearchPage,
        searchTerm,
        t,
    ]);

    const { isFetching: fetchMyTeams, error: myTeamsError } = useQuery({
        queryKey: [MY_TEAMS_QUERY, { userId: userProfile?.id }],
        queryFn: getMyTeams,
        config: {
            enabled: TEAM_FILTER.MY_TEAMS === teamFilter && !searchTerm,
            onSuccess: (results) => setData(results.groups),
        },
    });

    const { isFetching: fetchAllTeams, error: allTeamsError } = useQuery({
        queryKey: [ALL_TEAMS_QUERY, userProfile?.id],
        queryFn: getAllTeams,
        config: {
            enabled: TEAM_FILTER.ALL_TEAMS === teamFilter && !searchTerm,
            onSuccess: (results) => setData(results.groups),
        },
    });

    const {
        isFetching: fetchSearchResults,
        error: searchError,
    } = useTeamsSearch(
        [SEARCH_TEAMS_QUERY, { searchTerm }],
        searchTerm && searchTerm.length > 2,
        (results) => {
            const teams = results.groups;
            setData(teams);
            updateResultCount && updateResultCount(teams.length);
        }
    );

    const loading = isQueryLoading([
        fetchMyTeams,
        fetchAllTeams,
        fetchSearchResults,
    ]);

    const error = allTeamsError || myTeamsError || searchError;

    if (loading) {
        return (
            <Table>
                <TableLoading
                    baseId={tableId}
                    numColumns={Object.keys(TEAM_COLUMNS).length}
                    numRows={5}
                />
            </Table>
        );
    }

    if (error) {
        return !isSearchPage ? (
            <WrappedErrorHandler errorObject={error} baseId={parentId} />
        ) : (
            <ErrorTypographyWithDialog
                errorMessage={t("errorSearch")}
                errorObject={error}
                baseId={parentId}
            />
        );
    }

    if (!data || data.length === 0) {
        return (
            <Table>
                <TableBody>
                    <EmptyTable
                        message={t("noTeams")}
                        numColumns={Object.keys(TEAM_COLUMNS).length}
                    />
                </TableBody>
            </Table>
        );
    }

    return <BasicTable columns={columns} data={data} sortable />;
}

export default Listing;
