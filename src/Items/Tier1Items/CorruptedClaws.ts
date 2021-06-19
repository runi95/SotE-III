import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';
import { ItemLabel } from '../ItemLabel';
import { OrbOfCorruption } from '../BaseItems/OrbOfCorruption';

const itemId: number = FourCC('I059');
const name = 'Corrupted Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 1075;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCorruptedClaws.dds';
const description = `These claws seem to have been corrupted by darkness.

|cffffcc00Agility:|r +15
|cffffcc00Unique:|r Decreases the armor of attacked units by 5

|cFF808080Agility increases your attack and movement speed.|r`;

export class CorruptedClaws extends ItemRecipe {
    constructor(claws: Claws, orbOfCorruption: OrbOfCorruption) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, orbOfCorruption]);
    }
}
