import React, { useReducer, useEffect, useRef } from "react";
import { produce } from "immer";

import { nanoid } from "nanoid";

import { classd } from "classd";

import { GLOBALS } from "./gameObjects/Globals";
import { generateItems } from "./gameObjects/ItemBuilder";

// TODO: create utils for working with arrays of objects with ids

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

// Messing around with plotly histograms: https://stackoverflow.com/questions/918736/random-number-generator-that-produces-a-power-law-distribution
// var x = [];
// let gen_num = () => {
//     const distributionPower = 3.0;
//     const uniformVariate = Math.random();
//     const low = 0.0;
//     const high = 1;
//     return (
//         ((high ** (distributionPower + 1) - low ** (distributionPower + 1)) *
//             uniformVariate +
//             low ** (distributionPower + 1)) **
//         (1 / (distributionPower + 1))
//     );
// };

// for (var i = 0; i < 100000; i++) {
//     x[i] = gen_num();
// }

// var trace = {
//     x: x,
//     type: "histogram",
// };
// var data = [trace];
// Plotly.newPlot("myDiv", data);

interface IGameState {
  actions: {
    tooling: {
      action: string;
      size: "primary" | "secondary";
      text: string;
    }[];
    materials: {
      action: string;
      size: string;
      text: string;
    }[];
  };
  player: {
    playerName: string;
    tooling: any[];
  };
  messages: IMessage[];
  warehouse: {
    space: any;
    materials: {
      iron: number;
      energy: number;
      crafted: any[];
    };
  };
}

