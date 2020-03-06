import { ItemRecipe } from './ItemRecipe';
import * as tier1ItemController from './Tier1ItemController';
import { VialOfMagic } from './Tier2Items/VialOfMagic';
import { MaskOfDeath } from './Tier2Items/MaskOfDeath';
import { ArcaniteSpear } from './Tier2Items/ArcaniteSpear';
import { ImprovedCreatureClaws } from './Tier2Items/ImprovedCreatureClaws';
import { ImprovedBalancedShield } from './Tier2Items/ImprovedBalancedShield';
import { ScrollOfAgility } from './Tier2Items/ScrollOfAgility';
import { Fragarach } from './Tier2Items/Fragarach';
import { SpellShield } from './Tier2Items/SpellShield';
import { StrengthOfTheWild } from './Tier2Items/StrengthOfTheWild';
import { ChargedStone } from './Tier2Items/ChargedStone';
import { MasterStaff } from './Tier2Items/MasterStaff';
import { BookOfMagic } from './Tier2Items/BookOfMagic';
import { ManaInfusedMask } from './Tier2Items/ManaInfusedMask';
import { AssassinsCloak } from './Tier2Items/AssassinsCloak';
import { EmptySoulcage } from './Tier2Items/EmptySoulcage';
import { CoralScales } from './Tier2Items/CoralScales';
import { StoneArmor } from './Tier2Items/StoneArmor';
import { ImprovedShimmerWeed } from './Tier2Items/ImprovedShimmerWeed';
import { SunkenShard } from './Tier2Items/SunkenShard';
import { EnhancedMantleOfIntelligence } from './Tier2Items/EnhancedMantleOfIntelligence';
import { ShamanClaws } from './Tier2Items/ShamanClaws';
import { DevouringFangs } from './Tier2Items/DevouringFangs';

const tier1ItemMap: Map<string, ItemRecipe> = tier1ItemController.itemMap;

/**
 * Tier 2 Item Controller
 *
 * Qualifiers:
 * - is a recipe item made only from tier 1 items
 * - is used in 1 to 2 recipes
 * - has a total cost between 6750 to 13500 gold
 */
export const itemMap: Map<string, ItemRecipe> = new Map();
itemMap.set(
    'arcaniteSpear',
    new ArcaniteSpear(tier1ItemMap.get('thoriumSpear') as ItemRecipe, tier1ItemMap.get('longRifle') as ItemRecipe),
);
itemMap.set('assassinsCloak', new AssassinsCloak(tier1ItemMap.get('cloakOfShadowWalk') as ItemRecipe));
itemMap.set('bookOfMagic', new BookOfMagic(tier1ItemMap.get('bookOfKnowledge') as ItemRecipe));
itemMap.set(
    'chargedStone',
    new ChargedStone(tier1ItemMap.get('manaStone') as ItemRecipe, tier1ItemMap.get('brightLifeStone') as ItemRecipe),
);
itemMap.set(
    'coralScales',
    new CoralScales(tier1ItemMap.get('improvedReinforcedHide') as ItemRecipe, tier1ItemMap.get('reinforcedLeatherArmor') as ItemRecipe),
);
itemMap.set(
    'devouringFangs',
    new DevouringFangs(
        tier1ItemMap.get('fastVampireClaws') as ItemRecipe,
        tier1ItemMap.get('vampireFangs') as ItemRecipe,
        tier1ItemMap.get('creatureClaws') as ItemRecipe,
    ),
);
itemMap.set('emptySoulcage', new EmptySoulcage());
itemMap.set(
    'enhancedMantleOfIntelligence',
    new EnhancedMantleOfIntelligence(
        tier1ItemMap.get('mantleOfIntelligence') as ItemRecipe,
        tier1ItemMap.get('bookOfKnowledge') as ItemRecipe,
    ),
);
itemMap.set('fragarach', new Fragarach(tier1ItemMap.get('iceBlade') as ItemRecipe, tier1ItemMap.get('ironClaws') as ItemRecipe));
itemMap.set(
    'improvedBalancedShield',
    new ImprovedBalancedShield(
        tier1ItemMap.get('balancedShield') as ItemRecipe,
        tier1ItemMap.get('steelShield') as ItemRecipe,
        tier1ItemMap.get('improvedMoonArmor') as ItemRecipe,
    ),
);
itemMap.set('improvedCreatureClaws', new ImprovedCreatureClaws(tier1ItemMap.get('creatureClaws') as ItemRecipe));
itemMap.set(
    'improvedShimmerWeed',
    new ImprovedShimmerWeed(
        tier1ItemMap.get('shimmerWeed') as ItemRecipe,
        tier1ItemMap.get('brightLifeStone') as ItemRecipe,
        tier1ItemMap.get('reinforcedLeatherArmor') as ItemRecipe,
    ),
);
itemMap.set(
    'manaInfusedMask',
    new ManaInfusedMask(tier1ItemMap.get('maskOfProficiency') as ItemRecipe, tier1ItemMap.get('fullVial') as ItemRecipe),
);
itemMap.set('maskOfDeath', new MaskOfDeath(tier1ItemMap.get('vampireFangs') as ItemRecipe, tier1ItemMap.get('loadedRifle') as ItemRecipe));
itemMap.set('masterStaff', new MasterStaff(tier1ItemMap.get('adeptStaff') as ItemRecipe));
itemMap.set('scrollOfAgility', new ScrollOfAgility(tier1ItemMap.get('agileSlippers') as ItemRecipe));
itemMap.set('shamanClaws', new ShamanClaws(tier1ItemMap.get('creatureClaws') as ItemRecipe, tier1ItemMap.get('ironClaws') as ItemRecipe));
itemMap.set('spellShield', new SpellShield(tier1ItemMap.get('lionsRing') as ItemRecipe));
itemMap.set('stoneArmor', new StoneArmor(tier1ItemMap.get('balancedShield') as ItemRecipe, tier1ItemMap.get('skullShield') as ItemRecipe));
itemMap.set('strengthOfTheWild', new StrengthOfTheWild(tier1ItemMap.get('maulOfStrength') as ItemRecipe) as ItemRecipe);
itemMap.set('sunkenShard', new SunkenShard(tier1ItemMap.get('shimmerWeed') as ItemRecipe, tier1ItemMap.get('manaStone') as ItemRecipe));
itemMap.set('vialOfMagic', new VialOfMagic(tier1ItemMap.get('fullVial') as ItemRecipe));

export default [...itemMap.values()] as ItemRecipe[];
