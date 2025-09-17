/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { MouseEventHandler, ReactNode } from "react";

export interface PluginInfo {
    name: string; // name of the plugin
    filename: string; // name of what the file/folder in plugindir should be (if blank, that means skip creating a folder. if ends in file extension, don't create a folder and just rename the singular file and leave it in plugdir)
    filesearch: string;
    downloadUrl: string;
    downloadFiles?: string[]; // files to download from the zip
    description: string;
    tags: string[];
    dateAdded: string;
    started?: boolean | undefined; // Will get integrated later on
}

export const enum SearchStatus {
    ALL,
    INSTALLED,
    NOT_INSTALLED,
    NEW
}

export interface Props {
    name: ReactNode;
    description: ReactNode;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    disabled?: boolean;
    isNew?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;

    infoButton?: ReactNode;
    footer?: ReactNode;
    author?: ReactNode;
}

/*
 * PRESET PLUGINS CONFIGURATION
 *
 * Add new plugins to this array following the structure below.
 * Each plugin entry should follow this format:
 *
 * REQUIRED FIELDS:
 * - name: Display name shown in the Plugin Repo UI
 * - filename: How the plugin will be stored in userplugins/
 *   - Without extension (e.g., "MyPlugin"): Creates a folder
 *   - With extension (e.g., "myPlugin.ts"): Creates a single file
 * - filesearch: Internal ID for plugin management (usually same as filename)
 * - downloadUrl: Direct link to ZIP file download
 * - description: What the plugin does (shown in UI)
 * - tags: Search keywords (e.g., ["music", "customization"])
 * - dateAdded: Unix timestamp (use Date.now() for current time)
 *
 * OPTIONAL FIELDS:
 * - downloadFiles: Specific files/folders to extract from ZIP
 *   - If omitted, ALL files from the repository will be downloaded
 *   - Use parentheses () to skip folders: "(unwanted)/file.ts"
 *   - Examples:
 *     - ["index.ts"] - Extract just index.ts
 *     - ["(src)/index.ts"] - Extract index.ts but skip 'src' folder
 *     - ["components", "index.tsx"] - Extract components folder and index.tsx
 *     - Don't include downloadFiles to extract everything
 *
 * EXAMPLES:
 *
 * Single file plugin:
 * {
 *     name: "SimplePlugin",
 *     filename: "simplePlugin.ts",
 *     filesearch: "simplePlugin",
 *     downloadUrl: "https://github.com/user/plugin/archive/main.zip",
 *     downloadFiles: ["(src)/plugin.ts"], // Extracts as simplePlugin.ts
 *     description: "Does something simple",
 *     tags: ["utility"],
 *     dateAdded: "1234567890"
 * }
 *
 * Multi-file plugin:
 * {
 *     name: "ComplexPlugin",
 *     filename: "ComplexPlugin",
 *     filesearch: "ComplexPlugin",
 *     downloadUrl: "https://github.com/user/plugin/archive/main.zip",
 *     downloadFiles: ["components", "utils", "index.tsx"],
 *     description: "A complex plugin with multiple files",
 *     tags: ["ui", "advanced"],
 *     dateAdded: "1234567890"
 * }
 *
 * Download entire repository:
 * {
 *     name: "FullRepoPlugin",
 *     filename: "fullRepoPlugin",
 *     filesearch: "fullRepoPlugin",
 *     downloadUrl: "https://github.com/user/plugin/archive/main.zip",
 *     // No downloadFiles specified - extracts everything
 *     description: "Downloads all files from repository",
 *     tags: ["utility", "complete"],
 *     dateAdded: "1234567890"
 * }
 *
 * IMPORTANT NOTES:
 * - Always test plugins before adding them
 * - Follow the same formatting as existing entries
 * - Include trailing comma after each plugin object
 * - Keep plugins alphabetically sorted by name
 * - Verify download URLs work and point to public repositories
 * - Use relevant tags that help users find plugins
 */

