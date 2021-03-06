import { Template } from "./Utilities";

export interface Stat {
  [StatID: string]: {
    is_local: boolean;
    human_text: Template;
  };
}
