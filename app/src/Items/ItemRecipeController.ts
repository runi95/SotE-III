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

const crystalBall: CrystalBall = new CrystalBall();
const sobiMask: SobiMask = new SobiMask();
const moonArmor: MoonArmor = new MoonArmor();
const ironShield: IronShield = new IronShield();
const reinforcedHide: ReinforcedHide = new ReinforcedHide();
const studdedLeatherArmor: StuddedLeatherArmor = new StuddedLeatherArmor();
const bootsOfSpeed: BootsOfSpeed = new BootsOfSpeed();
const bloodiedExecutionersAxe: BloodiedExecutionersAxe = new BloodiedExecutionersAxe();
const blueSoulstone: BlueSoulstone = new BlueSoulstone();
const branch: Branch = new Branch();
const claws: Claws = new Claws();
const cloakOfShadows: CloakOfShadows = new CloakOfShadows();
const clockworkPenguin: ClockworkPenguin = new ClockworkPenguin();
const emptySoulcage: EmptySoulcage = new EmptySoulcage();
const emptyVial: EmptyVial = new EmptyVial();
const flare: Flare = new Flare();
const goblinBattery: GoblinBattery = new GoblinBattery();
const greenSoulstone: GreenSoulstone = new GreenSoulstone();
const ironSword: IronSword = new IronSword();
const loadedRifle: LoadedRifle = new LoadedRifle(ironSword);
const orbOfMagic: OrbOfMagic = new OrbOfMagic();
const purpleSoulstone: PurpleSoulstone = new PurpleSoulstone();
const scepter: Scepter = new Scepter();
const warAxe: WarAxe = new WarAxe();
const runedBracers: RunedBracers = new RunedBracers();
const goblinNightScope: GoblinNightScope = new GoblinNightScope();
const bloodiedSacrificialDagger: BloodiedSacrificialDagger = new BloodiedSacrificialDagger();
const vampireClaws: VampireClaws = new VampireClaws();
const manaEgg: ManaEgg = new ManaEgg(emptyVial);
const balancedShield: BalancedShield = new BalancedShield(moonArmor, ironShield);
const improvedMoonArmor: ImprovedMoonArmor = new ImprovedMoonArmor(moonArmor);
const improvedBalancedShield: ImprovedBalancedShield = new ImprovedBalancedShield(balancedShield);
const steelShield: SteelShield = new SteelShield(ironShield);
const coralScales: CoralScales = new CoralScales(reinforcedHide, studdedLeatherArmor);
const reinforcedScales: ReinforcedScales = new ReinforcedScales(steelShield, coralScales);
const agileSlippers: AgileSlippers = new AgileSlippers(bootsOfSpeed);
const scrollOfAgility: ScrollOfAgility = new ScrollOfAgility(agileSlippers);
const creatureClaws: CreatureClaws = new CreatureClaws(claws, studdedLeatherArmor);
const dragonWhelpClaws: DragonWhelpClaws = new DragonWhelpClaws(creatureClaws);
const berserkerAxes: BerserkerAxes = new BerserkerAxes(warAxe);
const manaBlade: ManaBlade = new ManaBlade(ironSword, emptyVial);
const ironClaws: IronClaws = new IronClaws(ironSword, claws);
const theAegis: TheAegis = new TheAegis(steelShield, scepter);
const vialOfMagic: VialOfMagic = new VialOfMagic(orbOfMagic, emptyVial);
const maskOfProficiency: MaskOfProficiency = new MaskOfProficiency(orbOfMagic, sobiMask);
const adeptCrystalBall: AdeptCrystalBall = new AdeptCrystalBall(crystalBall, sobiMask);
const wandOfShadowsight: WandOfShadowsight = new WandOfShadowsight(goblinNightScope, flare);
const enchantedShield: EnchantedShield = new EnchantedShield(orbOfMagic, moonArmor);
const lionsRing: LionsRing = new LionsRing(runedBracers, improvedMoonArmor);
const manaAxe: ManaAxe = new ManaAxe(warAxe, emptyVial);
const fragarach: Fragarach = new Fragarach(manaBlade, ironClaws);
const swordOfFreyr: SwordOfFreyr = new SwordOfFreyr(manaBlade, manaAxe);
const vampireDagger: VampireDagger = new VampireDagger(bloodiedSacrificialDagger, vampireClaws);
export default [
    improvedMoonArmor,
    improvedBalancedShield,
    reinforcedScales,
    balancedShield,
    steelShield,
    coralScales,
    agileSlippers,
    scrollOfAgility,
    creatureClaws,
    dragonWhelpClaws,
    berserkerAxes,
    manaBlade,
    ironClaws,
    theAegis,
    vialOfMagic,
    maskOfProficiency,
    adeptCrystalBall,
    wandOfShadowsight,
    enchantedShield,
    lionsRing,
    manaAxe,
    manaEgg,
    loadedRifle,
    swordOfFreyr,
    fragarach,
    vampireDagger,
    new AssassinsBlade(ironSword),
    new AdvancedReinforcedHides(improvedMoonArmor, improvedBalancedShield, reinforcedScales),
    new AgileSlippers(bootsOfSpeed),
    new Ancile(manaEgg, ironShield),
    new ArmoredBoots(bootsOfSpeed, steelShield),
    new Caduceus(branch, studdedLeatherArmor),
    new CircesStaff(branch, scepter),
    new CloakOfShadowWalk(cloakOfShadows, scrollOfAgility),
    new DragonScales(dragonWhelpClaws, coralScales),
    new EnhancedBerserkerAxes(berserkerAxes),
    new LightningBolt(goblinBattery, theAegis),
    new LoadedCannon(loadedRifle, ironSword),
    new ManaInfusedMask(maskOfProficiency, vialOfMagic),
    new MasterCrystalBall(adeptCrystalBall, vialOfMagic),
    new SnowyOwl(clockworkPenguin, wandOfShadowsight),
    new Soulcage(emptySoulcage, greenSoulstone, blueSoulstone, purpleSoulstone),
    new SpellShield(vialOfMagic, enchantedShield, lionsRing),
    new SwordOfNaegling(fragarach, swordOfFreyr),
    new ThrowableAxe(bloodiedExecutionersAxe, scepter),
];
