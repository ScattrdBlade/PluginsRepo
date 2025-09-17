/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import "./addonCard.css";

import { classNameFactory } from "@api/Styles";
import { AddonBadge } from "@components/settings/PluginBadge";
import { Text } from "@webpack/common";

import type { Props } from "../types";

const cl = classNameFactory("vc-addon-");

export function AddonCard({ disabled, isNew, name, infoButton, footer, author, enabled, setEnabled, description, onMouseEnter, onMouseLeave }: Props) {
    return (
        <div
            className={cl("card", { "card-disabled": disabled })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={cl("header")}>
                <div className={cl("name-author")}>
                    <Text variant="text-md/bold" className={cl("name")}>
                        {name}{isNew && <AddonBadge text="NEW" color="#ED4245" />}
                    </Text>
                    {!!author && (
                        <Text variant="text-md/normal" className={cl("author")}>
                            {author}
                        </Text>
                    )}
                </div>

                {infoButton}
            </div>

            <Text className={cl("note")} variant="text-sm/normal">{description}</Text>

            {footer}
        </div>
    );
}
