import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import * as basicItemController from './BaseItemController';
import { AdeptStaff } from './Tier1Items/AdeptStaff';
import { AgileSlippers } from './Tier1Items/AgileSlippers';
import { BalancedShield } from './Tier1Items/BalancedShield';
import { BrightLifeStone } from './Tier1Items/BrightLifeStone';
import { CreatureClaws } from './Tier1Items/CreatureClaws';
import { FullVial } from './Tier1Items/FullVial';
import { ImprovedMoonArmor } from './Tier1Items/ImprovedMoonArmor';
import { ImprovedReinforcedHide } from './Tier1Items/ImprovedReinforcedHide';
import { IronClaws } from './Tier1Items/IronClaws';
import { ManaStone } from './Tier1Items/ManaStone';
import { MaskOfProficiency } from './Tier1Items/MaskOfProficiency';
import { MaulOfStrength } from './Tier1Items/MaulOfStrength';
import { NaturesBlessing } from './Tier1Items/NaturesBlessing';
import { ReinforcedLeatherArmor } from './Tier1Items/ReinforcedLeatherArmor';
import { SharpSteelAxe } from './Tier1Items/SharpSteelAxe';
import { SpikedCarapace } from './Tier1Items/SpikedCarapace';
import { SpikedWood } from './Tier1Items/SpikedWood';
import { SteelShield } from './Tier1Items/SteelShield';
import { Javelin } from './Tier1Items/Javelin';
import { VampireFangs } from './Tier1Items/VampireFangs';
import { WandOfShadowsight } from './Tier1Items/WandOfShadowsight';
import { IceBlade } from './Tier1Items/IceBlade';
import { TheAegis } from './Tier1Items/TheAegis';
import { LionsRing } from './Tier1Items/LionsRing';
import { SwordOfFreyr } from './Tier1Items/SwordOfFreyr';
import { VampireDagger } from './Tier1Items/VampireDagger';
import { CloakOfShadowWalk } from './Tier1Items/CloakOfShadowWalk';
import { ArmoredBoots } from './Tier1Items/ArmoredBoots';
import { FieryBloodAxe } from './Tier1Items/FieryBloodAxe';
import { LongRifle } from './Tier1Items/LongRifle';
import { Caduceus } from './Tier1Items/Caduceus';
import { CircesStaff } from './Tier1Items/CircesStaff';
import { LightningBolt } from './Tier1Items/LightningBolt';
import { LoadedCannon } from './Tier1Items/LoadedCannon';
import { SnowyOwl } from './Tier1Items/SnowyOwl';
import { MasterCrystalBall } from './Tier1Items/MasterCrystalBall';
import { KhadgarsAmulet } from './Tier1Items/KhadgarsAmulet';
import { AmuletOfProtection } from './Tier1Items/AmuletOfProtection';
import { MasterExecutionerAxe } from './Tier1Items/MasterExecutionerAxe';
import { ShimmerWeed } from './Tier1Items/ShimmerWeed';
import { MantleOfIntelligence } from './Tier1Items/MantleOfIntelligence';
import { RingOfSuperiority } from './Tier1Items/RingOfSuperiority';
import { ElementalOrb } from './Tier1Items/ElementalOrb';
import { SkullShield } from './Tier1Items/SkullShield';
import { GoldenSabatons } from './Tier1Items/GoldenSabatons';
import { GiantsBoots } from './Tier1Items/GiantsBoots';
import { MagesSabatons } from './Tier1Items/MagesSabatons';
import { ScaledBoots } from './Tier1Items/ScaledBoots';
import { CoralScales } from './Tier1Items/CoralScales';
import { CrystalBall } from './Tier1Items/CrystalBall';
import { BeltOfGiantStrength } from './Tier1Items/BeltOfGiantStrength';
import { CrownOfKings } from './Tier1Items/CrownOfKings';
import { AgileBow } from './Tier1Items/AgileBow';
import { RingOfKings } from './Tier1Items/RingOfKings';
import { GlovesOfAntiMagic } from './Tier1Items/GlovesOfAntiMagic';
import { WandOfReanimation } from './Tier1Items/WandOfReanimation';
import { AncientFigurine } from './Tier1Items/AncientFigurine';
import { CorruptedClaws } from './Tier1Items/CorruptedClaws';
import { CorruptShield } from './Tier1Items/CorruptShield';
import { ClawsOfUnholyStrength } from './Tier1Items/ClawsOfUnholyStrength';

const basicItemMap: Map<string, Item> = basicItemController.itemMap;

/**
 * Tier 1 Item Controller
 *
 * Lower cost items in this tier are simple upgrades from their base components
 * Higher cost items in this tier are very strong items that are not meant to be replaced
 * until your other items consists of mostly t1 and t2 items
 * 
 * Average tier 1 item price should be around 1000 gold
 * 
 * Qualifiers:
 * - is a recipe item made only from basic items
 * - is used in 1 to 3 recipes
 * - has a total cost between 650  to 1500 gold
 */
