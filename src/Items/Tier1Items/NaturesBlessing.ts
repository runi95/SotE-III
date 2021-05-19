import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { DruidicSalve } from '../BaseItems/DruidicSalve';
import { ReinforcedHide } from '../BaseItems/ReinforcedHide';

const itemId: number = FourCC('I02Z');
const name = `Nature's Blessing`;
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost = 2500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNaturesBlessing.blp';
const description = `A branch blessed by mother nature herself.

|cffffcc00Use:|r Heals 1000 hitpoints over 10 seconds
|cffffcc00Mana Cost:|r 300
|cffffcc00Duration:|r 10
|cffffcc00Cooldown:|r 20

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class NaturesBlessing extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide, druidicSalve: DruidicSalve) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide, druidicSalve]);
    }
}
