import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import * as basicItemController from './BasicItemController';
import { AdeptCrystalBall } from './Recipes/AdeptCrystalBall';
import { AdvancedReinforcedHides } from './Recipes/AdvancedReinforcedHides';
import { ImprovedMoonArmor } from './Recipes/ImprovedMoonArmor';
import { ImprovedBalancedShield } from './Recipes/ImprovedBalancedShield';
import { ReinforcedScales } from './Recipes/ReinforcedScales';
import { BalancedShield } from './Recipes/BalancedShield';
import { SteelShield } from './Recipes/SteelShield';
import { CoralScales } from './Recipes/CoralScales';
import { AgileSlippers } from './Recipes/AgileSlippers';
import { ManaEgg } from './Recipes/ManaEgg';
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

export const itemMap: Map<string, Item> = new Map(basicItemController.itemMap.entries());

// @ts-ignore
itemMap.set('manaEgg', new ManaEgg(itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('improvedMoonArmor', new ImprovedMoonArmor(itemMap.get('moonArmor')));
// @ts-ignore
itemMap.set('balancedShield', new BalancedShield(itemMap.get('moonArmor'), itemMap.get('ironShield')));
itemMap.set(
    'improvedBalancedShield',
    // @ts-ignore
    new ImprovedBalancedShield(itemMap.get('balancedShield'), itemMap.get('ironShield'), itemMap.get('moonArmor')),
);
// @ts-ignore
itemMap.set('steelShield', new SteelShield(itemMap.get('ironShield')));
// @ts-ignore
itemMap.set('agileSlippers', new AgileSlippers(itemMap.get('bootsOfSpeed')));
// @ts-ignore
itemMap.set('scrollOfAgility', new ScrollOfAgility(itemMap.get('agileSlippers')));
// @ts-ignore
itemMap.set('creatureClaws', new CreatureClaws(itemMap.get('claws')));
// @ts-ignore
itemMap.set('improvedCreatureClaws', new ImprovedCreatureClaws(itemMap.get('creatureClaws')));
// @ts-ignore
itemMap.set('maulOfStrength', new MaulOfStrength(itemMap.get('warAxe')));
// @ts-ignore
itemMap.set('loadedRifle', new LoadedRifle(itemMap.get('ironSword')));
// @ts-ignore
itemMap.set('coralScales', new CoralScales(itemMap.get('reinforcedHide'), itemMap.get('studdedLeatherArmor')));
// @ts-ignore
itemMap.set('reinforcedScales', new ReinforcedScales(itemMap.get('steelShield'), itemMap.get('coralScales')));
// @ts-ignore
itemMap.set('iceBlade', new IceBlade(itemMap.get('loadedRifle'), itemMap.get('orbOfLightning')));
// @ts-ignore
itemMap.set('ironClaws', new IronClaws(itemMap.get('ironSword'), itemMap.get('claws')));
// @ts-ignore
itemMap.set('theAegis', new TheAegis(itemMap.get('steelShield'), itemMap.get('scepter')));
// @ts-ignore
itemMap.set('vialOfMagic', new VialOfMagic(itemMap.get('orbOfMagic'), itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('maskOfProficiency', new MaskOfProficiency(itemMap.get('orbOfMagic'), itemMap.get('sobiMask')));
// @ts-ignore
itemMap.set('adeptCrystalBall', new AdeptCrystalBall(itemMap.get('crystalBall')));
// @ts-ignore
itemMap.set('wandOfShadowsight', new WandOfShadowsight(itemMap.get('goblinNightScope'), itemMap.get('flareGun')));
// @ts-ignore
itemMap.set('lionsRing', new LionsRing(itemMap.get('runedBracers'), itemMap.get('improvedMoonArmor')));
// @ts-ignore
itemMap.set('sharpSteelAxe', new SharpSteelAxe(itemMap.get('warAxe'), itemMap.get('ironSword')));
// @ts-ignore
itemMap.set('fragarach', new Fragarach(itemMap.get('iceBlade'), itemMap.get('ironClaws')));
// @ts-ignore
itemMap.set('swordOfFreyr', new SwordOfFreyr(itemMap.get('sharpSteelAxe'), itemMap.get('scepter')));
// @ts-ignore
itemMap.set('vampireDagger', new VampireDagger(itemMap.get('bloodiedSacrificialDagger'), itemMap.get('vampireClaws')));
// @ts-ignore
itemMap.set('cloakOfShadowWalk', new CloakOfShadowWalk(itemMap.get('cloakOfShadows'), itemMap.get('scrollOfAgility')));
// @ts-ignore
itemMap.set('improvedReinforcedHide', new ImprovedReinforcedHide(itemMap.get('reinforcedHide')));
// @ts-ignore
itemMap.set('fastVampireClaws', new FastVampireClaws(itemMap.get('claws'), itemMap.get('vampireClaws')));
// @ts-ignore
itemMap.set('bookOfKnowledge', new BookOfKnowledge(itemMap.get('orbOfMagic')));
// @ts-ignore
itemMap.set('bookOfMagic', new BookOfMagic(itemMap.get('bookOfKnowledge'), itemMap.get('vialOfMagic')));
// @ts-ignore
itemMap.set('ancientBookOfMagic', new AncientBookOfMagic(itemMap.get('bookOfMagic'), itemMap.get('blueSoulstone')));
// @ts-ignore
itemMap.set('assassinsCloak', new AssassinsCloak(itemMap.get('assassinsBlade'), itemMap.get('cloakOfShadowWalk')) as ItemRecipe);
itemMap.set(
    'advancedReinforcedHides',
    new AdvancedReinforcedHides(
        // @ts-ignore
        itemMap.get('improvedMoonArmor'),
        // @ts-ignore
        itemMap.get('improvedBalancedShield'),
        // @ts-ignore
        itemMap.get('reinforcedScales'),
    ) as ItemRecipe,
);
// @ts-ignore
itemMap.set('agileSlippers', new AgileSlippers(itemMap.get('bootsOfSpeed')) as ItemRecipe);
// @ts-ignore
itemMap.set('armoredBoots', new ArmoredBoots(itemMap.get('bootsOfSpeed'), itemMap.get('steelShield')) as ItemRecipe);
// @ts-ignore
itemMap.set('caduceus', new Caduceus(itemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('circesStaff', new CircesStaff(itemMap.get('druidicSalve'), itemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('dragonScales', new DragonScales(itemMap.get('improvedCreatureClaws'), itemMap.get('studdedLeatherArmor')) as ItemRecipe);
// @ts-ignore
itemMap.set('lightningBolt', new LightningBolt(itemMap.get('goblinBattery'), itemMap.get('theAegis')) as ItemRecipe);
// @ts-ignore
itemMap.set('loadedCannon', new LoadedCannon(itemMap.get('loadedRifle'), itemMap.get('orbOfFire')) as ItemRecipe);
// @ts-ignore
itemMap.set('manaInfusedMask', new ManaInfusedMask(itemMap.get('maskOfProficiency'), itemMap.get('vialOfMagic')) as ItemRecipe);
// @ts-ignore
itemMap.set('masterCrystalBall', new MasterCrystalBall(itemMap.get('adeptCrystalBall'), itemMap.get('vialOfMagic')) as ItemRecipe);
// @ts-ignore
itemMap.set('snowyOwl', new SnowyOwl(itemMap.get('clockworkPenguin'), itemMap.get('wandOfShadowsight')) as ItemRecipe);
// @ts-ignore
itemMap.set(
    'soulcage',
    new Soulcage(
        // @ts-ignore
        itemMap.get('emptySoulcage'),
        // @ts-ignore
        itemMap.get('greenSoulstone'),
        // @ts-ignore
        itemMap.get('blueSoulstone'),
        // @ts-ignore
        itemMap.get('purpleSoulstone'),
    ) as ItemRecipe,
);
// @ts-ignore
itemMap.set('spellShield', new SpellShield(itemMap.get('lionsRing')) as ItemRecipe);
// @ts-ignore
itemMap.set('swordOfNaegling', new SwordOfNaegling(itemMap.get('fragarach'), itemMap.get('swordOfFreyr')) as ItemRecipe);
// @ts-ignore
itemMap.set('throwableAxe', new ThrowableAxe(itemMap.get('bloodiedExecutionersAxe'), itemMap.get('scepter')) as ItemRecipe);
// @ts-ignore
itemMap.set('naturesBlessing', new NaturesBlessing(itemMap.get('reinforcedHide'), itemMap.get('druidicSalve')));
// @ts-ignore
itemMap.set('strengthOfTheWild', new StrengthOfTheWild(itemMap.get('maulOfStrength'), itemMap.get('warAxe')) as ItemRecipe);
// @ts-ignore
itemMap.set('improvedStrengthOfTheWild', new ImprovedStrengthOfTheWild(itemMap.get('strengthOfTheWild')));
itemMap.set(
    'advancedStrengthOfTheWild',
    // @ts-ignore
    new AdvancedStrengthOfTheWild(itemMap.get('improvedStrengthOfTheWild'), itemMap.get('steelShield'), itemMap.get('greenSoulstone')),
);
itemMap.set(
    'advancedCreatureClaws',
    // @ts-ignore
    new AdvancedCreatureClaws(itemMap.get('improvedCreatureClaws'), itemMap.get('fastVampireClaws'), itemMap.get('purpleSoulstone')),
);
export default [
    itemMap.get('improvedMoonArmor'),
    itemMap.get('improvedBalancedShield'),
    itemMap.get('reinforcedScales'),
    itemMap.get('balancedShield'),
    itemMap.get('steelShield'),
    itemMap.get('coralScales'),
    itemMap.get('agileSlippers'),
    itemMap.get('scrollOfAgility'),
    itemMap.get('creatureClaws'),
    itemMap.get('improvedCreatureClaws'),
    itemMap.get('maulOfStrength'),
    itemMap.get('iceBlade'),
    itemMap.get('ironClaws'),
    itemMap.get('theAegis'),
    itemMap.get('vialOfMagic'),
    itemMap.get('maskOfProficiency'),
    itemMap.get('adeptCrystalBall'),
    itemMap.get('wandOfShadowsight'),
    itemMap.get('lionsRing'),
    itemMap.get('sharpSteelAxe'),
    itemMap.get('manaEgg'),
    itemMap.get('loadedRifle'),
    itemMap.get('swordOfFreyr'),
    itemMap.get('fragarach'),
    itemMap.get('vampireDagger'),
    itemMap.get('improvedReinforcedHide'),
    itemMap.get('fastVampireClaws'),
    itemMap.get('bookOfKnowledge'),
    itemMap.get('bookOfMagic'),
    itemMap.get('ancientBookOfMagic'),
    itemMap.get('assassinsCloak'),
    itemMap.get('advancedReinforcedHides'),
    itemMap.get('agileSlippers'),
    itemMap.get('armoredBoots'),
    itemMap.get('caduceus'),
    itemMap.get('circesStaff'),
    itemMap.get('dragonScales'),
    itemMap.get('lightningBolt'),
    itemMap.get('loadedCannon'),
    itemMap.get('manaInfusedMask'),
    itemMap.get('masterCrystalBall'),
    itemMap.get('snowyOwl'),
    itemMap.get('soulcage'),
    itemMap.get('spellShield'),
    itemMap.get('swordOfNaegling'),
    itemMap.get('throwableAxe'),
    itemMap.get('naturesBlessing'),
    itemMap.get('strengthOfTheWild'),
    itemMap.get('improvedStrengthOfTheWild'),
    itemMap.get('advancedStrengthOfTheWild'),
    itemMap.get('advancedCreatureClaws'),
    itemMap.get('cloakOfShadowWalk'),
] as ItemRecipe[];
