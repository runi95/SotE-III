import { Travel } from './Travel';

export class Revenants extends Travel {
    protected readonly x: number = 12800;
    protected readonly y: number = 256;
    protected readonly itemTypeId: number = FourCC('I01V');
}
