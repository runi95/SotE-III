import { Item } from './Item';
import { ItemRecipe } from './ItemRecipe';
import { AdeptCrystalBall } from './Recipes/AdeptCrystalBall';
import { CrystalBall } from './BasicItems/CrystalBall';
import { SobiMask } from './BasicItems/SobiMask';
import { AdvancedReinforcedHides } from './Recipes/AdvancedReinforcedHides';
import { ImprovedMoonArmor } from './Recipes/ImprovedMoonArmor';
import { ImprovedBalancedShield } from './Recipes/ImprovedBalancedShield';
import { ReinforcedScales } from './Recipes/ReinforcedScales';
import { MoonArmor } from './BasicItems/MoonArmor';
import { BalancedShield } from './Recipes/BalancedShield';
import { IronShield } from './BasicItems/IronShield';
import { SteelShield } from './Recipes/SteelShield';
import { CoralScales } from './Recipes/CoralScales';
import { ReinforcedHide } from './BasicItems/ReinforcedHide';
import { StuddedLeatherArmor } from './BasicItems/StuddedLeatherArmor';
import { AgileSlippers } from './Recipes/AgileSlippers';
import { BootsOfSpeed } from './BasicItems/BootsOfSpeed';
import { Ancile } from './Recipes/Ancile';
import { ManaEgg } from './Recipes/ManaEgg';
import { ArmoredBoots } from './Recipes/ArmoredBoots';
import { BloodiedExecutionersAxe } from './BasicItems/BloodiedExecutionersAxe';
import { BlueSoulstone } from './BasicItems/BlueSoulstone';
import { Branch } from './BasicItems/Branch';
import { Claws } from './BasicItems/Claws';
import { CloakOfShadows } from './BasicItems/CloakOfShadows';
import { ClockworkPenguin } from './BasicItems/ClockworkPenguin';
import { EmptySoulcage } from './BasicItems/EmptySoulcage';
import { EmptyVial } from './BasicItems/EmptyVial';
import { Flare } from './BasicItems/Flare';
import { GoblinBattery } from './BasicItems/GoblinBattery';
import { GreenSoulstone } from './BasicItems/GreenSoulstone';
import { IronSword } from './BasicItems/IronSword';
import { LoadedRifle } from './Recipes/LoadedRifle';
import { OrbOfMagic } from './BasicItems/OrbOfMagic';
import { PurpleSoulstone } from './BasicItems/PurpleSoulstone';
import { Scepter } from './BasicItems/Scepter';
import { WarAxe } from './BasicItems/WarAxe';
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
import { RunedBracers } from './BasicItems/RunedBracers';
import { LoadedCannon } from './Recipes/LoadedCannon';
import { ManaAxe } from './Recipes/ManaAxe';
import { ManaInfusedMask } from './Recipes/ManaInfusedMask';
import { MaskOfProficiency } from './Recipes/MaskOfProficiency';
import { VialOfMagic } from './Recipes/VialOfMagic';
import { MasterCrystalBall } from './Recipes/MasterCrystalBall';
import { SnowyOwl } from './Recipes/SnowyOwl';
import { WandOfShadowsight } from './Recipes/WandOfShadowsight';
import { GoblinNightScope } from './BasicItems/GoblinNightScope';
import { Soulcage } from './Recipes/Soulcage';
import { SpellShield } from './Recipes/SpellShield';
import { SwordOfFreyr } from './Recipes/SwordOfFreyr';
import { SwordOfNaegling } from './Recipes/SwordOfNaegling';
import { ThrowableAxe } from './Recipes/ThrowableAxe';
import { BloodiedSacrificialDagger } from './BasicItems/SacrificialDagger';
import { VampireClaws } from './BasicItems/VampireClaws';
import { VampireDagger } from './Recipes/VampireDagger';
import { AssassinsBlade } from './Recipes/AssassinsBlade';
import { AssassinsCloak } from './Recipes/AssassinsCloak';
import { NaturesBlessing } from './Recipes/NaturesBlessing';

