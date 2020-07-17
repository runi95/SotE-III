import { Item } from './Item';
import { CrystalBall } from './BaseItems/CrystalBall';
import { SobiMask } from './BaseItems/SobiMask';
import { MoonArmor } from './BaseItems/MoonArmor';
import { IronShield } from './BaseItems/IronShield';
import { ReinforcedHide } from './BaseItems/ReinforcedHide';
import { StuddedLeatherArmor } from './BaseItems/StuddedLeatherArmor';
import { BootsOfSpeed } from './BaseItems/BootsOfSpeed';
import { BloodiedExecutionersAxe } from './BaseItems/BloodiedExecutionersAxe';
import { DruidicSalve } from './BaseItems/DruidicSalve';
import { Claws } from './BaseItems/Claws';
import { CloakOfShadows } from './BaseItems/CloakOfShadows';
import { ClockworkPenguin } from './BaseItems/ClockworkPenguin';
import { EmptyVial } from './BaseItems/EmptyVial';
import { FlareGun } from './BaseItems/FlareGun';
import { GoblinBattery } from './BaseItems/GoblinBattery';
import { IronSword } from './BaseItems/IronSword';
import { OrbOfMagic } from './BaseItems/OrbOfMagic';
import { Scepter } from './BaseItems/Scepter';
import { WarAxe } from './BaseItems/WarAxe';
import { RunedBracers } from './BaseItems/RunedBracers';
import { GoblinNightScope } from './BaseItems/GoblinNightScope';
import { BloodiedSacrificialDagger } from './BaseItems/BloodiedSacrificialDagger';
import { VampireClaws } from './BaseItems/VampireClaws';
import { OrbOfLightning } from './BaseItems/OrbOfLightning';
import { IronwoodBranch } from './BaseItems/IronwoodBranch';
import { AmuletOfSpellReflection } from './BaseItems/AmuletOfSpellReflection';
import { LifeStone } from './BaseItems/LifeStone';
import { SteelSpear } from './BaseItems/SteelSpear';
import { PipeOfInsight } from './BaseItems/PipeOfInsight';
import { FairyWand } from './BaseItems/FairyWand';
import { OrbOfFire } from './BaseItems/OrbOfFire';
import { ScrollOfWitchcraft } from './BaseItems/ScrollOfWitchcraft';
import { OrbOfVenom } from './BaseItems/OrbOfVenom';

/**
 * Base Item Controller
 *
 * Qualifiers:
 * - has to be purchasable in a shop
 * - is used in 2 to 4 recipes
 * - costs between 100 - 1500 gold
 */

export const itemMap: Map<string, Item> = new Map();

itemMap.set('amuletOfSpellReflection', new AmuletOfSpellReflection());
itemMap.set('bloodiedExecutionersAxe', new BloodiedExecutionersAxe());
itemMap.set('bloodiedSacrificialDagger', new BloodiedSacrificialDagger());
itemMap.set('bootsOfSpeed', new BootsOfSpeed());
itemMap.set('claws', new Claws());
itemMap.set('cloakOfShadows', new CloakOfShadows());
itemMap.set('clockworkPenguin', new ClockworkPenguin());
itemMap.set('crystalBall', new CrystalBall());
itemMap.set('druidicSalve', new DruidicSalve());
itemMap.set('emptyVial', new EmptyVial());
itemMap.set('fairyWand', new FairyWand());
itemMap.set('flareGun', new FlareGun());
itemMap.set('goblinBattery', new GoblinBattery());
itemMap.set('goblinNightScope', new GoblinNightScope());
itemMap.set('ironShield', new IronShield());
itemMap.set('ironSword', new IronSword());
itemMap.set('ironwoodBranch', new IronwoodBranch());
itemMap.set('lifeStone', new LifeStone());
itemMap.set('moonArmor', new MoonArmor());
itemMap.set('orbOfFire', new OrbOfFire());
itemMap.set('orbOfLightning', new OrbOfLightning());
itemMap.set('orbOfMagic', new OrbOfMagic());
itemMap.set('orbOfVenom', new OrbOfVenom());
itemMap.set('pipeOfInsight', new PipeOfInsight());
itemMap.set('reinforcedHide', new ReinforcedHide());
itemMap.set('runedBracers', new RunedBracers());
itemMap.set('scepter', new Scepter());
itemMap.set('scrollOfWitchcraft', new ScrollOfWitchcraft());
itemMap.set('sobiMask', new SobiMask());
itemMap.set('steelSpear', new SteelSpear());
itemMap.set('studdedLeatherArmor', new StuddedLeatherArmor());
itemMap.set('vampireClaws', new VampireClaws());
itemMap.set('warAxe', new WarAxe());

export const basicItems: Item[] = [...itemMap.values()] as Item[];
