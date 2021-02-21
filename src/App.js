import React, { useReducer, useEffect, useRef } from "react";
import update, { extend } from "immutability-helper";
import { nanoid } from "nanoid";

import { classd } from "classd";

extend("$increment", (value, original) => original + value);

// Gamestate
// menu
// intro
// game loop
//   V
// purchasing
// manufacturing/transforming
// designing goods
// upgrading
//      V
// sourcing
// transport
// tooling
// warehousing

// need to purchase/find raw materials

function init(initialCount) {
    return { count: initialCount };
}
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return init(action.payload);
        default:
            throw new Error();
    }
}

function Counter({ initialCount }) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
        <>
            Count: {state.count}
            <button
                type="button"
                onClick={() =>
                    dispatch({ type: "reset", payload: initialCount })
                }
            >
                {" "}
                Reset
            </button>
            <button
                type="button"
                onClick={() => dispatch({ type: "decrement" })}
            >
                -
            </button>
            <button
                type="button"
                onClick={() => dispatch({ type: "increment" })}
            >
                +
            </button>
        </>
    );
}

function initGameState() {
    return {
        playerName: "user",
        messages: [],
        warehouse: {
            space: 188,
            materials: {
                iron: 12,
                energy: 200,
                crafted: [],
            },
        },
    };
}

// depends on if need to have ordered or random access more frequently
// let a = {
//     type: "item",
//     shape: "array",
//     pk: "id",
//     data: { "a": { id: "a", name: "donkey" }, b: },
//     order: ["a", "b", "c"],
//     fetch:
// };
function buildMessageObject(type, text) {
    const colorMap = {
        success: "green",
        info: "gray",
        warn: "orange",
        error: "red",
    };
    return { text, id: nanoid(), type, color: colorMap[type] };
}

function gameReducer(state, action) {
    switch (action.type) {
        case "craft":
            return state.warehouse.materials.iron > 0 &&
                state.warehouse.materials.energy > 5
                ? update(state, {
                      messages: {
                          $unshift: [
                              buildMessageObject("success", "Created an item"),
                          ],
                      },
                      warehouse: {
                          space: { $increment: 0 }, // 1 iron exchanged for 1 item
                          materials: {
                              iron: { $increment: -1 },
                              energy: { $increment: -5 },
                              crafted: {
                                  $push: [
                                      {
                                          id: nanoid(),
                                          name: `Sword ${nanoid(4)}`,
                                          value: Math.floor(
                                              Math.random() * 12 + 1
                                          ),
                                      },
                                  ],
                              },
                          },
                      },
                  })
                : update(state, {
                      messages: {
                          $unshift: [
                              buildMessageObject(
                                  "error",
                                  "You don't have enough materials"
                              ),
                          ],
                      },
                  });
        case "sell": {
            const [foundItem] = state.warehouse.materials.crafted.filter(
                (item) => item.id === action.payload.id
            );

            if (foundItem) {
                return update(state, {
                    messages: {
                        $unshift: [
                            buildMessageObject(
                                "info",
                                `Sold ${foundItem.name}`
                            ),
                        ],
                    },
                    warehouse: {
                        space: { $increment: 1 },
                        materials: {
                            energy: { $increment: foundItem.value },
                            crafted: {
                                $apply: (arr) =>
                                    arr.filter(
                                        (item) => item.id !== action.payload.id
                                    ),
                            },
                        },
                    },
                });
            }

            return update(state, {
                messages: {
                    $unshift: [buildMessageObject("error", "Item not found")],
                },
            });
        }
        case "buyIron": {
            if (
                state.warehouse.materials.energy >= action.payload &&
                state.warehouse.space - action.payload > 0
            ) {
                return update(state, {
                    messages: {
                        $unshift: [
                            buildMessageObject(
                                "success",
                                `Bought ${action.payload} iron for ${action.payload} energy`
                            ),
                        ],
                    },
                    warehouse: {
                        space: { $increment: -action.payload },
                        materials: {
                            iron: { $increment: action.payload },
                            energy: { $increment: -action.payload },
                        },
                    },
                });
            }
            return update(state, {
                messages: {
                    $unshift: [
                        buildMessageObject(
                            "error",
                            `You don't have enough space or energy`
                        ),
                    ],
                },
            });
        }
        case "cueMessage":
            return update(state, {
                messages: {
                    $unshift: [
                        buildMessageObject(
                            action.payload.type,
                            action.payload.text
                        ),
                    ],
                },
            });
        case "popMessage":
            return update(state, { messages: { $splice: [[-1, 1]] } });
        case "reset":
            return initGameState(0);
        default:
            console.log(`Error: ${JSON.stringify(action)}`);
            throw new Error();
    }
}

