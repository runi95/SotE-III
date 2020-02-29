import { ItemRecipe } from './ItemRecipe';
import * as tier1ItemController from './Tier1ItemController';
import * as tier2ItemController from './Tier2ItemController';
import * as tier3ItemController from './Tier3ItemController';
import * as tier4ItemController from './Tier4ItemController';

export const itemMap: Map<string, ItemRecipe> = new Map();

export default [...itemMap.values()]
    .concat(tier1ItemController.default)
    .concat(tier2ItemController.default)
    .concat(tier3ItemController.default)
    .concat(tier4ItemController.default) as ItemRecipe[];
