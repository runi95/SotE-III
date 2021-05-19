import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';
import { GameGlobals } from '../../Game/GameGlobals';

export class MoonBladeBuff extends Buff {
    private readonly gameGlobals: GameGlobals;
    private readonly playerId: number;
    private temporaryResistance: number;

    constructor(playerId: number, gameGlobals: GameGlobals) {
        const tickDuration = 1;
        const initialDuration = 5;
        super(tickDuration, initialDuration);

        this.temporaryResistance = 5;
        this.playerId = playerId;
        this.gameGlobals = gameGlobals;
    }

    public getTemporaryResistance(): number {
        return this.temporaryResistance;
    }

    public onInitialBuffApply(): void {
        this.gameGlobals.PlayerSpellBlock[this.playerId] += this.temporaryResistance;
    }

    // eslint-disable-next-line
    public tick(): void {}

    public getBuffType(): BuffTypes {
        return BuffTypes.MOON_BLADE;
    }

    public stackBuff(buff: this): void {
        this.setDuration(5);
        if (this.temporaryResistance >= 50) {
            return;
        }

        const increasedTemporaryResistance: number = buff.getTemporaryResistance();
        this.temporaryResistance += increasedTemporaryResistance;
        this.gameGlobals.PlayerSpellBlock[this.playerId] += increasedTemporaryResistance;
    }

    public clearBuff(): void {
        this.gameGlobals.PlayerSpellBlock[this.playerId] -= this.temporaryResistance;
    }
}