const itemMap: Map<string, Item> = new Map();
itemMap.set('crystalBall', new CrystalBall());
itemMap.set('sobiMask', new SobiMask());
itemMap.set('moonArmor', new MoonArmor());
itemMap.set('ironShield', new IronShield());
itemMap.set('reinforcedHide', new ReinforcedHide());
itemMap.set('studdedLeatherArmor', new StuddedLeatherArmor());
itemMap.set('bootsOfSpeed', new BootsOfSpeed());
itemMap.set('bloodiedExecutionersAxe', new BloodiedExecutionersAxe());
itemMap.set('blueSoulstone', new BlueSoulstone());
itemMap.set('branch', new Branch());
itemMap.set('claws', new Claws());
itemMap.set('cloakOfShadows', new CloakOfShadows());
itemMap.set('clockworkPenguin', new ClockworkPenguin());
itemMap.set('emptySoulcage', new EmptySoulcage());
itemMap.set('emptyVial', new EmptyVial());
itemMap.set('flare', new Flare());
itemMap.set('goblinBattery', new GoblinBattery());
itemMap.set('greenSoulstone', new GreenSoulstone());
itemMap.set('ironSword', new IronSword());
itemMap.set('orbOfMagic', new OrbOfMagic());
itemMap.set('purpleSoulstone', new PurpleSoulstone());
itemMap.set('scepter', new Scepter());
itemMap.set('warAxe', new WarAxe());
itemMap.set('runedBracers', new RunedBracers());
itemMap.set('goblinNightScope', new GoblinNightScope());
itemMap.set('bloodiedSacrificialDagger', new BloodiedSacrificialDagger());
itemMap.set('vampireClaws', new VampireClaws());

