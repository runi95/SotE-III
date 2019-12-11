import { Item } from '../Item';

export class Claws extends Item {
    public readonly itemId: number = FourCC('I00M');
    public readonly name: string = 'Claws';
    public readonly goldCost: number = 300;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNUnholyStrength.blp';
    public readonly description: string = `Practicing with these will surely make you super fast.

|cffffcc00Agility:|r +4

|cFF808080Agility increases your attack and movement speed.|r`;
}
