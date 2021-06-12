import { classd } from "classd";

export function Item({ item, itemActions, dispatch }) {
  return (
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
      <div className="mods">
        {[...item.mods.prefix, ...item.mods.suffix].map((mod) => {
          return mod.stats.map((stat) => <p>{stat.id}</p>);
        })}
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
  );
}
