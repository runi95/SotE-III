import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class BloodiedSacrificialDagger extends Item {
    public readonly itemId: number = FourCC('I02J');
    public readonly name: string = 'Bloodied Sacrificial Dagger';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 3000;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBloodiedSacrifice.blp';
    public readonly description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Effect:|r Deals 1000 damage to target enemy unit

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