export const itemMap: Map<string, ItemRecipe> = new Map();

itemMap.set('adeptStaff', new AdeptStaff(basicItemMap.get('fairyWand') as Item, basicItemMap.get('orbOfMagic') as Item));
itemMap.set('wandOfReanimation', new WandOfReanimation(basicItemMap.get('emptyVial') as Item, basicItemMap.get('lifeStone') as Item, basicItemMap.get('scepter') as Item));
itemMap.set('ancientFigurine', new AncientFigurine(basicItemMap.get('orbOfMagic') as Item, basicItemMap.get('studdedLeatherArmor') as Item));
itemMap.set('corruptedClaws', new CorruptedClaws(basicItemMap.get('claws') as Item, basicItemMap.get('orbOfCorruption') as Item));
itemMap.set('corruptShield', new CorruptShield(basicItemMap.get('orbOfMagic') as Item, basicItemMap.get('ironShield') as Item));
itemMap.set('clawsOfUnholyStrength', new ClawsOfUnholyStrength(basicItemMap.get('claws') as Item));
// itemMap.set('agileSlippers', new AgileSlippers(basicItemMap.get('bootsOfSpeed') as Item));
/*
itemMap.set(
    'amuletOfProtection',
    new AmuletOfProtection(basicItemMap.get('amuletOfSpellReflection') as Item, basicItemMap.get('studdedLeatherArmor') as Item),
);
*/
/*
itemMap.set('armoredBoots', new ArmoredBoots(basicItemMap.get('bootsOfSpeed') as Item, basicItemMap.get('ironShield') as Item));
itemMap.set('balancedShield', new BalancedShield(basicItemMap.get('ironShield') as Item, basicItemMap.get('studdedLeatherArmor') as Item));
itemMap.set('brightLifeStone', new BrightLifeStone(basicItemMap.get('lifeStone') as Item));
itemMap.set('caduceus', new Caduceus(basicItemMap.get('scepter') as Item));
itemMap.set('circesStaff', new CircesStaff(basicItemMap.get('scepter') as Item));
itemMap.set('cloakOfShadowWalk', new CloakOfShadowWalk(basicItemMap.get('cloakOfShadows') as Item, itemMap.get('bootsOfSpeed') as Item));
*/
itemMap.set('creatureClaws', new CreatureClaws(basicItemMap.get('claws') as Item, basicItemMap.get('orbOfVenom') as Item));
itemMap.set('glovesOfAntiMagic', new GlovesOfAntiMagic(basicItemMap.get('claws') as Item, basicItemMap.get('goblinBattery') as Item));
/*
itemMap.set('elementalOrb', new ElementalOrb(basicItemMap.get('orbOfFire') as Item, basicItemMap.get('orbOfLightning') as Item));
*/
itemMap.set('fullVial', new FullVial(basicItemMap.get('emptyVial') as Item, basicItemMap.get('orbOfMagic') as Item));
itemMap.set('goldenSabatons', new GoldenSabatons(basicItemMap.get('bootsOfSpeed') as Item, basicItemMap.get('ironSword') as Item));
itemMap.set('giantsBoots', new GiantsBoots(basicItemMap.get('bootsOfSpeed') as Item, basicItemMap.get('studdedLeatherArmor') as Item));
/*
itemMap.set('iceBlade', new IceBlade(basicItemMap.get('orbOfLightning') as Item));
*/
itemMap.set('improvedMoonArmor', new ImprovedMoonArmor(basicItemMap.get('moonArmor') as Item));
/*
itemMap.set('improvedReinforcedHide', new ImprovedReinforcedHide(basicItemMap.get('reinforcedHide') as Item));
*/
itemMap.set('ironClaws', new IronClaws(basicItemMap.get('ironSword') as Item, basicItemMap.get('claws') as Item));
itemMap.set('agileBow', new AgileBow(basicItemMap.get('claws') as Item, basicItemMap.get('steelSpear') as Item));
/*
itemMap.set('javelin', new Javelin(basicItemMap.get('steelSpear') as Item));
itemMap.set(
    'khadgarsAmulet',
    new KhadgarsAmulet(basicItemMap.get('amuletOfSpellReflection') as Item, basicItemMap.get('moonArmor') as Item),
);
itemMap.set('lightningBolt', new LightningBolt(basicItemMap.get('goblinBattery') as Item, basicItemMap.get('orbOfLightning') as Item));
itemMap.set('lionsRing', new LionsRing(basicItemMap.get('runedBracers') as Item, basicItemMap.get('moonArmor') as Item));
itemMap.set('loadedCannon', new LoadedCannon(basicItemMap.get('orbOfFire') as Item));
itemMap.set('longRifle', new LongRifle(basicItemMap.get('steelSpear') as Item, basicItemMap.get('ironSword') as Item));
*/
itemMap.set('magesSabatons', new MagesSabatons(basicItemMap.get('bootsOfSpeed') as Item, basicItemMap.get('emptyVial') as Item));
itemMap.set('manaStone', new ManaStone(basicItemMap.get('emptyVial') as Item));
itemMap.set(
    'mantleOfIntelligence',
    new MantleOfIntelligence(basicItemMap.get('orbOfMagic') as Item, basicItemMap.get('pipeOfInsight') as Item),
);
itemMap.set('maskOfProficiency', new MaskOfProficiency(basicItemMap.get('emptyVial') as Item, basicItemMap.get('sobiMask') as Item));
itemMap.set('crystalBall', new CrystalBall(basicItemMap.get('orbOfMagic') as Item, basicItemMap.get('sobiMask') as Item, basicItemMap.get('scrollOfWitchcraft') as Item));
/*
itemMap.set('masterExecutionerAxe', new MasterExecutionerAxe(basicItemMap.get('bloodiedExecutionersAxe') as Item));
*/
itemMap.set('maulOfStrength', new MaulOfStrength(basicItemMap.get('warAxe') as Item, basicItemMap.get('studdedLeatherArmor') as Item));
itemMap.set('crownOfKings', new CrownOfKings(basicItemMap.get('warAxe') as Item, basicItemMap.get('ironShield') as Item, basicItemMap.get('moonArmor') as Item));
itemMap.set('ringOfKings', new RingOfKings(basicItemMap.get('warAxe') as Item, basicItemMap.get('orbOfCorruption') as Item));
/*
itemMap.set('naturesBlessing', new NaturesBlessing(basicItemMap.get('reinforcedHide') as Item, basicItemMap.get('druidicSalve') as Item));
itemMap.set('reinforcedLeatherArmor', new ReinforcedLeatherArmor(basicItemMap.get('studdedLeatherArmor') as Item));
itemMap.set('ringOfSuperiority', new RingOfSuperiority(basicItemMap.get('pipeOfInsight') as Item, basicItemMap.get('emptyVial') as Item));
*/
itemMap.set('coralScales', new CoralScales(basicItemMap.get('reinforcedHide') as ItemRecipe, basicItemMap.get('studdedLeatherArmor') as ItemRecipe));
itemMap.set('scaledBoots', new ScaledBoots(basicItemMap.get('bootsOfSpeed') as Item, basicItemMap.get('moonArmor') as Item));
itemMap.set('sharpSteelAxe', new SharpSteelAxe(basicItemMap.get('warAxe') as Item, basicItemMap.get('ironSword') as Item));
itemMap.set('beltOfGiantStrength', new BeltOfGiantStrength(basicItemMap.get('warAxe') as Item, basicItemMap.get('reinforcedHide') as Item));
/*
itemMap.set('shimmerWeed', new ShimmerWeed(basicItemMap.get('lifeStone') as Item, basicItemMap.get('studdedLeatherArmor') as Item));
*/
itemMap.set(
    'skullShield',
    new SkullShield(basicItemMap.get('ironwoodBranch') as Item, basicItemMap.get('amuletOfSpellReflection') as Item, basicItemMap.get('reinforcedHide') as Item),
);
/*
itemMap.set('snowyOwl', new SnowyOwl(basicItemMap.get('clockworkPenguin') as Item));
itemMap.set(
    'spikedCarapace',
    new SpikedCarapace(basicItemMap.get('ironwoodBranch') as Item, basicItemMap.get('studdedLeatherArmor') as Item),
);
itemMap.set('spikedWood', new SpikedWood(basicItemMap.get('ironwoodBranch') as Item));
*/
itemMap.set('steelShield', new SteelShield(basicItemMap.get('ironShield') as Item));
/*
itemMap.set('swordOfFreyr', new SwordOfFreyr(basicItemMap.get('warAxe') as Item, basicItemMap.get('scepter') as Item));
itemMap.set('theAegis', new TheAegis(basicItemMap.get('goblinBattery') as Item));
*/
itemMap.set('fieryBloodAxe', new FieryBloodAxe(basicItemMap.get('warAxe') as Item, basicItemMap.get('bloodiedExecutionersAxe') as Item, basicItemMap.get('orbOfFire') as Item));
/*
itemMap.set(
    'vampireDagger',
    new VampireDagger(basicItemMap.get('bloodiedSacrificialDagger') as Item, basicItemMap.get('vampireClaws') as Item),
);
itemMap.set('vampireFangs', new VampireFangs(basicItemMap.get('vampireClaws') as Item));
itemMap.set('wandOfShadowsight', new WandOfShadowsight(basicItemMap.get('goblinNightScope') as Item, basicItemMap.get('flareGun') as Item));
*/

export default [...itemMap.values()] as ItemRecipe[];
