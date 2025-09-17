/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotification } from "@api/Notifications";
import { relaunch } from "@utils/native";
import { PluginNative } from "@utils/types";
import { React, showToast, useEffect, useState } from "@webpack/common";

import { PluginInfo } from "../types";

const Native = VencordNative.pluginHelpers.PluginRepo as PluginNative<typeof import("../native")>;

const InstallButton: React.FC<{ plugin: PluginInfo; }> = ({ plugin }) => {
    const [installing, setInstalling] = useState(false);
    const [installError, setInstallError] = useState("");
    const [isInstalled, setIsInstalled] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const checkIfInstalled = async () => {
            try {
                const installedPlugins = await Native.getInstalledPlugins();
                setIsInstalled(installedPlugins.includes(plugin.filesearch));
            } catch (error) {
                console.error("Failed to fetch installed plugins", error);
            }
        };

        checkIfInstalled();
    }, [plugin.filename, plugin.filesearch]);

    const showRestartPrompt = (isInstall: boolean = true) => {
        showNotification({
            title: isInstall ? "Plugin installed successfully!" : "Plugin uninstalled successfully!",
            body: "Click here to restart Discord and apply the changes.",
            permanent: true,
            noPersist: false,
            onClick: () => {
                relaunch();
            }
        });
    };

    const handleInstall = async () => {
        if (isInstalled && !hovering) {
            console.log("Plugin already installed.");
            return;
        }
        if (isInstalled && hovering) {
            console.log("Uninstalling...");
            setInstalling(true);
            try {
                await Native.uninstallPlugin(plugin);
                setIsInstalled(false);
                console.log("Uninstallation successful");
                showToast("Uninstallation Successful");
                showRestartPrompt(false);
            } catch (error) {
                console.error("Error uninstalling plugin", error);
                setInstallError("Error uninstalling plugin: " + error);
                showToast("Error uninstalling plugin");
            }
            setInstalling(false);
            setHovering(false);
            return;
        }
        setInstalling(true);
        setInstallError("");
        try {
            console.log("Installing...");
            await Native.installPlugin(plugin);

            setIsInstalled(true);
            console.log("Installation Successful");
            showToast("Installation Successful");
            showRestartPrompt(true);
        } catch (error) {
            console.error("Error Installing Plugin", error);
            setInstallError("Error Installing plugin: " + error);
            showToast("Error installing plugin");
        } finally {
            setInstalling(false);
        }
    };

    const buttonStyle = {
        fontSize: "16px",
        padding: "10px 20px",
        cursor: installing ? "not-allowed" : "pointer",
        backgroundColor: (isInstalled && hovering) ? "#ED4245" : "#5865F2",
        color: "white",
    };

    return (
        <div className="vc-button-container">
            <button
                className="vc-install-button"
                onClick={handleInstall}
                onMouseEnter={() => isInstalled && setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                disabled={installing}
                style={buttonStyle}
            >
                {isInstalled && !hovering ? "Installed" : (isInstalled && hovering ? "Uninstall" : (installing ? "Installing..." : "Install"))}
            </button>
            {installError && <p style={{ color: "red" }}>Error: {installError}</p>}
        </div>
    );
};

export default InstallButton;
