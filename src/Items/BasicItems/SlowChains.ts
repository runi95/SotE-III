import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I033');
const name: string = 'Slow Chains';
const labels: ItemLabel[] = [];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSlow.blp';
const description: string = `Magically bound chains that can slow down anything to a halt.

|cffffcc00Use:|r Slows the target enemy unit's movement speed by 20% 
|cffffcc00Range:|r 700
|cffffcc00Duration:|r 5
|cffffcc00Cooldown:|r 60
|cffffcc00Mana Cost:|r 45

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SlowChains extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
