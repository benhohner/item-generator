import React, { useReducer, useEffect, useRef } from "react";
import { produce } from "immer";

import { nanoid } from "nanoid";

import { GLOBALS } from "./gameObjects/Globals";
import { generateItems } from "./gameObjects/ItemBuilder";

import { ItemList } from "./gameObjects/components/ItemList";

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
        draft.warehouse.materials.crafted.push(action.payload.item);
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
        draft.warehouse.materials.crafted =
          draft.warehouse.materials.crafted.filter(
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
        draft.warehouse.materials.crafted =
          draft.warehouse.materials.crafted.filter(
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
  }, [state.messages]);

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

  const handleGenerate = () => {
    const item = generateItems()[0];
    console.log(item);
    dispatch({ type: "craft", payload: { item } });
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
          <ItemList
            items={state.warehouse.materials.crafted}
            itemActions={state.actions.materials}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div className="controls grid gap-4 h-full">
        <button
          className="border-gray-400 border-2 m-2"
          type="button"
          onClick={() => handleGenerate()}
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
        <div className="text-2xl">
          Tooling ({state.player.tooling.length}):{" "}
          <ItemList
            items={state.player.tooling}
            itemActions={state.actions.tooling}
            dispatch={dispatch}
          />
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
