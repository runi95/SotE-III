import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02J');
const name: string = 'Bloodied Sacrificial Dagger';
const labels: ItemLabel[] = [];
const goldCost: number = 3000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBloodiedSacrifice.blp';
const description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Effect:|r Deals 1000 damage to target enemy unit

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class BloodiedSacrificialDagger extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
