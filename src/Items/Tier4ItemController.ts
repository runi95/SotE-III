import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import * as unclassedItemController from './UnclassedItemController';
import * as tier3ItemController from './Tier3ItemController';
import { AdvancedStrengthOfTheWild } from './Tier4Items/AdvancedStrengthOfTheWild';

const unclassedItemMap: Map<string, Item> = unclassedItemController.itemMap;
const tier3ItemMap: Map<string, ItemRecipe> = tier3ItemController.itemMap;

/**
 * Tier 4 Item Controller
 *
 * Qualifiers:
 * - is a recipe item made only from tier 3 items
 * - is used in 0 recipes
 * - has an enhanced unique effect inherited from it's tier 3 recipe items
 * - has a total cost between 60750 to 121500 gold
 */
export const itemMap: Map<string, ItemRecipe> = new Map();

itemMap.set(
    'advancedStrengthOfTheWild',
    new AdvancedStrengthOfTheWild(
        tier3ItemMap.get('improvedStrengthOfTheWild') as ItemRecipe,
        unclassedItemMap.get('greenSoulstone') as Item,
    ),
);

export default [...itemMap.values()] as ItemRecipe[];
