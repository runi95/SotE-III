import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';
import { GameGlobals } from '../../Game/GameGlobals';

export class MantleOfIntelligenceBuff extends Buff {
    private readonly gameGlobals: GameGlobals;
    private readonly playerId: number;
    private temporaryResistanceReductionAmount: number;

    constructor(playerId: number, gameGlobals: GameGlobals) {
        const tickDuration: number = 1;
        const initialDuration: number = 5;
        super(tickDuration, initialDuration);

        this.temporaryResistanceReductionAmount = 0;
        this.playerId = playerId;
        this.gameGlobals = gameGlobals;
    }

    public onInitialBuffApply(): void {
        this.temporaryResistanceReductionAmount = Math.floor(this.gameGlobals.PlayerSpellBlock[this.playerId] * 0.15);
        this.gameGlobals.PlayerSpellBlock[this.playerId] -= this.temporaryResistanceReductionAmount;
    }

    public tick(): void {}

    public getBuffType(): BuffTypes {
        return BuffTypes.MOON_BLADE;
    }

    public stackBuff(_: this): void {
        this.setDuration(5);
    }

    public clearBuff(): void {
        this.gameGlobals.PlayerSpellBlock[this.playerId] += this.temporaryResistanceReductionAmount;
    }
}
