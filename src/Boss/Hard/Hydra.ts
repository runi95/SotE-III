import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class Hydra extends Boss {
    private hydralingCounter = 0;
    private readonly hydralingUnitId: number = FourCC('n02B');
    protected readonly bossId: number = FourCC('n02A');
    protected readonly x: number = 15071.0;
    protected readonly y: number = 10418.0;
    protected readonly angle: number = 210.0;
    protected readonly dropTable: number[] = [FourCC('I02K')]; // Envenomed Trident (7260)

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(14816, 10272, 15008, 10464), randomNumberGenerator);
    }

    protected spawnCondition(): boolean {
        if (this.hydralingCounter > 0) {
            return false;
        }

        return super.spawnCondition();
    }

    protected spawnAction(): void {
        this.hydralingCounter = 2;

        super.spawnAction();
    }

    protected deathCondition(): boolean {
        return true;
    }

    protected deathAction(): void {
        if (GetHandleId(GetDyingUnit()) === this.bossHandleId) {
            this.bossHandleId = undefined;
        } else if (GetUnitTypeId(GetDyingUnit()) === this.hydralingUnitId) {
            this.hydralingCounter--;

            if (this.hydralingCounter < 1) {
                CreateItem(this.dropTable[0], GetUnitX(GetDyingUnit()), GetUnitY(GetDyingUnit()));
            }
        }
    }
}
