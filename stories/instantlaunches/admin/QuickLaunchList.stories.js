import React from "react";

import QuickLaunchList from "components/instantlaunches/admin/QuickLaunchList";

import { mockAxios } from "../../axiosMock";

import {
    testData,
    testGlobalQLs,
    testInstantLaunches,
} from "./QuickLaunchListData";

export default {
    title: "Instant Launches / admin / Quick Launch List",
};

export const QuickLaunchListTest = () => {
    mockAxios
        .onGet("/api/quicklaunches/defaults/global")
        .reply(200, testGlobalQLs);
    mockAxios
        .onGet("/api/instantlaunches/full")
        .reply(200, testInstantLaunches);
    mockAxios.onPost("/api/quicklaunches/defaults/global").reply(200, {});
    mockAxios
        .onGet("/api/instantlaunches/quicklaunches/public")
        .reply(200, testData);

    mockAxios.onPut("/api/instantlaunches").reply(200, {});

    return <QuickLaunchList />;
};
