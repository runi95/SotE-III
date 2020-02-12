import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Branch } from '../BasicItems/Branch';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';

const itemId: number = FourCC('I02Z');
const name: string = `Nature's Blessing`;
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost: number = 2500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNaturesBlessing.blp';
const description: string = `A branch blessed by mother nature herself.

|cffffcc00Effect:|r Heals 1000 hitpoints over 10 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class NaturesBlessing extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide, branch: Branch) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide, branch]);
    }
}
