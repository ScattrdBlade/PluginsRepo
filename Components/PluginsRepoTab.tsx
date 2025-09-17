/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";
import { Flex } from "@components/Flex";
import { InfoIcon } from "@components/Icons";
import { SettingsTab } from "@components/settings/tabs/BaseTab";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { PluginNative } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { Card, Forms, React, Select, Text, TextInput, useEffect, useState } from "@webpack/common";

import { PluginInfo, presetPlugins, SearchStatus } from "../types";
import { AddonCard } from "./AddonCard";
import InstallButton from "./InstallButton";
import { openPluginModal } from "./PluginModal";

const Native = VencordNative.pluginHelpers.PluginRepo as PluginNative<typeof import("../native")>;

const cl = classNameFactory("vc-plugins-");

const InputStyles = findByPropsLazy("inputDefault", "inputWrapper");
const ButtonClasses = findByPropsLazy("button", "disabled", "enabled");

function ExtraPluginsTab() {
    const [searchValue, setSearchValue] = useState({ value: "", status: SearchStatus.ALL });
    const [installedPluginStatuses, setInstalledPluginStatuses] = useState<Record<string, boolean>>({});

    const checkInstalledPlugins = async () => {
        try {
            const installedPlugins = await Native.getInstalledPlugins();
            const statuses: Record<string, boolean> = {};
            presetPlugins.forEach(plugin => {
                statuses[plugin.filesearch] = installedPlugins.includes(plugin.filesearch);
            });
            setInstalledPluginStatuses(statuses);
        } catch (error) {
            console.error("Failed to fetch installed plugins", error);
        }
    };

    useEffect(() => {
        checkInstalledPlugins();
    }, []);

    const pluginFilter = (plugin: PluginInfo) => {
        const isPluginInstalled = installedPluginStatuses[plugin.filesearch] || false;
        const isNewPlugin = isNewlyAdded(plugin.dateAdded);

        if (searchValue.status === SearchStatus.INSTALLED && !isPluginInstalled) return false;
        if (searchValue.status === SearchStatus.NOT_INSTALLED && isPluginInstalled) return false;
        if (searchValue.status === SearchStatus.NEW && !isNewPlugin) return false;
        if (!searchValue.value.length) return true;

        const v = searchValue.value.toLowerCase();
        const matchSearch = plugin.name.toLowerCase().includes(v) || plugin.description.toLowerCase().includes(v) || plugin.tags?.some(t => t.toLowerCase().includes(v));

        return matchSearch;
    };

    const isNewlyAdded = (dateAdded: string): boolean => {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const unixTimestamp = parseInt(dateAdded, 10);
        const pluginAddedDate = new Date(unixTimestamp * 1000);

        return pluginAddedDate >= sevenDaysAgo;
    };

    const handleSearchChange = (newValue: string, field: string) => {
        setSearchValue(prev => ({ ...prev, [field]: newValue }));
        checkInstalledPlugins();
    };

    const sortedPlugins = [...presetPlugins].sort((a, b) => a.name.localeCompare(b.name));
    const filteredPlugins = sortedPlugins.filter(pluginFilter);

    return (
        <SettingsTab title="Plugin Repo">
            <Card className={classes("vc-settings-card", "vc-backup-restore-card")}>
                <Flex flexDirection="column">
                    <strong>Warning</strong>
                    <span>Third-party plugins are not maintained by Vencord, so they may not work as expected. Compatability is not guaranteed, although I'll do my best to ensure it. Use at your own risk.</span>
                </Flex>
            </Card>
            <Text variant="text-md/normal" className={Margins.bottom8}>
                This section allows you to add or remove third-party plugins for Vencord.
            </Text>
            <Forms.FormTitle tag="h5" className={classes(Margins.top20, Margins.bottom8)}>
                Filters
            </Forms.FormTitle>
            <div className={cl("filter-controls")}>
                <TextInput autoFocus value={searchValue.value} placeholder="Search for a plugin..." onChange={newValue => handleSearchChange(newValue, "value")} className={Margins.bottom20} />
                <div className={InputStyles.inputWrapper}>
                    <Select
                        options={[
                            { label: "Show All", value: SearchStatus.ALL, default: true },
                            { label: "Show Installed", value: SearchStatus.INSTALLED },
                            { label: "Show Not Installed", value: SearchStatus.NOT_INSTALLED },
                            { label: "Show New", value: SearchStatus.NEW }
                        ]}
                        serialize={String}
                        select={value => handleSearchChange(value, "status")}
                        isSelected={value => value === searchValue.status}
                        closeOnSelect={true}
                    />
                </div>
            </div>
            <Forms.FormTitle className={Margins.top20}>Plugins</Forms.FormTitle>
            <div className={cl("grid")}>
                {filteredPlugins.map(plugin => (
                    <AddonCard
                        key={plugin.filename}
                        name={plugin.name}
                        description={plugin.description}
                        enabled={plugin.started || false}
                        setEnabled={() => { }}
                        isNew={isNewlyAdded(plugin.dateAdded)}
                        disabled={false}
                        footer={<InstallButton plugin={plugin} />}
                        infoButton={
                            <button
                                role="switch"
                                onClick={() => openPluginModal(plugin)}
                                className={classes(ButtonClasses.button, cl("info-button"))}
                            >
                                <InfoIcon />
                            </button>
                        }
                    />
                ))}
            </div>
            <Forms.FormDivider className={Margins.top20} />
        </SettingsTab>
    );
}

export default ExtraPluginsTab;
