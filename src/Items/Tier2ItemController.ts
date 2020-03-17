import { ItemRecipe } from './ItemRecipe';
import * as tier1ItemController from './Tier1ItemController';
import { VialOfMagic } from './Tier2Items/VialOfMagic';
import { MaskOfDeath } from './Tier2Items/MaskOfDeath';
import { ImprovedCreatureClaws } from './Tier2Items/ImprovedCreatureClaws';
import { ImprovedBalancedShield } from './Tier2Items/ImprovedBalancedShield';
import { ScrollOfAgility } from './Tier2Items/ScrollOfAgility';
import { Fragarach } from './Tier2Items/Fragarach';
import { SpellShield } from './Tier2Items/SpellShield';
import { StrengthOfTheWild } from './Tier2Items/StrengthOfTheWild';
import { ChargedStone } from './Tier2Items/ChargedStone';
import { MasterStaff } from './Tier2Items/MasterStaff';
import { BookOfMagic } from './Tier2Items/BookOfMagic';
import { RingOfMagic } from './Tier2Items/RingOfMagic';
import { AssassinsCloak } from './Tier2Items/AssassinsCloak';
import { EmptySoulcage } from './Tier2Items/EmptySoulcage';
import { CoralScales } from './Tier2Items/CoralScales';
import { StoneArmor } from './Tier2Items/StoneArmor';
import { ImprovedShimmerWeed } from './Tier2Items/ImprovedShimmerWeed';
import { SunkenShard } from './Tier2Items/SunkenShard';
import { EnhancedMantleOfIntelligence } from './Tier2Items/EnhancedMantleOfIntelligence';
import { ShamanClaws } from './Tier2Items/ShamanClaws';
import { DevouringFangs } from './Tier2Items/DevouringFangs';
import { DruidsCrow } from './Tier2Items/DruidsCrow';
import { ImprovedNaturesBlessing } from './Tier2Items/ImprovedNaturesBlessing';
import { BoneChimes } from './Tier2Items/BoneChimes';
import { MedallionOfCourage } from './Tier2Items/MedallionOfCourage';
import { EnhancedMaskOfProficiency } from './Tier2Items/EnhancedMaskOfProficiency';
import { Quills } from './Tier2Items/Quills';
import { ImpalingBolt } from './Tier2Items/ImpalingBolt';
import { ImprovedAmuletOfProtection } from './Tier2Items/ImprovedAmuletOfProtection';
import { ImprovedElementalOrb } from './Tier2Items/ImprovedElementalOrb';
import { AdvancedCannon } from './Tier2Items/AdvancedCannon';
import { FierceTrident } from './Tier2Items/FierceTrident';
import { RingOfPerseverance } from './Tier2Items/RingOfPerseverance';
import { ThoriumSpear } from './Tier2Items/ThoriumSpear';
import { ImprovedSpikes } from './Tier2Items/ImprovedSpikes';

const tier1ItemMap: Map<string, ItemRecipe> = tier1ItemController.itemMap;

/**
 * Tier 2 Item Controller
 *
 * Qualifiers:
 * - is a recipe item made only from tier 1 items
 * - is used in 0 to 2 recipes
 * - has a total cost between 6750 to 13500 gold
 */
