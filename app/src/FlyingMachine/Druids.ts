import { Travel } from './Travel';

export class Druids extends Travel {
    protected readonly x: number = 5000;
    protected readonly y: number = 12000;
    protected readonly itemTypeId: number = FourCC('I01T');
}
