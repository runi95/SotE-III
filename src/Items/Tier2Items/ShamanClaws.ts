import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from '../Tier1Items/CreatureClaws';
import { IronClaws } from '../Tier1Items/IronClaws';

const itemId: number = FourCC('I042');
const name: string = 'Shaman Claws';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.AGILITY];
const goldCost: number = 7960;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNShamanAdept.blp';
const description: string = `Useful when cooking shaman recipes.

|cffffcc00Attack damage:|r +80
|cffffcc00Agility:|r +44

|cFF808080Agility increases your attack and movement speed.|r`;

export class ShamanClaws extends ItemRecipe {
    constructor(creatureClaws: CreatureClaws, ironClaws: IronClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [creatureClaws, ironClaws]);
    }
}