function initGameState(): IGameState {
  return {
    actions: {
      tooling: [{ action: "unequip", size: "primary", text: "⚔" }],
      materials: [
        { action: "sell", size: "primary", text: "Sell" },
        { action: "equip", size: "secondary", text: "⚔" },
      ],
    },
    player: {
      playerName: "user",
      tooling: [],
    },
    messages: [],
    warehouse: {
      space: GLOBALS.START.WAREHOUSE.SPACE,
      materials: {
        iron: GLOBALS.START.WAREHOUSE.IRON,
        energy: GLOBALS.START.WAREHOUSE.ENERGY,
        crafted: [],
      },
    },
  } as IGameState;
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

interface IMessage {
  text: string;
  uuid: string;
  type: "success" | "info" | "warn" | "error";
  color: string;
}

function buildMessageObject(type, text): IMessage {
  const colorMap = {
    success: "green",
    info: "gray",
    warn: "orange",
    error: "red",
  };
  return { text, uuid: nanoid(), type, color: colorMap[type] };
}

const gameReducer = produce((draft: IGameState, action) => {
  switch (action.type) {
    case "craft":
      if (
        draft.warehouse.materials.iron > 0 &&
        draft.warehouse.materials.energy > 5
      ) {
        draft.messages.unshift(
          buildMessageObject("success", "Created an item")
        );
        draft.warehouse.materials.iron -= 1;
        draft.warehouse.materials.energy -= 5;
        draft.warehouse.materials.crafted.push(generateItems()[0]);
      } else {
        draft.messages.unshift(
          buildMessageObject("error", "You don't have enough materials")
        );
      }
      return;
    case "sell": {
      const [foundItem] = draft.warehouse.materials.crafted.filter(
        (item) => item.uuid === action.payload.uuid
      );

      if (foundItem) {
        draft.messages.unshift(
          buildMessageObject("info", `Sold ${foundItem.name}`)
        );
        draft.warehouse.space += 1;
        draft.warehouse.materials.energy += foundItem.value;
        draft.warehouse.materials.crafted = draft.warehouse.materials.crafted.filter(
          (item) => item.uuid !== action.payload.uuid
        );
      } else {
        draft.messages.unshift(buildMessageObject("error", "Item not found"));
      }

      return;
    }
    case "buyIron":
      if (
        draft.warehouse.materials.energy >= action.payload &&
        draft.warehouse.space - action.payload > 0
      ) {
        draft.messages.unshift(
          buildMessageObject(
            "info",
            `Bought ${action.payload} iron for ${action.payload} energy`
          )
        );
        draft.warehouse.space -= action.payload;
        draft.warehouse.materials.iron += action.payload;
        draft.warehouse.materials.energy -= action.payload;
      } else {
        draft.messages.unshift(
          buildMessageObject("error", `You don't have enough space or energy`)
        );
      }
      return;
    case "equip": {
      const [foundItem] = draft.warehouse.materials.crafted.filter(
        (item) => item.uuid === action.payload.uuid
      );

      if (
        foundItem &&
        draft.player.tooling.length < GLOBALS.PLAYER.TOOLING.CAPACITY.MAX
      ) {
        draft.messages.unshift(buildMessageObject("success", `Equipped item`));
        draft.player.tooling.push(foundItem);
        draft.warehouse.space += 1;
        draft.warehouse.materials.crafted = draft.warehouse.materials.crafted.filter(
          (item) => item.uuid !== foundItem.uuid
        );
      } else {
        draft.messages.unshift(
          buildMessageObject(
            "error",
            `Too many items equipped or item not found`
          )
        );
      }
      return;
    }
    case "unequip": {
      const [foundItem] = draft.player.tooling.filter(
        (item) => item.uuid === action.payload.uuid
      );

      if (foundItem && draft.warehouse.space > 0) {
        draft.messages.unshift(
          buildMessageObject("success", `Unequipped item`)
        );
        draft.player.tooling = draft.player.tooling.filter(
          (item) => item.uuid !== foundItem.uuid
        );
        draft.warehouse.space -= 1;
        draft.warehouse.materials.crafted.push(foundItem);
      }
      return;
    }
    case "cueMessage":
      draft.messages.unshift(
        buildMessageObject(action.payload.type, action.payload.text)
      );
      return;
    case "popMessage":
      draft.messages.pop();
      return;
    case "reset":
      return initGameState();
    default:
      console.log(`Error: ${JSON.stringify(action)}`);
      throw new Error();
  }
});

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

  const renderItems = (items, itemActions) => (
    <ul className="grid grid-flow-row-dense grid-cols-2 gap-4">
      {items.map((item) => (
        <li key={item.uuid} className="text-lg shadow p-2">
          <div className="flex flex-row justify-between">
            <div
              className={classd`font-bold ${{
                "text-green-600": item.rarity.id === "enchanted",
                "text-blue-600": item.rarity.id === "maged",
                "text-red-500": item.rarity.id === "legendary",
              }}`}
            >
              {item.name}
            </div>
            <div className="font-bold">${item.value}</div>
          </div>
          <div className="flex flex-row">
            {itemActions.map((action) => {
              const buttonStyles = classd`
                            border-2 hover:border-gray-500 bg-transparent py-1 px-2 rounded-md  
                            ${[
                              action.size === "primary" &&
                                "w-auto flex-grow border-purple-500 text-purple-700 hover:text-gray-700",
                              action.size === "secondary" &&
                                "w-1/4 flex-shrink border-gray-500 text-gray-700 hover:text-gray-500",
                            ]}`;

              return (
                <button
                  type="button"
                  className={buttonStyles}
                  onClick={() =>
                    dispatch({
                      type: action.action,
                      payload: { uuid: item.uuid },
                    })
                  }
                >
                  {action.text}
                </button>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );

  const handleMessage = (type, text) => {
    dispatch({ type: "cueMessage", payload: { type, text } });
  };
  useEffect(() => {
    handleMessage("success", "Welcome to the game!");
  }, []);

  const displayMessages = () => (
    <ul>
      {state.messages.map((message) => (
        <li key={message.uuid} className="flex justify-around mr-2 my-2">
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

  const makeItem = () => {
    const items = generateItems();
    if (items.length > 0) {
      handleMessage("info", items[0].name);
    } else {
      handleMessage("info", "No Item Generated");
    }
  };

  return (
    <div className="grid grid-cols-4 w-11/12 my-4 mx-auto font-sans">
      <div className="main col-span-2">
        <div className="text-2xl">Space: {state.warehouse.space}</div>
        <div className="text-2xl">
          Energy: {state.warehouse.materials.energy}
        </div>
        <div className="text-2xl">Iron: {state.warehouse.materials.iron}</div>
        <div className="text-2xl">
          Inventory ({state.warehouse.materials.crafted.length}):{" "}
          {renderItems(
            state.warehouse.materials.crafted,
            state.actions.materials
          )}
        </div>
      </div>
      <div className="controls grid gap-4 h-full">
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
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          Reset the Game
        </button>
        <button type="button" onClick={() => makeItem()}>
          Reset the Game
        </button>
        <div className="text-2xl">
          Tooling ({state.player.tooling.length}):{" "}
          {renderItems(state.player.tooling, state.actions.tooling)}
        </div>
      </div>
      <div
        className="messages overflow-y-scroll overflow-x-visible"
        style={{ scrollbarWidth: "none", maxHeight: "94vh" }}
      >
        {displayMessages()}
      </div>
    </div>
  );
}

export default App;