itemMap.set('manaEgg', new ManaEgg(itemMap.get('emptyVial') as EmptyVial));
itemMap.set('improvedMoonArmor', new ImprovedMoonArmor(itemMap.get('moonArmor') as MoonArmor));
itemMap.set('balancedShield', new BalancedShield(itemMap.get('moonArmor') as MoonArmor, itemMap.get('ironShield') as IronShield));
itemMap.set('improvedBalancedShield', new ImprovedBalancedShield(itemMap.get('balancedShield') as BalancedShield));
itemMap.set('steelShield', new SteelShield(itemMap.get('ironShield') as IronShield));
itemMap.set('agileSlippers', new AgileSlippers(itemMap.get('bootsOfSpeed') as BootsOfSpeed));
itemMap.set('scrollOfAgility', new ScrollOfAgility(itemMap.get('agileSlippers') as AgileSlippers));
itemMap.set('creatureClaws', new CreatureClaws(itemMap.get('claws') as Claws, itemMap.get('studdedLeatherArmor') as StuddedLeatherArmor));
itemMap.set('dragonWhelpClaws', new DragonWhelpClaws(itemMap.get('creatureClaws') as CreatureClaws));
itemMap.set('berserkerAxes', new BerserkerAxes(itemMap.get('warAxe') as WarAxe));
itemMap.set('loadedRifle', new LoadedRifle(itemMap.get('ironSword') as IronSword));
itemMap.set(
    'coralScales',
    new CoralScales(itemMap.get('reinforcedHide') as ReinforcedHide, itemMap.get('studdedLeatherArmor') as StuddedLeatherArmor),
);
itemMap.set('reinforcedScales', new ReinforcedScales(itemMap.get('steelShield') as SteelShield, itemMap.get('coralScales') as CoralScales));
itemMap.set('manaBlade', new ManaBlade(itemMap.get('ironSword') as IronSword, itemMap.get('emptyVial') as EmptyVial));
itemMap.set('ironClaws', new IronClaws(itemMap.get('ironSword') as IronSword, itemMap.get('claws') as Claws));
itemMap.set('theAegis', new TheAegis(itemMap.get('steelShield') as SteelShield, itemMap.get('scepter') as Scepter));
itemMap.set('vialOfMagic', new VialOfMagic(itemMap.get('orbOfMagic') as OrbOfMagic, itemMap.get('emptyVial') as EmptyVial));
itemMap.set('maskOfProficiency', new MaskOfProficiency(itemMap.get('orbOfMagic') as OrbOfMagic, itemMap.get('sobiMask') as SobiMask));
itemMap.set('adeptCrystalBall', new AdeptCrystalBall(itemMap.get('crystalBall') as CrystalBall, itemMap.get('sobiMask') as SobiMask));
itemMap.set('wandOfShadowsight', new WandOfShadowsight(itemMap.get('goblinNightScope') as GoblinNightScope, itemMap.get('flare') as Flare));
itemMap.set('enchantedShield', new EnchantedShield(itemMap.get('orbOfMagic') as OrbOfMagic, itemMap.get('moonArmor') as MoonArmor));
itemMap.set('lionsRing', new LionsRing(itemMap.get('runedBracers') as RunedBracers, itemMap.get('improvedMoonArmor') as ImprovedMoonArmor));
itemMap.set('manaAxe', new ManaAxe(itemMap.get('warAxe') as WarAxe, itemMap.get('emptyVial') as EmptyVial));
itemMap.set('fragarach', new Fragarach(itemMap.get('manaBlade') as ManaBlade, itemMap.get('ironClaws') as IronClaws));
itemMap.set('swordOfFreyr', new SwordOfFreyr(itemMap.get('manaBlade') as ManaBlade, itemMap.get('manaAxe') as ManaAxe));
itemMap.set(
    'vampireDagger',
    new VampireDagger(itemMap.get('bloodiedSacrificialDagger') as BloodiedSacrificialDagger, itemMap.get('vampireClaws') as VampireClaws),
);
itemMap.set('assassinsBlade', new AssassinsBlade(itemMap.get('ironSword') as IronSword));
itemMap.set(
    'cloakOfShadowWalk',
    new CloakOfShadowWalk(itemMap.get('cloakOfShadows') as CloakOfShadows, itemMap.get('scrollOfAgility') as ScrollOfAgility),
);
export default [
    itemMap.get('improvedMoonArmor') as ItemRecipe,
    itemMap.get('improvedBalancedShield') as ItemRecipe,
    itemMap.get('reinforcedScales') as ItemRecipe,
    itemMap.get('balancedShield') as ItemRecipe,
    itemMap.get('steelShield') as ItemRecipe,
    itemMap.get('coralScales') as ItemRecipe,
    itemMap.get('agileSlippers') as ItemRecipe,
    itemMap.get('scrollOfAgility') as ItemRecipe,
    itemMap.get('creatureClaws') as ItemRecipe,
    itemMap.get('dragonWhelpClaws') as ItemRecipe,
    itemMap.get('berserkerAxes') as ItemRecipe,
    itemMap.get('manaBlade') as ItemRecipe,
    itemMap.get('ironClaws') as ItemRecipe,
    itemMap.get('theAegis') as ItemRecipe,
    itemMap.get('vialOfMagic') as ItemRecipe,
    itemMap.get('maskOfProficiency') as ItemRecipe,
    itemMap.get('adeptCrystalBall') as ItemRecipe,
    itemMap.get('wandOfShadowsight') as ItemRecipe,
    itemMap.get('enchantedShield') as ItemRecipe,
    itemMap.get('lionsRing') as ItemRecipe,
    itemMap.get('manaAxe') as ItemRecipe,
    itemMap.get('manaEgg') as ItemRecipe,
    itemMap.get('loadedRifle') as ItemRecipe,
    itemMap.get('swordOfFreyr') as ItemRecipe,
    itemMap.get('fragarach') as ItemRecipe,
    itemMap.get('vampireDagger') as ItemRecipe,
    itemMap.get('assassinsBlade') as ItemRecipe,
    new AssassinsCloak(
        itemMap.get('assassinsBlade') as AssassinsBlade,
        itemMap.get('cloakOfShadowWalk') as CloakOfShadowWalk,
    ) as ItemRecipe,
    new AdvancedReinforcedHides(
        itemMap.get('improvedMoonArmor') as ImprovedMoonArmor,
        itemMap.get('improvedBalancedShield') as ImprovedBalancedShield,
        itemMap.get('reinforcedScales') as ReinforcedScales,
    ) as ItemRecipe,
    new AgileSlippers(itemMap.get('bootsOfSpeed') as BootsOfSpeed) as ItemRecipe,
    new Ancile(itemMap.get('manaEgg') as ManaEgg, itemMap.get('ironShield') as IronShield) as ItemRecipe,
    new ArmoredBoots(itemMap.get('bootsOfSpeed') as BootsOfSpeed, itemMap.get('steelShield') as SteelShield) as ItemRecipe,
    new Caduceus(itemMap.get('branch') as Branch, itemMap.get('studdedLeatherArmor') as StuddedLeatherArmor) as ItemRecipe,
    new CircesStaff(itemMap.get('branch') as Branch, itemMap.get('scepter') as Scepter) as ItemRecipe,
    new DragonScales(itemMap.get('dragonWhelpClaws') as DragonWhelpClaws, itemMap.get('coralScales') as CoralScales) as ItemRecipe,
    new EnhancedBerserkerAxes(itemMap.get('berserkerAxes') as BerserkerAxes) as ItemRecipe,
    new LightningBolt(itemMap.get('goblinBattery') as GoblinBattery, itemMap.get('theAegis') as TheAegis) as ItemRecipe,
    new LoadedCannon(itemMap.get('loadedRifle') as LoadedRifle, itemMap.get('ironSword') as IronSword) as ItemRecipe,
    new ManaInfusedMask(itemMap.get('maskOfProficiency') as MaskOfProficiency, itemMap.get('vialOfMagic') as VialOfMagic) as ItemRecipe,
    new MasterCrystalBall(itemMap.get('adeptCrystalBall') as AdeptCrystalBall, itemMap.get('vialOfMagic') as VialOfMagic) as ItemRecipe,
    new SnowyOwl(itemMap.get('clockworkPenguin') as ClockworkPenguin, itemMap.get('wandOfShadowsight') as WandOfShadowsight) as ItemRecipe,
    new Soulcage(
        itemMap.get('emptySoulcage') as EmptySoulcage,
        itemMap.get('greenSoulstone') as GreenSoulstone,
        itemMap.get('blueSoulstone') as BlueSoulstone,
        itemMap.get('purpleSoulstone') as PurpleSoulstone,
    ) as ItemRecipe,
    new SpellShield(
        itemMap.get('vialOfMagic') as VialOfMagic,
        itemMap.get('enchantedShield') as EnchantedShield,
        itemMap.get('lionsRing') as LionsRing,
    ) as ItemRecipe,
    new SwordOfNaegling(itemMap.get('fragarach') as Fragarach, itemMap.get('swordOfFreyr') as SwordOfFreyr) as ItemRecipe,
    new ThrowableAxe(itemMap.get('bloodiedExecutionersAxe') as BloodiedExecutionersAxe, itemMap.get('scepter') as Scepter) as ItemRecipe,
    new NaturesBlessing(itemMap.get('reinforcedHide') as ReinforcedHide, itemMap.get('branch') as Branch),
];

