import { Travel } from './Travel';

export class Beetles extends Travel {
    protected readonly x: number = -128;
    protected readonly y: number = 12160;
    protected readonly itemTypeId: number = FourCC('I01S');
}
