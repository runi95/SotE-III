import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import * as unclassedItemController from './UnclassedItemController';
import * as tier2ItemController from './Tier2ItemController';
import { ImprovedStrengthOfTheWild } from './Tier3Items/ImprovedStrengthOfTheWild';
import { AncientBookOfMagic } from './Tier3Items/AncientBookOfMagic';
import { DragonScales } from './Tier3Items/DragonScales';
import { AdvancedCreatureClaws } from './Tier3Items/AdvancedCreatureClaws';
import { Soulcage } from './Tier3Items/Soulcage';
import { SwordOfNaegling } from './Tier3Items/SwordOfNaegling';
import { ReinforcedScales } from './Tier3Items/ReinforcedScales';
import { FlakCannons } from './Tier3Items/FlakCannons';
import { ArcaniteSpear } from './Tier3Items/ArcaniteSpear';
import { EnhancedJavelin } from './Tier3Items/EnhancedJavelin';
import { ScrollOfWisdom } from './Tier3Items/ScrollOfWisdom';

const unclassedItemMap: Map<string, Item> = unclassedItemController.itemMap;
const tier2ItemMap: Map<string, ItemRecipe> = tier2ItemController.itemMap;

/**
 * Tier 3 Item Controller
 *
 * Qualifiers:
 * - is a recipe item made only from tier 2 items
 * - is used in 0 to 1 recipes
 * - has a unique effect not found in any other tier 3 or lower tier item
 * - has a total cost between 20250 to 40500 gold
 */
export const itemMap: Map<string, ItemRecipe> = new Map();

itemMap.set(
    'advancedCreatureClaws',
    new AdvancedCreatureClaws(
        tier2ItemMap.get('improvedCreatureClaws') as ItemRecipe,
        unclassedItemMap.get('purpleSoulstone') as ItemRecipe,
    ),
);
itemMap.set(
    'ancientBookOfMagic',
    new AncientBookOfMagic(tier2ItemMap.get('bookOfMagic') as ItemRecipe, unclassedItemMap.get('blueSoulstone') as ItemRecipe),
);
itemMap.set('arcaniteSpear', new ArcaniteSpear(tier2ItemMap.get('thoriumSpear') as ItemRecipe));
itemMap.set('dragonScales', new DragonScales(tier2ItemMap.get('improvedCreatureClaws') as ItemRecipe));
itemMap.set(
    'enhancedJavelin',
    new EnhancedJavelin(tier2ItemMap.get('thoriumSpear') as ItemRecipe, tier2ItemMap.get('shamanClaws') as ItemRecipe),
);
itemMap.set('flakCannons', new FlakCannons(tier2ItemMap.get('advancedCannon') as ItemRecipe));
itemMap.set('improvedStrengthOfTheWild', new ImprovedStrengthOfTheWild(tier2ItemMap.get('strengthOfTheWild') as ItemRecipe));
itemMap.set('reinforcedScales', new ReinforcedScales(tier2ItemMap.get('coralScales') as ItemRecipe));
itemMap.set(
    'scrollOfWisdom',
    new ScrollOfWisdom(tier2ItemMap.get('vialOfMagic') as ItemRecipe, tier2ItemMap.get('enhancedMaskOfProficiency') as ItemRecipe),
);
itemMap.set(
    'soulcage',
    new Soulcage(
        tier2ItemMap.get('emptySoulcage') as ItemRecipe,
        unclassedItemMap.get('greenSoulstone') as ItemRecipe,
        unclassedItemMap.get('blueSoulstone') as ItemRecipe,
        unclassedItemMap.get('purpleSoulstone') as ItemRecipe,
    ),
);
itemMap.set('swordOfNaegling', new SwordOfNaegling(tier2ItemMap.get('fragarach') as ItemRecipe));

export default [...itemMap.values()] as ItemRecipe[];
