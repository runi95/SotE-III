import { Boss } from '../Boss';

export class CentaurLeader extends Boss {
    protected readonly bossId: number = FourCC('n02D');
    protected readonly x: number = 14654.0;
    protected readonly y: number = 14658.0;
    protected readonly angle: number = 235.0;

    constructor() {
        super(Rect(14624, 14624, 14688, 14688));
    }
}
