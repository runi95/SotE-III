import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00K');
const name: string = 'Mana Blade';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 530;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumMelee.blp';
const description: string = `A steel sword coated in mana, capable of boosting your physical and magical abilities.

|cffffcc00Attack damage:|r +7

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class ManaBlade extends ItemRecipe {
    constructor(ironSword: IronSword, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironSword, emptyVial]);
    }
}
