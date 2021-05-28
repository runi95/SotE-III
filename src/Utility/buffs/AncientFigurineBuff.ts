import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';
import { GameGlobals } from '../../Game/GameGlobals';

export class AncientFigurineBuff extends Buff {
    private readonly gameGlobals: GameGlobals;
    private readonly playerId: number;
    private specialEffect: effect | undefined;

    constructor(playerId: number, gameGlobals: GameGlobals) {
        const tickDuration = 1;
        const initialDuration = 5;
        super(tickDuration, initialDuration);

        this.playerId = playerId;
        this.gameGlobals = gameGlobals;
    }

    public onInitialBuffApply(): void {
        this.specialEffect = AddSpecialEffectTarget('Abilities\\Spells\\Orc\\Voodoo\\VoodooAuraTarget.mdl', this.gameGlobals.PlayerHero[this.playerId], 'overhead');
        this.gameGlobals.AncientFigurineActive[this.playerId] = true;
    }

    public tick(): void {
        // This function is intentionally left empty!
    }

    public getBuffType(): BuffTypes {
        return BuffTypes.ANCIENT_FIGURINE;
    }

    public stackBuff(): void {
        this.setDuration(5);
        this.gameGlobals.AncientFigurineActive[this.playerId] = true;
    }

    public clearBuff(): void {
        if (this.specialEffect !== undefined) {
            DestroyEffect(this.specialEffect);
        }
        this.gameGlobals.AncientFigurineActive[this.playerId] = false;
    }
}
