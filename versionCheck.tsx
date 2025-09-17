/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotification } from "@api/Notifications";
import { relaunch } from "@utils/native";
import { PluginNative } from "@utils/types";
const Native = VencordNative.pluginHelpers.PluginRepo as PluginNative<typeof import("./native")>;

export const VERSION = "1.2";

async function getVersion() {
    const repoVersion = await (await fetch("https://raw.githubusercontent.com/ScattrdBlade/PluginsRepo/main/versionCheck.tsx", { cache: "no-cache" })).text();
    const repoVersionMatch = repoVersion.match(/export const VERSION = "(.+)";/);
    if (!repoVersionMatch) return;
    const [_, version] = repoVersionMatch;
    const [major, minor, patch] = version.split(".").map(m => parseInt(m));
    if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) return false;
    const [currMajor, currMinor, currPatch] = VERSION.split(".").map(m => parseInt(m));
    if (major > currMajor || minor > currMinor || patch > currPatch) return version;
    return false;
}

export async function checkUpdate() {
    const updateVer = await getVersion();
    if (!updateVer) return;

    showNotification({
        title: `Update available for Plugin Repo: ${updateVer}`,
        body: "Click here to update to the latest version.",
        permanent: true,
        noPersist: false,
        onClick: async () => {
            try {
                await Native.updatePluginRepo();
                relaunch();
            } catch (error) {
                console.error("Failed to update Plugin Repo:", error);
                showNotification({
                    title: "Update Failed",
                    body: "Click here to download the update manually.",
                    permanent: true,
                    noPersist: false,
                    onClick: () => {
                        window.open("https://github.com/ScattrdBlade/PluginsRepo", "_blank");
                    }
                });
            }
        }
    });
}
