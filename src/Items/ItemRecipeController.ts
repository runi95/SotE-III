import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import * as basicItemController from './BasicItemController';
import { AdvancedReinforcedHides } from './Recipes/AdvancedReinforcedHides';
import { ImprovedMoonArmor } from './Recipes/ImprovedMoonArmor';
import { ImprovedBalancedShield } from './Recipes/ImprovedBalancedShield';
import { ReinforcedScales } from './Recipes/ReinforcedScales';
import { BalancedShield } from './Recipes/BalancedShield';
import { SteelShield } from './Recipes/SteelShield';
import { CoralScales } from './Recipes/CoralScales';
import { AgileSlippers } from './Recipes/AgileSlippers';
import { ManaStone } from './Recipes/ManaStone';
import { ArmoredBoots } from './Recipes/ArmoredBoots';
import { LoadedRifle } from './Recipes/LoadedRifle';
import { MaulOfStrength } from './Recipes/MaulOfStrength';
import { Caduceus } from './Recipes/Caduceus';
import { CircesStaff } from './Recipes/CircesStaff';
import { CloakOfShadowWalk } from './Recipes/CloakOfShadowWalk';
import { ScrollOfAgility } from './Recipes/ScrollOfAgility';
import { CreatureClaws } from './Recipes/CreatureClaws';
import { DragonScales } from './Recipes/DragonScales';
import { ImprovedCreatureClaws } from './Recipes/ImprovedCreatureClaws';
import { StrengthOfTheWild } from './Recipes/StrengthOfTheWild';
import { Fragarach } from './Recipes/Fragarach';
import { IceBlade } from './Recipes/IceBlade';
import { IronClaws } from './Recipes/IronClaws';
import { LightningBolt } from './Recipes/LightningBolt';
import { TheAegis } from './Recipes/TheAegis';
import { LionsRing } from './Recipes/LionsRing';
import { LoadedCannon } from './Recipes/LoadedCannon';
import { SharpSteelAxe } from './Recipes/SharpSteelAxe';
import { ManaInfusedMask } from './Recipes/ManaInfusedMask';
import { MaskOfProficiency } from './Recipes/MaskOfProficiency';
import { VialOfMagic } from './Recipes/VialOfMagic';
import { MasterCrystalBall } from './Recipes/MasterCrystalBall';
import { SnowyOwl } from './Recipes/SnowyOwl';
import { WandOfShadowsight } from './Recipes/WandOfShadowsight';
import { Soulcage } from './Recipes/Soulcage';
import { SpellShield } from './Recipes/SpellShield';
import { SwordOfFreyr } from './Recipes/SwordOfFreyr';
import { SwordOfNaegling } from './Recipes/SwordOfNaegling';
import { ThrowableAxe } from './Recipes/ThrowableAxe';
import { VampireDagger } from './Recipes/VampireDagger';
import { AssassinsCloak } from './Recipes/AssassinsCloak';
import { NaturesBlessing } from './Recipes/NaturesBlessing';
import { ImprovedReinforcedHide } from './Recipes/ImprovedReinforcedHide';
import { FastVampireClaws } from './Recipes/FastVampireClaws';
import { BookOfKnowledge } from './Recipes/BookOfKnowledge';
import { BookOfMagic } from './Recipes/BookOfMagic';
import { AncientBookOfMagic } from './Recipes/AncientBookOfMagic';
import { ImprovedStrengthOfTheWild } from './Recipes/ImprovedStrengthOfTheWild';
import { AdvancedStrengthOfTheWild } from './Recipes/AdvancedStrengthOfTheWild';
import { AdvancedCreatureClaws } from './Recipes/AdvancedCreatureClaws';
import { FullVial } from './Recipes/FullVial';
import { ThoriumSpear } from './Recipes/ThoriumSpear';
import { LongRifle } from './Recipes/LongRifle';
import { SpikedWood } from './Recipes/SpikedWood';
import { SpikedCarapace } from './Recipes/SpikedCarapace';
import { ChargedStone } from './Recipes/ChargedStone';
import { AdeptStaff } from './Recipes/AdeptStaff';
import { MasterStaff } from './Recipes/MasterStaff';
import { BrightLifeStone } from './Recipes/BrightLifeStone';
import { VampireFangs } from './Recipes/VampireFangs';

const basicItemMap: Map<string, Item> = basicItemController.itemMap;
export const itemMap: Map<string, ItemRecipe> = new Map();

