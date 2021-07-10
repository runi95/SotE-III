import { GameGlobals } from '../../Game/GameGlobals';
import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';

export class ClawsOfUnholyStrengthBuff extends Buff {
    private readonly playerId: number;
    private readonly gameGlobals: GameGlobals;
    private specialEffect: effect | undefined;

    constructor(playerId: number, gameGlobals: GameGlobals) {
        const tickDuration = 1;
        const initialDuration = 5;
        super(tickDuration, initialDuration);

        this.gameGlobals = gameGlobals;
        this.playerId = playerId;
    }

    public onInitialBuffApply(): void {
        this.gameGlobals.ClawsOfUnholyStrengthOn[this.playerId] = true;
        this.specialEffect = AddSpecialEffectTarget('Abilities\\Spells\\Human\\DivineShield\\DivineShieldTarget.mdl', this.gameGlobals.PlayerHero[this.playerId], 'origin');
    }

    public tick(): void {
        // This function is intentionally left empty!
    }

    public getBuffType(): BuffTypes {
        return BuffTypes.CLAWS_OF_UNHOLY_STRENGTH;
    }

    public stackBuff(): void {
        // This function is intentionally left empty!
    }

    public clearBuff(): void {
        this.gameGlobals.ClawsOfUnholyStrengthOn[this.playerId] = false;
        if (this.specialEffect !== undefined) {
            DestroyEffect(this.specialEffect);
        }
    }
}
