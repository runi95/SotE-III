import { Item } from './Item';
import { CrystalBall } from './BasicItems/CrystalBall';
import { SobiMask } from './BasicItems/SobiMask';
import { MoonArmor } from './BasicItems/MoonArmor';
import { IronShield } from './BasicItems/IronShield';
import { ReinforcedHide } from './BasicItems/ReinforcedHide';
import { StuddedLeatherArmor } from './BasicItems/StuddedLeatherArmor';
import { BootsOfSpeed } from './BasicItems/BootsOfSpeed';
import { BloodiedExecutionersAxe } from './BasicItems/BloodiedExecutionersAxe';
import { BlueSoulstone } from './BasicItems/BlueSoulstone';
import { DruidicSalve } from './BasicItems/DruidicSalve';
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
import { RunedBracers } from './BasicItems/RunedBracers';
import { GoblinNightScope } from './BasicItems/GoblinNightScope';
import { BloodiedSacrificialDagger } from './BasicItems/SacrificialDagger';
import { VampireClaws } from './BasicItems/VampireClaws';
import { MaskOfDeath } from './BasicItems/MaskOfDeath';
import { JuggernautArmor } from './BasicItems/JuggernautArmor';
import { EnchantedGemstone } from './BasicItems/EnchantedGemstone';
import { SlowChains } from './BasicItems/SlowChains';
import { IronwoodBranch } from './BasicItems/IronwoodBranch';

export const itemMap: Map<string, Item> = new Map();

itemMap.set('crystalBall', new CrystalBall());
itemMap.set('sobiMask', new SobiMask());
itemMap.set('moonArmor', new MoonArmor());
itemMap.set('ironShield', new IronShield());
itemMap.set('reinforcedHide', new ReinforcedHide());
itemMap.set('studdedLeatherArmor', new StuddedLeatherArmor());
itemMap.set('bootsOfSpeed', new BootsOfSpeed());
itemMap.set('bloodiedExecutionersAxe', new BloodiedExecutionersAxe());
itemMap.set('blueSoulstone', new BlueSoulstone());
itemMap.set('druidicSalve', new DruidicSalve());
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
itemMap.set('maskOfDeath', new MaskOfDeath());
itemMap.set('spiritTalisman', new MaskOfDeath());
itemMap.set('juggernautArmor', new JuggernautArmor());
itemMap.set('enchantedGemstone', new EnchantedGemstone());
itemMap.set('slowChains', new SlowChains());
itemMap.set('ironwoodBranch', new IronwoodBranch());

export const basicItems: Item[] = [
    itemMap.get('bloodiedExecutionersAxe') as Item,
    itemMap.get('blueSoulstone') as Item,
    itemMap.get('bootsOfSpeed') as Item,
    itemMap.get('druidicSalve') as Item,
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
    itemMap.get('maskOfDeath') as Item,
    itemMap.get('spiritTalisman') as Item,
    itemMap.get('juggernautArmor') as Item,
    itemMap.get('enchantedGemstone') as Item,
    itemMap.get('ironwoodBranch') as Item,
];