// @ts-ignore
itemMap.set('loadedRifle', new LoadedRifle(basicItemMap.get('ironSword')));
// @ts-ignore
itemMap.set('manaStone', new ManaStone(basicItemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('improvedMoonArmor', new ImprovedMoonArmor(basicItemMap.get('moonArmor')));
// @ts-ignore
itemMap.set('balancedShield', new BalancedShield(basicItemMap.get('moonArmor'), basicItemMap.get('ironShield')));
// @ts-ignore
itemMap.set('steelShield', new SteelShield(basicItemMap.get('ironShield')));
itemMap.set(
    'improvedBalancedShield',
    // @ts-ignore
    new ImprovedBalancedShield(itemMap.get('balancedShield'), itemMap.get('steelShield'), itemMap.get('improvedMoonArmor')),
);
// @ts-ignore
itemMap.set('agileSlippers', new AgileSlippers(basicItemMap.get('bootsOfSpeed')));
// @ts-ignore
itemMap.set('scrollOfAgility', new ScrollOfAgility(itemMap.get('agileSlippers')));
// @ts-ignore
itemMap.set('creatureClaws', new CreatureClaws(basicItemMap.get('claws')));
// @ts-ignore
itemMap.set('improvedCreatureClaws', new ImprovedCreatureClaws(itemMap.get('creatureClaws')));
// @ts-ignore
itemMap.set('maulOfStrength', new MaulOfStrength(basicItemMap.get('warAxe')));
// @ts-ignore
itemMap.set('coralScales', new CoralScales(basicItemMap.get('reinforcedHide'), basicItemMap.get('studdedLeatherArmor')));
// @ts-ignore
itemMap.set('reinforcedScales', new ReinforcedScales(itemMap.get('coralScales')));
// @ts-ignore
itemMap.set('iceBlade', new IceBlade(itemMap.get('loadedRifle'), basicItemMap.get('orbOfLightning')));
// @ts-ignore
itemMap.set('ironClaws', new IronClaws(basicItemMap.get('ironSword'), basicItemMap.get('claws')));
// @ts-ignore
itemMap.set('theAegis', new TheAegis(basicItemMap.get('goblinBattery')));
// @ts-ignore
itemMap.set('fullVial', new FullVial(basicItemMap.get('emptyVial'), basicItemMap.get('sobiMask')));
// @ts-ignore
itemMap.set('vialOfMagic', new VialOfMagic(basicItemMap.get('orbOfMagic'), itemMap.get('fullVial')));
// @ts-ignore
itemMap.set('maskOfProficiency', new MaskOfProficiency(basicItemMap.get('orbOfMagic'), basicItemMap.get('sobiMask')));
// @ts-ignore
itemMap.set('wandOfShadowsight', new WandOfShadowsight(basicItemMap.get('goblinNightScope'), basicItemMap.get('flareGun')));
// @ts-ignore
itemMap.set('lionsRing', new LionsRing(basicItemMap.get('runedBracers'), itemMap.get('improvedMoonArmor')));
// @ts-ignore
itemMap.set('sharpSteelAxe', new SharpSteelAxe(basicItemMap.get('warAxe'), basicItemMap.get('ironSword')));
// @ts-ignore
itemMap.set('fragarach', new Fragarach(itemMap.get('iceBlade'), itemMap.get('ironClaws')));
// @ts-ignore
itemMap.set('swordOfFreyr', new SwordOfFreyr(itemMap.get('sharpSteelAxe'), basicItemMap.get('scepter')));
// @ts-ignore
itemMap.set('vampireDagger', new VampireDagger(basicItemMap.get('bloodiedSacrificialDagger'), basicItemMap.get('vampireClaws')));
// @ts-ignore
itemMap.set('cloakOfShadowWalk', new CloakOfShadowWalk(basicItemMap.get('cloakOfShadows'), itemMap.get('scrollOfAgility')));
// @ts-ignore
itemMap.set('improvedReinforcedHide', new ImprovedReinforcedHide(basicItemMap.get('reinforcedHide')));
// @ts-ignore
itemMap.set('fastVampireClaws', new FastVampireClaws(basicItemMap.get('claws'), basicItemMap.get('vampireClaws')));
// @ts-ignore
itemMap.set('bookOfKnowledge', new BookOfKnowledge(basicItemMap.get('orbOfMagic')));
// @ts-ignore
itemMap.set('bookOfMagic', new BookOfMagic(itemMap.get('bookOfKnowledge'), itemMap.get('vialOfMagic')));
// @ts-ignore
itemMap.set('ancientBookOfMagic', new AncientBookOfMagic(itemMap.get('bookOfMagic'), basicItemMap.get('blueSoulstone')));
// @ts-ignore
itemMap.set('assassinsCloak', new AssassinsCloak(basicItemMap.get('assassinsBlade'), itemMap.get('cloakOfShadowWalk')) as ItemRecipe);
itemMap.set(
    'advancedReinforcedHides',
    new AdvancedReinforcedHides(
        // @ts-ignore
        itemMap.get('improvedBalancedShield'),
        // @ts-ignore
        itemMap.get('reinforcedScales'),
    ) as ItemRecipe,
);
// @ts-ignore
itemMap.set('agileSlippers', new AgileSlippers(basicItemMap.get('bootsOfSpeed')) as ItemRecipe);
// @ts-ignore
itemMap.set('armoredBoots', new ArmoredBoots(basicItemMap.get('bootsOfSpeed'), itemMap.get('steelShield')) as ItemRecipe);
// @ts-ignore
itemMap.set('caduceus', new Caduceus(basicItemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('circesStaff', new CircesStaff(basicItemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('dragonScales', new DragonScales(itemMap.get('improvedCreatureClaws'), basicItemMap.get('studdedLeatherArmor')) as ItemRecipe);
// @ts-ignore
itemMap.set('lightningBolt', new LightningBolt(basicItemMap.get('goblinBattery'), basicItemMap.get('orbOfLightning')) as ItemRecipe);
// @ts-ignore
itemMap.set('loadedCannon', new LoadedCannon(itemMap.get('loadedRifle'), basicItemMap.get('orbOfFire')) as ItemRecipe);
// @ts-ignore
itemMap.set('manaInfusedMask', new ManaInfusedMask(itemMap.get('maskOfProficiency'), itemMap.get('vialOfMagic')) as ItemRecipe);
// @ts-ignore
itemMap.set('masterCrystalBall', new MasterCrystalBall(basicItemMap.get('crystalBall'), itemMap.get('vialOfMagic')) as ItemRecipe);
// @ts-ignore
itemMap.set('snowyOwl', new SnowyOwl(basicItemMap.get('clockworkPenguin'), itemMap.get('wandOfShadowsight')) as ItemRecipe);
// @ts-ignore
itemMap.set(
    'soulcage',
    new Soulcage(
        // @ts-ignore
        basicItemMap.get('emptySoulcage'),
        // @ts-ignore
        basicItemMap.get('greenSoulstone'),
        // @ts-ignore
        basicItemMap.get('blueSoulstone'),
        // @ts-ignore
        basicItemMap.get('purpleSoulstone'),
    ) as ItemRecipe,
);
// @ts-ignore
itemMap.set('spellShield', new SpellShield(itemMap.get('lionsRing')) as ItemRecipe);
// @ts-ignore
itemMap.set('swordOfNaegling', new SwordOfNaegling(itemMap.get('fragarach'), itemMap.get('swordOfFreyr')) as ItemRecipe);
// @ts-ignore
itemMap.set('throwableAxe', new ThrowableAxe(basicItemMap.get('bloodiedExecutionersAxe'), basicItemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('naturesBlessing', new NaturesBlessing(basicItemMap.get('reinforcedHide'), basicItemMap.get('druidicSalve')));
// @ts-ignore
itemMap.set('strengthOfTheWild', new StrengthOfTheWild(itemMap.get('maulOfStrength'), basicItemMap.get('warAxe')) as ItemRecipe);
// @ts-ignore
itemMap.set('improvedStrengthOfTheWild', new ImprovedStrengthOfTheWild(itemMap.get('strengthOfTheWild')));
itemMap.set(
    'advancedStrengthOfTheWild',
    // @ts-ignore
    new AdvancedStrengthOfTheWild(itemMap.get('improvedStrengthOfTheWild'), basicItemMap.get('greenSoulstone')),
);
itemMap.set(
    'advancedCreatureClaws',
    // @ts-ignore
    new AdvancedCreatureClaws(itemMap.get('improvedCreatureClaws'), itemMap.get('fastVampireClaws'), basicItemMap.get('purpleSoulstone')),
);
// @ts-ignore
itemMap.set('thoriumSpear', new ThoriumSpear(basicItemMap.get('steelSpear')));
// @ts-ignore
itemMap.set('longRifle', new LongRifle(basicItemMap.get('steelSpear'), itemMap.get('loadedRifle')));
// @ts-ignore
itemMap.set('spikedWood', new SpikedWood(basicItemMap.get('ironwoodBranch')));
// @ts-ignore
itemMap.set('spikedCarapace', new SpikedCarapace(basicItemMap.get('ironwoodBranch'), basicItemMap.get('studdedLeatherArmor')));
// @ts-ignore
itemMap.set('chargedStone', new ChargedStone(itemMap.get('manaStone'), basicItemMap.get('lifeStone')));
// @ts-ignore
itemMap.set('brightLifeStone', new BrightLifeStone(basicItemMap.get('lifeStone')));
// @ts-ignore
itemMap.set('adeptStaff', new AdeptStaff(basicItemMap.get('fairyWand')));
// @ts-ignore
itemMap.set('masterStaff', new MasterStaff(itemMap.get('adeptStaff')));
// @ts-ignore
itemMap.set('vampireFangs', new VampireFangs(basicItemMap.get('vampireClaws')));

export default [...itemMap.values()] as ItemRecipe[];
