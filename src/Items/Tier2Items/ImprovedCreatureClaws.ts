import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from '../Tier1Items/CreatureClaws';
import { ItemLabel } from '../ItemLabel';
import { OrbOfVenom } from '../BaseItems/OrbOfVenom';
import { OrbOfLightning } from '../BaseItems/OrbOfLightning';

const itemId: number = FourCC('I025');
const name = 'Improved Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.VENOM];
const goldCost = 1930;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedCreatureAttack.tga';
const description = `These claws seem to cut through things better than any sharp knife would.

|cffffcc00Agility:|r +20
|cffffcc00Venom:|r +40
|cffffcc00Effect:|r Venom now slows envenomed units' movement speed by 30%

|cFF808080Venom causes attacks to apply stacking poison damage.|r`;

export class ImprovedCreatureClaws extends ItemRecipe {
    constructor(creatureClaws: CreatureClaws, orbOfVenom: OrbOfVenom, orbOfLightning: OrbOfLightning) {
        super(itemId, name, labels, goldCost, iconPath, description, [creatureClaws, orbOfVenom, orbOfLightning]);
    }
}