export const presetPlugins: PluginInfo[] = [
    {
        name: "Animalese",
        filename: "vencord-animalese",
        filesearch: "vencord-animalese",
        downloadUrl: "https://github.com/ryawaa/vencord-animalese/archive/refs/heads/main.zip",
        description: "Animalese yapping in your discord client",
        tags: ["fun", "audio", "typing", "sound-effects", "animal-crossing"],
        dateAdded: "1716920268"
    },
    {
        name: "AntiRickRoll",
        filename: "vencord-antirickroll",
        filesearch: "vencord-antirickroll",
        downloadUrl: "https://github.com/ryawaa/vencord-antirickroll/archive/refs/heads/main.zip",
        description: "Warns you of potential Rickrolls in messages, including masked links (supports custom rules)",
        tags: ["utility", "safety", "protection", "link-checking"],
        dateAdded: "1734209767"
    },
    {
        name: "atSomeone",
        filename: "vc-atsomeone",
        filesearch: "vc-atsomeone",
        downloadUrl: "https://github.com/Masterjoona/vc-atsomeone/archive/refs/heads/main.zip",
        description: "Mention someone randomly",
        tags: ["fun", "social", "ping"],
        dateAdded: "1734209767"
    },
    {
        name: "BetterActivities",
        filename: "vc-betterActivities",
        filesearch: "vc-betterActivities",
        downloadUrl: "https://github.com/D3SOX/vc-betterActivities/archive/refs/heads/master.zip",
        description: "Shows activity icons in the member list and allows showing all activities",
        tags: ["ui", "customization"],
        dateAdded: "1734209767"
    },
    {
        name: "BetterForwardMeta",
        filename: "betterForwardMeta",
        filesearch: "betterForwardMeta",
        downloadUrl: "https://git.nin0.dev/userplugins/betterForwardMeta/archive/main.zip",
        description: "Access server profile under forwarded messages (if available) and always show time",
        tags: ["ui", "messaging", "customization", "timestamps"],
        dateAdded: "1747254107"
    },
    {
        name: "BetterPlusReacts",
        filename: "vc-betterplusreacts",
        filesearch: "vc-betterplusreacts",
        downloadUrl: "https://github.com/Masterjoona/vc-betterplusreacts/archive/refs/heads/main.zip",
        description: "The amount of the pluses you add is the message the reaction will get added to!",
        tags: ["utility", "reactions", "emoji", "numbering"],
        dateAdded: "1734209767"
    },
    {
        name: "BetterSpotifyCard",
        filename: "betterSpotifyCard",
        filesearch: "betterSpotifyCard",
        downloadUrl: "https://git.nin0.dev/userplugins/betterSpotifyCard/archive/main.zip",
        description: "Show more info on the Spotify activity card",
        tags: ["music", "customization", "integration"],
        dateAdded: "1747254107"
    },
    {
        name: "BigFileUpload",
        filename: "BigFileUpload",
        filesearch: "BigFileUpload",
        downloadUrl: "https://github.com/ScattrdBlade/bigFileUpload/archive/refs/heads/main.zip",
        description: "Bypass Discord's upload limit by uploading files using the 'Upload a Big File' button or /fileupload and they'll get uploaded as links into chat via file uploaders.",
        tags: ["nitro", "utility"],
        dateAdded: "1734209767"
    },
    {
        name: "BlockKrisp",
        filename: "vc-blockKrisp",
        filesearch: "vc-blockKrisp",
        downloadUrl: "https://github.com/D3SOX/vc-blockKrisp/archive/refs/heads/master.zip",
        description: "Prevent Krisp from loading",
        tags: ["audio", "performance", "blocking", "voice"],
        dateAdded: "1734209767"
    },
    {
        name: "CategoryCloner",
        filename: "vencord-category-cloner",
        filesearch: "vencord-category-cloner",
        downloadUrl: "https://github.com/mafineeek/vencord-category-cloner/archive/refs/heads/main.zip",
        description: "Adds \"Clone category\" context menu option which is missing natively.",
        tags: ["utility", "server-management", "moderation"],
        dateAdded: "1734209767"
    },
    {
        name: "ClientSideBadges",
        filename: "clientSideBadges",
        filesearch: "clientSideBadges",
        downloadUrl: "https://git.nin0.dev/userplugins/clientSideBadges/archive/main.zip",
        description: "Add to your profile some badges on the client side (OTHER USERS CAN'T SEE YOUR BADGES)",
        tags: ["customization", "cosmetic"],
        dateAdded: "1747254107"
    },
    {
        name: "CollapseChatButtons",
        filename: "collapseChatButtons",
        filesearch: "collapseChatButtons",
        downloadUrl: "https://github.com/coldcord/collapseChatButtons/archive/refs/heads/master.zip",
        description: "Collapse the chat buttons at any time you want. Just press a single button.",
        tags: ["ui", "customization", "interface", "minimal"],
        dateAdded: "1734209767"
    },
    {
        name: "CopyFolderId",
        filename: "vc-copyFolderId",
        filesearch: "vc-copyFolderId",
        downloadUrl: "https://github.com/sadan4/vc-copyFolderId/archive/refs/heads/main.zip",
        description: "Adds an option to copy folder ids. This isn't used that much, but when you need it its really annoying to get.",
        tags: ["utility", "developer", "folders"],
        dateAdded: "1734209767"
    },
    {
        name: "CopyStatusUrls",
        filename: "vc-copyStatusUrls",
        filesearch: "vc-copyStatusUrls",
        downloadUrl: "https://github.com/sadan4/vc-copyStatusUrls/archive/refs/heads/main.zip",
        description: "Copy the users status url when you right-click it",
        tags: ["utility", "rich-presence", "context-menu", "developer"],
        dateAdded: "1734209767"
    },
    {
        name: "CtrlEnterSave",
        filename: "vc-ctrlEnterSave",
        filesearch: "vc-ctrlEnterSave",
        downloadUrl: "https://github.com/sadan4/vc-ctrlEnterSave/archive/refs/heads/main.zip",
        description: "Adds the keybind ctrl+enter to save changes when editing channels, servers, roles etc.",
        tags: ["utility", "keyboard", "shortcuts"],
        dateAdded: "1734209767"
    },
    {
        name: "CustomSounds",
        filename: "customSounds",
        filesearch: "customSounds",
        downloadUrl: "https://github.com/ScattrdBlade/customSounds/archive/refs/heads/main.zip",
        description: "Replace any Discord sound with a sound of your choice",
        tags: ["nitro", "audio", "customization", "notifications"],
        dateAdded: "1716920268"
    },
    {
        name: "Cute AnimeBoys",
        filename: "cuteAnimeBoys.ts",
        filesearch: "cuteAnimeBoys.ts",
        downloadUrl: "https://github.com/ScattrdBlade/CuteAnimeBoys/archive/refs/heads/main.zip",
        description: "Add a command to send cute anime boys in the chat",
        tags: ["fun", "commands", "images"],
        dateAdded: "1715326747"
    },
    {
        name: "DevToolsInPopouts",
        filename: "vc-devtoolsInPopouts",
        filesearch: "vc-devtoolsInPopouts",
        downloadUrl: "https://github.com/sadan4/vc-devtoolsInPopouts/archive/refs/heads/main.zip",
        description: "Adds react devtools to popout windows",
        tags: ["developer", "debugging"],
        dateAdded: "1716920268"
    },
    {
        name: "DiscordColorways",
        filename: "DiscordColorways-VencordUserplugin",
        filesearch: "DiscordColorways-VencordUserplugin",
        downloadUrl: "https://github.com/DaBluLite/DiscordColorways-VencordUserplugin/archive/refs/heads/master.zip",
        description: "A plugin that offers easy access to simple color schemes/themes for Discord, also known as Colorways",
        tags: ["customization", "themes", "colors", "appearance"],
        dateAdded: "1734209767"
    },
    {
        name: "EmojiOnMouseUp",
        filename: "emojiOnMouseUp",
        filesearch: "emojiOnMouseUp",
        downloadUrl: "https://github.com/sadan4/emojiOnMouseUp/archive/refs/heads/main.zip",
        description: "This is a simple plugin that sends the emoji you are hovering when you release your mouse.",
        tags: ["utility", "quick-send"],
        dateAdded: "1734209767"
    },
    {
        name: "Encryptcord",
        filename: "Encryptcord",
        filesearch: "Encryptcord",
        downloadUrl: "https://github.com/Inbestigator/encryptcord/archive/refs/heads/main.zip",
        description: "Encryptcord allows you to securely communicate with other people using end-to-end encryption.",
        tags: ["privacy", "security", "communication"],
        dateAdded: "1734209767"
    },
    {
        name: "ExitSounds",
        filename: "vencord-ExitSounds",
        filesearch: "vencord-ExitSounds",
        downloadUrl: "https://github.com/hauntii/vencord-ExitSounds/archive/refs/heads/main.zip",
        description: "Plays a soundboard to others when you disconnect from a call!",
        tags: ["fun", "audio", "voice-chat"],
        dateAdded: "1734209767"
    },
    {
        name: "FollowUser",
        filename: "vc-followUser",
        filesearch: "vc-followUser",
        downloadUrl: "https://github.com/D3SOX/vc-followUser/archive/refs/heads/master.zip",
        description: "Adds a follow option in the user context menu to always be in the same VC as them",
        tags: ["social", "voice-chat", "following", "automation"],
        dateAdded: "1734209767"
    },
    {
        name: "ForceRoleColor",
        filename: "ForceRoleColor",
        filesearch: "ForceRoleColor",
        downloadUrl: "https://github.com/surgedevs/ForceRoleColor/archive/refs/heads/main.zip",
        description: "Allows you to force your role color globally (supports gradient roles!)",
        tags: ["customization", "colors", "appearance"],
        dateAdded: "1716920268"
    },
    {
        name: "FriendCodes",
        filename: "FriendCodes",
        filesearch: "FriendCodes",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/FriendCodes/archive/refs/heads/main.zip",
        description: "Generate FriendCodes to easily add friends",
        tags: ["social", "utility", "qr-codes"],
        dateAdded: "1734209767"
    },
    {
        name: "GlobalBadges",
        filename: "GlobalBadges",
        filesearch: "GlobalBadges",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/GlobalBadges/archive/refs/heads/main.zip",
        description: "Adds global badges from other client mods",
        tags: ["customization", "profile", "community"],
        dateAdded: "1734209767"
    },
    {
        name: "GoodPerson",
        filename: "vc-goodperson",
        filesearch: "vc-goodperson",
        downloadUrl: "https://git.nin0.dev/userplugins/vc-goodperson/archive/main.zip",
        description: "Makes you (or others) a good person",
        tags: ["fun", "social"],
        dateAdded: "1747254107"
    },
    {
        name: "HolyNotes",
        filename: "HolyNotes-VC",
        filesearch: "HolyNotes-VC",
        downloadUrl: "https://github.com/WolfPlugs/HolyNotes-VC/archive/refs/heads/main.zip",
        description: "Save messages on a personal notebook, u can store a large amount of messages on this notebook",
        tags: ["utility", "storage", "organization"],
        dateAdded: "1734209767"
    },
    {
        name: "IconViewer",
        filename: "iconViewer",
        filesearch: "iconViewer",
        downloadUrl: "https://github.com/coldcord/iconViewer/archive/refs/heads/master.zip",
        description: "Adds a new tab to settings, to preview all icons",
        tags: ["developer", "UI", "preview"],
        dateAdded: "1734209767"
    },
    {
        name: "Jumpscare",
        filename: "VencordJumpscare",
        filesearch: "VencordJumpscare",
        downloadUrl: "https://github.com/surgedevs/VencordJumpscare/archive/refs/heads/main.zip",
        description: "Adds a configurable chance of jumpscaring you whenever you open any channel",
        tags: ["fun", "surprise", "random"],
        dateAdded: "1734209767"
    },
    {
        name: "KaTeX",
        filename: "ventex",
        filesearch: "ventex",
        downloadUrl: "https://github.com/vgskye/ventex/archive/refs/heads/rubber.zip",
        description: "TeX typesetting in discord",
        tags: ["utility", "math", "formatting"],
        dateAdded: "1734209767"
    },
    {
        name: "KeyboardSounds",
        filename: "KeyboardSounds",
        filesearch: "KeyboardSounds",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/KeyboardSounds/archive/refs/heads/main.zip",
        description: "Adds the Opera GX Keyboard Sounds to Discord",
        tags: ["audio", "typing", "customization", "sound-effects"],
        dateAdded: "1734209767"
    },
    {
        name: "KeywordNotify",
        filename: "vencord-KeywordNotify",
        filesearch: "vencord-KeywordNotify",
        downloadUrl: "https://github.com/x3rt/vencord-KeywordNotify/archive/refs/heads/main.zip",
        description: "\"ping\" the user if a message matches custom regular expressions",
        tags: ["utility", "notifications", "keywords", "regex"],
        dateAdded: "1734209767"
    },
    {
        name: "LoginWithQR",
        filename: "LoginWithQR",
        filesearch: "LoginWithQR",
        downloadUrl: "https://github.com/nexpid/LoginWithQR/archive/refs/heads/main.zip",
        description: "Allows you to login to another device by scanning a login QR code, just like on mobile!",
        tags: ["utility", "authentication", "qr-codes"],
        dateAdded: "1734209767"
    },
    {
        name: "MediaPlaybackSpeed",
        filename: "vc-mediaPlaybackSpeed",
        filesearch: "vc-mediaPlaybackSpeed",
        downloadUrl: "https://github.com/D3SOX/vc-mediaPlaybackSpeed/archive/refs/heads/master.zip",
        description: "Allows changing the (default) playback speed of media embeds",
        tags: ["utility", "video", "control"],
        dateAdded: "1734209767"
    },
    {
        name: "MessageColors",
        filename: "vc-messageColors",
        filesearch: "vc-messageColors",
        downloadUrl: "https://github.com/henmalib/vc-messageColors/archive/refs/heads/main.zip",
        description: "Displays color codes like #cba6f7 or rgb(255,0,0) inside of messages",
        tags: ["utility", "developer", "preview"],
        dateAdded: "1734209767"
    },
    {
        name: "MessageLoggerEnhanced",
        filename: "vc-message-logger-enhanced",
        filesearch: "vc-message-logger-enhanced",
        downloadUrl: "https://github.com/Syncxv/vc-message-logger-enhanced/archive/refs/heads/master.zip",
        description: "Logs messages, images, and ghost pings in Discord. The plugin saves messages to a json file, and can restore them after reloading Discord",
        tags: ["utility", "logging", "deleted-messages", "history"],
        dateAdded: "1726250000"
    },
    {
        name: "MoreReact",
        filename: "moreReact",
        filesearch: "moreReact",
        downloadUrl: "https://github.com/coldcord/moreReact/archive/refs/heads/main.zip",
        description: "Modify the max count of frencency reactions.",
        tags: ["utility", "customization"],
        dateAdded: "1734209767"
    },
    {
        name: "Multistickers",
        filename: "multistickers",
        filesearch: "multistickers",
        downloadUrl: "https://github.com/voidfill/multistickers/archive/refs/heads/main.zip",
        description: "Let's you send up to 3 stickers and shift click stickers. WARNING: this plugin may get you banned since it uses the api in ways a real client doesn't",
        tags: ["nitro", "multiple", "nitro"],
        dateAdded: "1715326747"
    },
    {
        name: "NeverPausePreviews",
        filename: "NeverPausePreviews",
        filesearch: "NeverPausePreviews",
        downloadUrl: "https://github.com/RattletraPM/NeverPausePreviews/archive/refs/heads/main.zip",
        description: "Prevents in-call/PiP previews (screenshare, streams, etc) from pausing even if the client loses focus",
        tags: ["utility", "streaming"],
        dateAdded: "1734209767"
    },
    {
        name: "NewPluginsManager",
        filename: "vc-newPluginsManager",
        filesearch: "vc-newPluginsManager",
        downloadUrl: "https://github.com/Sqaaakoi/vc-newPluginsManager/archive/refs/heads/main.zip",
        description: "Utility that notifies you when new plugins are added to Vencord",
        tags: ["utility", "notifications", "plugin-management", "updates"],
        dateAdded: "1734209767"
    },
    {
        name: "NoActivityFeedSend",
        filename: "noActivityFeedSend",
        filesearch: "noActivityFeedSend",
        downloadUrl: "https://git.nin0.dev/userplugins/noActivityFeedSend/archive/main.zip",
        description: "Disables sending activity/Spotify history to Discord, effectively hiding it from activity history",
        tags: ["privacy", "stealth"],
        dateAdded: "1747254107"
    },
    {
        name: "NotifyUserChanges",
        filename: "vc-notifyUserChanges",
        filesearch: "vc-notifyUserChanges",
        downloadUrl: "https://github.com/D3SOX/vc-notifyUserChanges/archive/refs/heads/master.zip",
        description: "Adds a notify option in the user context menu to get notified when a user changes voice channels or online status",
        tags: ["social", "notifications", "status", "tracking"],
        dateAdded: "1734209767"
    },
    {
        name: "OfficialThemeBaseForce",
        filename: "OfficialThemeBaseForce",
        filesearch: "OfficialThemeBaseForce",
        downloadUrl: "https://github.com/surgedevs/OfficialThemeBaseForce/archive/refs/heads/main.zip",
        description: "Allows you to force a different theme base on official Discord themes",
        tags: ["nitro", "themes", "customization", "appearance"],
        dateAdded: "1716920268"
    },
    {
        name: "RandomGary",
        filename: "randomGary",
        filesearch: "randomGary",
        downloadUrl: "https://github.com/Zach11111/randomGary/archive/refs/heads/main.zip",
        description: "Adds a button to send random Gary, Minky, or cat pictures in your Discord chats!",
        tags: ["fun", "images", "cats"],
        dateAdded: "1734209767"
    },
    {
        name: "RenameVoiceDevices",
        filename: "renameVoiceDevices",
        filesearch: "renameVoiceDevices",
        downloadUrl: "https://git.nin0.dev/userplugins/renameVoiceDevices/archive/main.zip",
        description: "Rename voice input/output devices",
        tags: ["audio", "customization"],
        dateAdded: "1747254107"
    },
    {
        name: "ReplaceActivityTypes",
        filename: "replaceActivityTypes",
        filesearch: "replaceActivityTypes",
        downloadUrl: "https://github.com/nyakowint/replaceActivityTypes/archive/refs/heads/main.zip",
        description: "Swap the Activity Types of rich presence applications",
        tags: ["customization", "rich-presence", "activities", "modification"],
        dateAdded: "1734209767"
    },
    {
        name: "Sekai Stickers",
        filename: "sekaistickers-vencord",
        filesearch: "sekaistickers-vencord",
        downloadUrl: "https://github.com/MaiKokain/sekaistickers-vencord/archive/refs/heads/main.zip",
        description: "Sekai Stickers built in discord originally from github.com/TheOriginalAyaka",
        tags: ["anime", "fun"],
        dateAdded: "1715326747"
    },
    {
        name: "SentFromMyUname",
        filename: "sentFromMyUname",
        filesearch: "sentFromMyUname",
        downloadUrl: "https://git.nin0.dev/userplugins/sentFromMyUname/archive/main.zip",
        description: "Add your uname/useragent to every single message you send",
        tags: ["fun", "signature", "system-info", "messages"],
        dateAdded: "1747254107"
    },
    {
        name: "ServerProfilesToolbox",
        filename: "vc-serverProfilesToolbox",
        filesearch: "vc-serverProfilesToolbox",
        downloadUrl: "https://github.com/D3SOX/vc-serverProfilesToolbox/archive/refs/heads/master.zip",
        description: "Adds a copy/paste/reset button to the server profiles editor",
        tags: ["utility", "server-management", "profiles", "moderation"],
        dateAdded: "1734209767"
    },
    {
        name: "SidebarChat",
        filename: "vc-sidebarchat",
        filesearch: "vc-sidebarchat",
        downloadUrl: "https://github.com/Masterjoona/vc-sidebarchat/archive/refs/heads/main.zip",
        description: "Open a another channel or a DM as a sidebar or as a popout",
        tags: ["UI", "layout", "multi-channel", "productivity"],
        dateAdded: "1734209767"
    },
    {
        name: "SilentTyping (Enhanced)",
        filename: "vc-silentTypingEnhanced",
        filesearch: "vc-silentTypingEnhanced",
        downloadUrl: "https://github.com/D3SOX/vc-silentTypingEnhanced/archive/refs/heads/master.zip",
        description: "Enhanced version of SilentTyping with the feature to disable it for specific guilds or users",
        tags: ["privacy", "stealth", "selective"],
        dateAdded: "1734209767"
    },
    {
        name: "SillyMaxwell",
        filename: "sillyMaxwell",
        filesearch: "sillyMaxwell",
        downloadUrl: "https://github.com/1337isnot1337/sillyMaxwell/archive/refs/heads/master.zip",
        description: "Creates a gif of Maxwell the cat on your screen, who bounces around and dances",
        tags: ["fun", "animation", "desktop"],
        dateAdded: "1716920268"
    },
    {
        name: "SortReactions",
        filename: "SortReactions",
        filesearch: "SortReactions",
        downloadUrl: "https://github.com/HAHALOSAH/SortReactions/archive/refs/heads/main.zip",
        description: "Sorts reactions by count in chat.",
        tags: ["utility", "organization", "sorting"],
        dateAdded: "1734209767"
    },
    {
        name: "SoundTriggers",
        filename: "SoundTriggers",
        filesearch: "SoundTriggers",
        downloadUrl: "https://github.com/777Vincent/SoundTriggers/archive/refs/heads/main.zip",
        description: "SoundTriggers is a plugin that allows you to write your own custom triggers and sound links to play when that phrase is sent!",
        tags: ["audio", "automation", "soundboard"],
        dateAdded: "1716920268"
    },
    {
        name: "SpotifyAddToQueue.desktop",
        filename: "spotifyAddToQueue_desktop",
        filesearch: "spotifyAddToQueue_desktop",
        downloadUrl: "https://git.nin0.dev/userplugins/spotifyAddToQueue.desktop/archive/main.zip",
        description: "Adds a button in Spotify embeds to add the song to the queue",
        tags: ["music", "integration"],
        dateAdded: "1747254107"
    },
    {
        name: "SpotifyLyrics",
        filename: "vc-spotifylyrics",
        filesearch: "vc-spotifylyrics",
        downloadUrl: "https://github.com/Masterjoona/vc-spotifylyrics/archive/refs/heads/main.zip",
        description: "Show lyrics for the currently playing song on Spotify.",
        tags: ["music", "integration"],
        dateAdded: "1734209767"
    },
    {
        name: "spotifyMainColor",
        filename: "spotifyMainColor",
        filesearch: "spotifyMainColor",
        downloadUrl: "https://git.nin0.dev/userplugins/spotifyMainColor/archive/main.zip",
        description: "Averages the main color of your currently playing Spotify song and puts it in a CSS var",
        tags: ["music", "theming", "integration"],
        dateAdded: "1716920268"
    },
    {
        name: "StaticTitle",
        filename: "vc-staticTitle",
        filesearch: "vc-staticTitle",
        downloadUrl: "https://github.com/sadan4/vc-staticTitle/archive/refs/heads/main.zip",
        description: "Gives the discord window a static title, using the string of your choice",
        tags: ["customization", "title", "window", "appearance"],
        dateAdded: "1734209767"
    },
    {
        name: "SyncVRChatStatus",
        filename: "Vencord-SyncVRChatStatus",
        filesearch: "Vencord-SyncVRChatStatus",
        downloadUrl: "https://github.com/lillithkt/Vencord-SyncVRChatStatus/archive/refs/heads/main.zip",
        description: "Syncs your status between Discord and VRChat",
        tags: ["integration", "sync"],
        dateAdded: "1716920268"
    },
    {
        name: "TextProfileView",
        filename: "vc-fullUserInChatbox",
        filesearch: "vc-fullUserInChatbox",
        downloadUrl: "https://github.com/sadan4/vc-fullUserInChatbox/archive/refs/heads/main.zip",
        description: "Adds the full user mention object to the chat box",
        tags: ["ui", "mentions", "profiles", "customization"],
        dateAdded: "1734209767"
    },
    {
        name: "Theme Library",
        filename: "ThemeLibrary",
        filesearch: "ThemeLibrary",
        downloadUrl: "https://github.com/Faf4a/ThemeLibrary/archive/refs/heads/master.zip",
        description: "A library of themes for Vencord.",
        tags: ["themes", "customization", "appearance", "repository"],
        dateAdded: "1715326"
    },
    {
        name: "TimelessClips",
        filename: "vc-timelessclips",
        filesearch: "vc-timelessclips",
        downloadUrl: "https://github.com/Masterjoona/vc-timelessclips/archive/refs/heads/main.zip",
        description: "Allows you to set a custom clip length if you want to save more of your precious streams",
        tags: ["nitro", "streaming", "clips", "recording"],
        dateAdded: "1734209767"
    },
    {
        name: "TriggerWarning",
        filename: "vc-triggerwarning",
        filesearch: "vc-triggerwarning",
        downloadUrl: "https://github.com/Masterjoona/vc-triggerwarning/archive/refs/heads/main.zip",
        description: "Allows you to spoiler words in messages and files/embeds based on a list of keywords.",
        tags: ["moderation", "content-filtering", "spoilers", "safety"],
        dateAdded: "1734209767"
    },
    {
        name: "(Tweaked) VCNarrator",
        filename: "vcNarrator-custom",
        filesearch: "vcNarrator-custom",
        downloadUrl: "https://github.com/nyakowint/vcNarrator-custom/archive/refs/heads/main.zip",
        description: "VCNarrator but slightly modified",
        tags: ["accessibility", "voice-chat", "narrator", "modification"],
        dateAdded: "1734209767"
    },
    {
        name: "UnitConverter",
        filename: "plugin-unitConverter",
        filesearch: "plugin-unitConverter",
        downloadUrl: "https://github.com/sadan4/plugin-unitConverter/archive/refs/heads/main.zip",
        description: "Allows you to convert units to imperial or metric.",
        tags: ["utility", "conversion", "math", "tools"],
        dateAdded: "1734209767"
    },
    {
        name: "UnreadCountBadges",
        filename: "vc-unreadcountbadge",
        filesearch: "vc-unreadcountbadge",
        downloadUrl: "https://github.com/Masterjoona/vc-unreadcountbadge/archive/refs/heads/main.zip",
        description: "Show a badge in the channel list for unread messages",
        tags: ["ui", "notifications", "unread", "badges"],
        dateAdded: "1734209767"
    },
    {
        name: "UserFlags",
        filename: "userflags",
        filesearch: "userflags",
        downloadUrl: "https://git.nin0.dev/userplugins/userflags/archive/main.zip",
        description: "Add \"flags\" to users that will always show under their messages",
        tags: ["social", "labeling", "organization", "tags"],
        dateAdded: "1747254107"
    },
    {
        name: "UserpluginInstaller",
        filename: "userpluginInstaller",
        filesearch: "userpluginInstaller",
        downloadUrl: "https://git.nin0.dev/userplugins/userpluginInstaller/archive/main.zip",
        description: "Install Vencord userplugins with one click",
        tags: ["utility", "plugin-management", "installer", "automation"],
        dateAdded: "1747254107"
    },
    {
        name: "VCPanelSettings",
        filename: "vcPanelSettings",
        filesearch: "vcPanelSettings",
        downloadUrl: "https://git.nin0.dev/userplugins/vcPanelSettings/archive/main.zip",
        description: "Show output/input volumes/devices directly on the voice chat panel in the user area",
        tags: ["audio", "voice-chat", "panel", "controls"],
        dateAdded: "1747254107"
    },
    {
        name: "Venfetch",
        filename: "venfetch",
        filesearch: "venfetch",
        downloadUrl: "https://git.nin0.dev/userplugins/venfetch/archive/main.zip",
        description: "neofetch, for vencord",
        tags: ["fun", "system-info", "command", "terminal", "linux"],
        dateAdded: "1747254107"
    },
    {
        name: "VideoStartNotifier",
        filename: "videoStartNotifier",
        filesearch: "videoStartNotifier",
        downloadUrl: "https://github.com/redbaron2k7/videoStartNotifier/archive/refs/heads/main.zip",
        description: "Simple plugin that adds sound effects for when someone starts/stops their webcam in a voice channel.",
        tags: ["audio", "notifications", "voice-chat", "webcam"],
        dateAdded: "1734209767"
    },
    {
        name: "VoiceChatUtilities",
        filename: "vc-voiceChatUtilities",
        filesearch: "vc-voiceChatUtilities",
        downloadUrl: "https://github.com/D3SOX/vc-voiceChatUtilities/archive/refs/heads/master.zip",
        description: "Allows you to perform multiple actions on an entire channel (move, mute, disconnect, etc.)",
        tags: ["moderation", "voice-chat", "administration", "bulk-actions"],
        dateAdded: "1734209767"
    },
    {
        name: "WhosWatching",
        filename: "vencord-whos-watching",
        filesearch: "vencord-whos-watching",
        downloadUrl: "https://github.com/fres621/vencord-whos-watching/archive/refs/heads/main.zip",
        description: "View who's spectating your stream on Discord",
        tags: ["streaming", "viewers", "information"],
        dateAdded: "1734209767"
    },
    {
        name: "WigglyText",
        filename: "WigglyText",
        filesearch: "WigglyText",
        downloadUrl: "https://github.com/nexpid/WigglyText/archive/refs/heads/main.zip",
        description: "Adds a new markdown formatting that makes text wiggly.",
        tags: ["fun", "formatting", "animation", "text"],
        dateAdded: "1734209767"
    },
    {
        name: "WordCount",
        filename: "wordCount",
        filesearch: "wordCount",
        downloadUrl: "https://github.com/lumap/vencord-3rd-party-plugins/archive/refs/heads/main.zip",
        downloadFiles: ["wordCount/index.tsx"],
        description: "Shows the word and character count of the message below it. It doesn't display anything for messages under 6 words",
        tags: ["utility", "writing", "statistics", "counter", "text"],
        dateAdded: "1716920268"
    },
    {
        name: "WriteUpperCase",
        filename: "WriteUpperCase",
        filesearch: "WriteUpperCase",
        downloadUrl: "https://github.com/KrstlSkll69/WriteUpperCase/archive/refs/heads/main.zip",
        description: "Changes the first Letter of each Sentence in Message Inputs to Uppercase",
        tags: ["utility", "formatting", "capitalization", "typing", "text"],
        dateAdded: "1734209767"
    }
];

