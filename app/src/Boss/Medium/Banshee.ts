import { Boss } from '../Boss';

export class Banshee extends Boss {
    protected readonly bossId: number = FourCC('n02D');
    protected readonly x: number = 14654.0;
    protected readonly y: number = 14658.0;
    protected readonly angle: number = 235.0;

    constructor() {
        super(Rect(7456, 14752, 7584, 14880));
    }
}
