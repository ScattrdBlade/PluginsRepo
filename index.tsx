/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import { checkUpdate } from "./versionCheck";

export default definePlugin({
    name: "PluginRepo",
    description: "Adds a repo containing Third-Party Plugins to download.",
    authors: [Devs.ScattrdBlade],
    required: false,
    patches: [
        {
            find: "restartPlugin",
            replacement: {
                match: /restartPlugin/,
                replace: ""
            }
        }
    ],
    async start() {
        await checkUpdate();

        const customSettingsSections = (
            Vencord.Plugins.plugins.Settings as any as {
                customSections: ((ID: Record<string, unknown>) => any)[];
            }
        ).customSections;

        customSettingsSections.push(() => ({
            section: "PluginRepo",
            label: "Plugin Repo",
            element: require("./Components/PluginsRepoTab").default,
            className: "vc-plugin0-repo",
        }));
    }
});
