import { Travel } from './Travel';

export class Murlocs extends Travel {
    protected readonly x: number = 12600;
    protected readonly y: number = 9350;
    protected readonly itemTypeId: number = FourCC('I01U');
}
