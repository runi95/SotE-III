import { ItemRecipe } from '../ItemRecipe';
import { EmptySoulcage } from '../Tier2Items/EmptySoulcage';
import { GreenSoulstone } from '../UnclassedItems/GreenSoulstone';
import { BlueSoulstone } from '../UnclassedItems/BlueSoulstone';
import { PurpleSoulstone } from '../UnclassedItems/PurpleSoulstone';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I011');
const name: string = 'Soulcage';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.STRENGTH, ItemLabel.INTELLIGENCE];
const goldCost: number = 9800;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTN3M3.blp';
const description: string = `A soulcage harnessing the powers of three soulstones.

|cffffcc00Agility:|r +30
|cffffcc00Strength:|r +30
|cffffcc00Intelligence:|r +30

|cFF808080Agility increases your attack and movement speed.|r`;

export class Soulcage extends ItemRecipe {
    constructor(
        emptySoulcage: EmptySoulcage,
        greenSoulstone: GreenSoulstone,
        blueSoulstone: BlueSoulstone,
        purpleSoulstone: PurpleSoulstone,
    ) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptySoulcage, greenSoulstone, blueSoulstone, purpleSoulstone]);
    }
}
