import { Item } from './Item';
import { AssassinsBlade } from './UnclassedItems/AssassinsBlade';
import { AssassinsMap } from './UnclassedItems/AssassinsMap';
import { SacrificialDagger } from './UnclassedItems/SacrificialDagger';
import { BlueSoulstone } from './UnclassedItems/BlueSoulstone';
import { EnchantedGemstone } from './UnclassedItems/EnchantedGemstone';
import { GreenSoulstone } from './UnclassedItems/GreenSoulstone';
import { JuggernautArmor } from './UnclassedItems/JuggernautArmor';
import { PurpleSoulstone } from './UnclassedItems/PurpleSoulstone';
import { SpiritTalisman } from './UnclassedItems/SpiritTalisman';
import { HoodOfCunning } from './UnclassedItems/HoodOfCunning';
import { CircletOfNobility } from './UnclassedItems/CircletOfNobility';

export const itemMap: Map<string, Item> = new Map();

// TRULY UNCLASSED ITEMS
itemMap.set('AssassinsMap', new AssassinsMap());
itemMap.set('sacrificialDagger', new SacrificialDagger());

// STARTER ITEMS
itemMap.set('assassinsBlade', new AssassinsBlade());
itemMap.set('hoodOfCunning', new HoodOfCunning());
itemMap.set('circletOfNobility', new CircletOfNobility());

// BOSS ITEMS
itemMap.set('blueSoulstone', new BlueSoulstone());
itemMap.set('enchantedGemstone', new EnchantedGemstone());
itemMap.set('greenSoulstone', new GreenSoulstone());
itemMap.set('juggernautArmor', new JuggernautArmor());
itemMap.set('purpleSoulstone', new PurpleSoulstone());
itemMap.set('spiritTalisman', new SpiritTalisman());

export default [...itemMap.values()] as Item[];