export const basicItems: Item[] = [
    itemMap.get('bloodiedExecutionersAxe') as Item,
    itemMap.get('blueSoulstone') as Item,
    itemMap.get('bootsOfSpeed') as Item,
    itemMap.get('branch') as Item,
    itemMap.get('claws') as Item,
    itemMap.get('cloakOfShadows') as Item,
    itemMap.get('clockworkPenguin') as Item,
    itemMap.get('crystalBall') as Item,
    itemMap.get('emptySoulcage') as Item,
    itemMap.get('emptyVial') as Item,
    itemMap.get('flare') as Item,
    itemMap.get('goblinBattery') as Item,
    itemMap.get('goblinNightScope') as Item,
    itemMap.get('greenSoulstone') as Item,
    itemMap.get('ironShield') as Item,
    itemMap.get('ironSword') as Item,
    itemMap.get('moonArmor') as Item,
    itemMap.get('orbOfMagic') as Item,
    itemMap.get('purpleSoulstone') as Item,
    itemMap.get('reinforcedHide') as Item,
    itemMap.get('runedBracers') as Item,
    itemMap.get('scepter') as Item,
    itemMap.get('sobiMask') as Item,
    itemMap.get('studdedLeatherArmor') as Item,
    itemMap.get('vampireClaws') as Item,
    itemMap.get('warAxe') as Item,
];
