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
import { Ancile } from './Recipes/Ancile';
import { ManaEgg } from './Recipes/ManaEgg';
import { ArmoredBoots } from './Recipes/ArmoredBoots';
import { LoadedRifle } from './Recipes/LoadedRifle';
import { BerserkerAxes } from './Recipes/BerserkerAxes';
import { Caduceus } from './Recipes/Caduceus';
import { CircesStaff } from './Recipes/CircesStaff';
import { CloakOfShadowWalk } from './Recipes/CloakOfShadowWalk';
import { ScrollOfAgility } from './Recipes/ScrollOfAgility';
import { CreatureClaws } from './Recipes/CreatureClaws';
import { DragonScales } from './Recipes/DragonScales';
import { DragonWhelpClaws } from './Recipes/DragonWhelpClaws';
import { EnchantedShield } from './Recipes/EnchantedShield';
import { EnhancedBerserkerAxes } from './Recipes/EnhancedBerserkerAxes';
import { Fragarach } from './Recipes/Fragarach';
import { ManaBlade } from './Recipes/ManaBlade';
import { IronClaws } from './Recipes/IronClaws';
import { LightningBolt } from './Recipes/LightningBolt';
import { TheAegis } from './Recipes/TheAegis';
import { LionsRing } from './Recipes/LionsRing';
import { LoadedCannon } from './Recipes/LoadedCannon';
import { ManaAxe } from './Recipes/ManaAxe';
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
import { AssassinsBlade } from './Recipes/AssassinsBlade';
import { AssassinsCloak } from './Recipes/AssassinsCloak';
import { NaturesBlessing } from './Recipes/NaturesBlessing';
import { ImprovedReinforcedHide } from './Recipes/ImprovedReinforcedHide';
import { FastVampireClaws } from './Recipes/FastVampireClaws';

export const itemMap: Map<string, Item> = new Map(basicItemController.itemMap.entries());