function App() {
    const [state, dispatch] = useReducer(gameReducer, 0, initGameState);

    const clearTimerRef = useRef(null);
    useEffect(() => {
        if (state.messages.length > 0 && !clearTimerRef.current) {
            clearTimerRef.current = setInterval(() => {
                dispatch({ type: "popMessage" });
            }, 2500);
        } else if (state.messages.length === 0) {
            clearInterval(clearTimerRef.current);
            clearTimerRef.current = null;
        }

        // return () => {
        //     console.log("unmounted");
        //     if (clearTimerRef.current) {
        //         console.log(
        //             "removed timeout on unmount",
        //             clearTimerRef.current
        //         );
        //         clearInterval(clearTimerRef.current);
        //         clearTimerRef.current = null;
        //     }
        // };
    }, [state.messages]);

    const renderItems = () => (
        <ul className="grid grid-cols-3 gap-4">
            {state.warehouse.materials.crafted.map((item) => (
                <li key={item.id} className="text-lg shadow p-2">
                    <div className="flex flex-row justify-between">
                        <div className="text-medium">{item.name}</div>
                        <div className="font-bold">${item.value}</div>
                    </div>
                    <button
                        type="button"
                        className="border-2 border-purple-500 hover:border-gray-500 bg-transparent text-purple-700 hover:text-gray-700 py-1 w-full font-semibold rounded-md"
                        onClick={() =>
                            dispatch({ type: "sell", payload: { id: item.id } })
                        }
                    >
                        Sell
                    </button>
                </li>
            ))}
        </ul>
    );

    const handleMessage = (type, message) => {
        dispatch({ type: "cueMessage", payload: { type, message } });
    };
    useEffect(() => {
        handleMessage("success", "Welcome to the game!");
    }, []);

    const displayMessages = () => (
        <ul>
            {state.messages.map((message) => (
                <li key={message.id} className="flex justify-around my-2">
                    <span className="relative inline-flex rounded-md shadow-sm">
                        <div className="inline-flex items-center px-4 py-2 border border-gray-400 text-base leading-6 font-medium rounded-md text-gray-800 bg-white">
                            {message.text}
                        </div>
                        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                            <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${message.color}-400 opacity-75`}
                            >
                                {}
                            </span>
                            <span
                                className={`relative inline-flex rounded-full h-3 w-3 bg-${message.color}-500`}
                            >
                                {}
                            </span>
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="grid grid-cols-4 w-11/12 my-4 mx-auto font-sans">
            <div className="main col-span-2">
                <div className="text-2xl">Space: {state.warehouse.space}</div>
                <div className="text-2xl">
                    Energy: {state.warehouse.materials.energy}
                </div>
                <div className="text-2xl">
                    Iron: {state.warehouse.materials.iron}
                </div>
                <div className="text-2xl">
                    Items ({state.warehouse.materials.crafted.length}):{" "}
                    {renderItems()}
                </div>
            </div>
            <div className="controls grid gap-4 h-64">
                <button
                    className="border-gray-900 border-2 m-2"
                    type="button"
                    onClick={() => dispatch({ type: "craft" })}
                >
                    generate
                </button>
                <button
                    type="button"
                    onClick={() => dispatch({ type: "buyIron", payload: 5 })}
                >
                    Buy 5 Iron
                </button>
                <button
                    type="button"
                    onClick={() => dispatch({ type: "reset" })}
                >
                    Reset the Game
                </button>
            </div>
            <div
                className="messages overflow-y-scroll"
                style={{ scrollbarWidth: "none", maxHeight: "94vh" }}
            >
                {displayMessages()}
            </div>
        </div>
    );
}

export default App;
