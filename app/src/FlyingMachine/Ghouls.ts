import { Travel } from './Travel';

export class Ghouls extends Travel {
    protected readonly x: number = -7800;
    protected readonly y: number = -13300;
    protected readonly itemTypeId: number = FourCC('I01Y');
}
