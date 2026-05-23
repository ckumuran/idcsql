import { useState } from "react";

import { useStore }
from "../store/useStore";

export default function ConnectionModal() {

    const {

        addConnection

    } = useStore();

    const [name, setName] =
        useState("");

    const [type, setType] =
        useState("mysql");

    const [host, setHost] =
        useState("localhost");

    const [port, setPort] =
        useState("");

    const [database, setDatabase] =
        useState("");

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    function handleSave() {

        addConnection({

            id: Date.now(),

            name,

            type,

            host,

            port,

            username,

            password,

            database
        });

        alert(
            "Connection saved"
        );
    }

    return (

        <div
            className="
                cyber-panel
                rounded-2xl
                p-5
                mt-6
            "
        >

            <div
                className="
                    text-red-400
                    mb-5
                    tracking-widest
                "
            >
                NEW CONNECTION
            </div>

            <div
                className="
                    space-y-4
                "
            >

                <input
                    placeholder="Connection Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <select

                    value={type}

                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                >

                    <option value="mysql">
                        MySQL
                    </option>

                    <option value="postgres">
                        PostgreSQL
                    </option>

                    <option value="sqlite">
                        SQLite
                    </option>

                </select>

                <input
                    placeholder="Host"

                    value={host}

                    onChange={(e) =>
                        setHost(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <input
                    placeholder="Port"

                    value={port}

                    onChange={(e) =>
                        setPort(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <input
                    placeholder="Database"

                    value={database}

                    onChange={(e) =>
                        setDatabase(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <input
                    placeholder="Username"

                    value={username}

                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <input
                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        bg-black
                        border
                        border-red-950
                        p-3
                        rounded-lg
                    "
                />

                <button

                    onClick={handleSave}

                    className="
                        bg-red-950
                        hover:bg-red-900
                        border
                        border-red-700
                        px-5
                        py-3
                        rounded-xl
                    "
                >
                    SAVE CONNECTION
                </button>

            </div>

        </div>
    );
}