export const itemMap: Map<string, ItemRecipe> = new Map();
itemMap.set(
    'advancedCannon',
    new AdvancedCannon(tier1ItemMap.get('loadedCannon') as ItemRecipe, tier1ItemMap.get('loadedRifle') as ItemRecipe),
);
itemMap.set('assassinsCloak', new AssassinsCloak(tier1ItemMap.get('cloakOfShadowWalk') as ItemRecipe));
itemMap.set('boneChimes', new BoneChimes(tier1ItemMap.get('javelin') as ItemRecipe, tier1ItemMap.get('vampireFangs') as ItemRecipe));
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
itemMap.set(
    'druidsCrow',
    new DruidsCrow(tier1ItemMap.get('improvedMoonArmor') as ItemRecipe, tier1ItemMap.get('khadgarsAmulet') as ItemRecipe),
);
itemMap.set('emptySoulcage', new EmptySoulcage());
itemMap.set(
    'enhancedMantleOfIntelligence',
    new EnhancedMantleOfIntelligence(
        tier1ItemMap.get('mantleOfIntelligence') as ItemRecipe,
        tier1ItemMap.get('bookOfKnowledge') as ItemRecipe,
    ),
);
itemMap.set('enhancedMaskOfProficiency', new EnhancedMaskOfProficiency(tier1ItemMap.get('maskOfProficiency') as ItemRecipe));
itemMap.set('fierceTrident', new FierceTrident(tier1ItemMap.get('masterExecutionerAxe') as ItemRecipe));
itemMap.set('fragarach', new Fragarach(tier1ItemMap.get('iceBlade') as ItemRecipe, tier1ItemMap.get('ironClaws') as ItemRecipe));
itemMap.set(
    'impalingBolt',
    new ImpalingBolt(tier1ItemMap.get('sharpSteelAxe') as ItemRecipe, tier1ItemMap.get('loadedRifle') as ItemRecipe),
);
itemMap.set(
    'improvedAmuletOfProtection',
    new ImprovedAmuletOfProtection(
        tier1ItemMap.get('amuletOfProtection') as ItemRecipe,
        tier1ItemMap.get('reinforcedLeatherArmor') as ItemRecipe,
    ),
);
itemMap.set(
    'improvedBalancedShield',
    new ImprovedBalancedShield(
        tier1ItemMap.get('balancedShield') as ItemRecipe,
        tier1ItemMap.get('steelShield') as ItemRecipe,
        tier1ItemMap.get('improvedMoonArmor') as ItemRecipe,
    ),
);
itemMap.set('improvedCreatureClaws', new ImprovedCreatureClaws(tier1ItemMap.get('creatureClaws') as ItemRecipe));
itemMap.set('improvedElementalOrb', new ImprovedElementalOrb(tier1ItemMap.get('elementalOrb') as ItemRecipe));
itemMap.set(
    'improvedNaturesBlessing',
    new ImprovedNaturesBlessing(
        tier1ItemMap.get('naturesBlessing') as ItemRecipe,
        tier1ItemMap.get('improvedReinforcedHide') as ItemRecipe,
    ),
);
itemMap.set(
    'improvedShimmerWeed',
    new ImprovedShimmerWeed(
        tier1ItemMap.get('shimmerWeed') as ItemRecipe,
        tier1ItemMap.get('brightLifeStone') as ItemRecipe,
        tier1ItemMap.get('reinforcedLeatherArmor') as ItemRecipe,
    ),
);
itemMap.set(
    'improvedSpikes',
    new ImprovedSpikes(tier1ItemMap.get('spikedWood') as ItemRecipe, tier1ItemMap.get('spikedCarapace') as ItemRecipe),
);
itemMap.set('maskOfDeath', new MaskOfDeath(tier1ItemMap.get('vampireFangs') as ItemRecipe, tier1ItemMap.get('loadedRifle') as ItemRecipe));
itemMap.set('masterStaff', new MasterStaff(tier1ItemMap.get('adeptStaff') as ItemRecipe));
itemMap.set(
    'medallionOfCourage',
    new MedallionOfCourage(tier1ItemMap.get('maulOfStrength') as ItemRecipe, tier1ItemMap.get('steelShield') as ItemRecipe),
);
itemMap.set('quills', new Quills(tier1ItemMap.get('skullShield') as ItemRecipe));
itemMap.set(
    'ringOfMagic',
    new RingOfMagic(tier1ItemMap.get('maskOfProficiency') as ItemRecipe, tier1ItemMap.get('fullVial') as ItemRecipe),
);
itemMap.set(
    'ringOfPerseverance',
    new RingOfPerseverance(tier1ItemMap.get('ringOfSuperiority') as ItemRecipe, tier1ItemMap.get('manaStone') as ItemRecipe),
);
itemMap.set('scrollOfAgility', new ScrollOfAgility(tier1ItemMap.get('agileSlippers') as ItemRecipe));
itemMap.set('shamanClaws', new ShamanClaws(tier1ItemMap.get('creatureClaws') as ItemRecipe, tier1ItemMap.get('ironClaws') as ItemRecipe));
itemMap.set('spellShield', new SpellShield(tier1ItemMap.get('lionsRing') as ItemRecipe));
itemMap.set('stoneArmor', new StoneArmor(tier1ItemMap.get('balancedShield') as ItemRecipe, tier1ItemMap.get('skullShield') as ItemRecipe));
itemMap.set('strengthOfTheWild', new StrengthOfTheWild(tier1ItemMap.get('maulOfStrength') as ItemRecipe) as ItemRecipe);
itemMap.set('sunkenShard', new SunkenShard(tier1ItemMap.get('shimmerWeed') as ItemRecipe, tier1ItemMap.get('manaStone') as ItemRecipe));
itemMap.set('thoriumSpear', new ThoriumSpear(tier1ItemMap.get('javelin') as ItemRecipe, tier1ItemMap.get('longRifle') as ItemRecipe));
itemMap.set('vialOfMagic', new VialOfMagic(tier1ItemMap.get('fullVial') as ItemRecipe, tier1ItemMap.get('bookOfKnowledge') as ItemRecipe));

export default [...itemMap.values()] as ItemRecipe[];