// @ts-ignore
itemMap.set('manaEgg', new ManaEgg(itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('improvedMoonArmor', new ImprovedMoonArmor(itemMap.get('moonArmor')));
// @ts-ignore
itemMap.set('balancedShield', new BalancedShield(itemMap.get('moonArmor'), itemMap.get('ironShield')));
// @ts-ignore
itemMap.set('improvedBalancedShield', new ImprovedBalancedShield(itemMap.get('balancedShield')));
// @ts-ignore
itemMap.set('steelShield', new SteelShield(itemMap.get('ironShield')));
// @ts-ignore
itemMap.set('agileSlippers', new AgileSlippers(itemMap.get('bootsOfSpeed')));
// @ts-ignore
itemMap.set('scrollOfAgility', new ScrollOfAgility(itemMap.get('agileSlippers')));
// @ts-ignore
itemMap.set('creatureClaws', new CreatureClaws(itemMap.get('claws'), itemMap.get('studdedLeatherArmor')));
// @ts-ignore
itemMap.set('dragonWhelpClaws', new DragonWhelpClaws(itemMap.get('creatureClaws')));
// @ts-ignore
itemMap.set('berserkerAxes', new BerserkerAxes(itemMap.get('warAxe')));
// @ts-ignore
itemMap.set('loadedRifle', new LoadedRifle(itemMap.get('ironSword')));
// @ts-ignore
itemMap.set('coralScales', new CoralScales(itemMap.get('reinforcedHide'), itemMap.get('studdedLeatherArmor')));
// @ts-ignore
itemMap.set('reinforcedScales', new ReinforcedScales(itemMap.get('steelShield'), itemMap.get('coralScales')));
// @ts-ignore
itemMap.set('manaBlade', new ManaBlade(itemMap.get('ironSword'), itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('ironClaws', new IronClaws(itemMap.get('ironSword'), itemMap.get('claws')));
// @ts-ignore
itemMap.set('theAegis', new TheAegis(itemMap.get('steelShield'), itemMap.get('scepter')));
// @ts-ignore
itemMap.set('vialOfMagic', new VialOfMagic(itemMap.get('orbOfMagic'), itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('maskOfProficiency', new MaskOfProficiency(itemMap.get('orbOfMagic'), itemMap.get('sobiMask')));
// @ts-ignore
itemMap.set('adeptCrystalBall', new AdeptCrystalBall(itemMap.get('crystalBall'), itemMap.get('sobiMask')));
// @ts-ignore
itemMap.set('wandOfShadowsight', new WandOfShadowsight(itemMap.get('goblinNightScope'), itemMap.get('flare')));
// @ts-ignore
itemMap.set('enchantedShield', new EnchantedShield(itemMap.get('studdedLeatherArmor'), itemMap.get('moonArmor')));
// @ts-ignore
itemMap.set('lionsRing', new LionsRing(itemMap.get('runedBracers'), itemMap.get('improvedMoonArmor')));
// @ts-ignore
itemMap.set('manaAxe', new ManaAxe(itemMap.get('warAxe'), itemMap.get('emptyVial')));
// @ts-ignore
itemMap.set('fragarach', new Fragarach(itemMap.get('manaBlade'), itemMap.get('ironClaws')));
// @ts-ignore
itemMap.set('swordOfFreyr', new SwordOfFreyr(itemMap.get('manaBlade'), itemMap.get('manaAxe')));
// @ts-ignore
itemMap.set('vampireDagger', new VampireDagger(itemMap.get('bloodiedSacrificialDagger'), itemMap.get('vampireClaws')));
// @ts-ignore
itemMap.set('assassinsBlade', new AssassinsBlade(itemMap.get('ironSword')));
// @ts-ignore
itemMap.set('cloakOfShadowWalk', new CloakOfShadowWalk(itemMap.get('cloakOfShadows'), itemMap.get('scrollOfAgility')));
// @ts-ignore
itemMap.set('improvedReinforcedHide', new ImprovedReinforcedHide(itemMap.get('reinforcedHide')));
// @ts-ignore
itemMap.set('fastVampireClaws', new FastVampireClaws(itemMap.get('claws'), itemMap.get('vampireClaws')));
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
    itemMap.get('dragonWhelpClaws'),
    itemMap.get('berserkerAxes'),
    itemMap.get('manaBlade'),
    itemMap.get('ironClaws'),
    itemMap.get('theAegis'),
    itemMap.get('vialOfMagic'),
    itemMap.get('maskOfProficiency'),
    itemMap.get('adeptCrystalBall'),
    itemMap.get('wandOfShadowsight'),
    itemMap.get('enchantedShield'),
    itemMap.get('lionsRing'),
    itemMap.get('manaAxe'),
    itemMap.get('manaEgg'),
    itemMap.get('loadedRifle'),
    itemMap.get('swordOfFreyr'),
    itemMap.get('fragarach'),
    itemMap.get('vampireDagger'),
    itemMap.get('assassinsBlade'),
    itemMap.get('improvedReinforcedHide'),
    itemMap.get('fastVampireClaws'),
    // @ts-ignore
    new AssassinsCloak(itemMap.get('assassinsBlade'), itemMap.get('cloakOfShadowWalk')) as ItemRecipe,
    new AdvancedReinforcedHides(
        // @ts-ignore
        itemMap.get('improvedMoonArmor'),
        // @ts-ignore
        itemMap.get('improvedBalancedShield'),
        // @ts-ignore
        itemMap.get('reinforcedScales'),
    ) as ItemRecipe,
    // @ts-ignore
    new AgileSlippers(itemMap.get('bootsOfSpeed')) as ItemRecipe,
    // @ts-ignore
    new Ancile(itemMap.get('studdedLeatherArmor'), itemMap.get('ironShield')) as ItemRecipe,
    // @ts-ignore
    new ArmoredBoots(itemMap.get('bootsOfSpeed'), itemMap.get('steelShield')) as ItemRecipe,
    // @ts-ignore
    new Caduceus(itemMap.get('branch'), itemMap.get('studdedLeatherArmor')) as ItemRecipe,
    // @ts-ignore
    new CircesStaff(itemMap.get('branch'), itemMap.get('scepter')) as ItemRecipe,
    // @ts-ignore
    new DragonScales(itemMap.get('dragonWhelpClaws'), itemMap.get('coralScales')) as ItemRecipe,
    // @ts-ignore
    new EnhancedBerserkerAxes(itemMap.get('berserkerAxes')) as ItemRecipe,
    // @ts-ignore
    new LightningBolt(itemMap.get('goblinBattery'), itemMap.get('theAegis')) as ItemRecipe,
    // @ts-ignore
    new LoadedCannon(itemMap.get('loadedRifle'), itemMap.get('ironSword')) as ItemRecipe,
    // @ts-ignore
    new ManaInfusedMask(itemMap.get('maskOfProficiency'), itemMap.get('vialOfMagic')) as ItemRecipe,
    // @ts-ignore
    new MasterCrystalBall(itemMap.get('adeptCrystalBall'), itemMap.get('vialOfMagic')) as ItemRecipe,
    // @ts-ignore
    new SnowyOwl(itemMap.get('clockworkPenguin'), itemMap.get('wandOfShadowsight')) as ItemRecipe,
    // @ts-ignore
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
    // @ts-ignore
    new SpellShield(itemMap.get('vialOfMagic'), itemMap.get('enchantedShield'), itemMap.get('lionsRing')) as ItemRecipe,
    // @ts-ignore
    new SwordOfNaegling(itemMap.get('fragarach'), itemMap.get('swordOfFreyr')) as ItemRecipe,
    // @ts-ignore
    new ThrowableAxe(itemMap.get('bloodiedExecutionersAxe'), itemMap.get('scepter')) as ItemRecipe,
    // @ts-ignore
    new NaturesBlessing(itemMap.get('reinforcedHide'), itemMap.get('branch')),
] as ItemRecipe[];
