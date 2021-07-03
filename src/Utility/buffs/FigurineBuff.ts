import { Buff } from '../Buff';
import { BuffTypes } from '../BuffTypes';
import { GameGlobals } from '../../Game/GameGlobals';

export enum FigurineTypes {
    NONE,
    ANCIENT_FIGURINE,
    SCALY_FIGURINE
}


export class FigurineBuff extends Buff {
    private readonly gameGlobals: GameGlobals;
    private readonly playerId: number;
    private specialEffect: effect | undefined;
    private figurineType: FigurineTypes;

    constructor(playerId: number, figurineType: FigurineTypes, gameGlobals: GameGlobals) {
        const tickDuration = 1;
        const initialDuration = 5;
        super(tickDuration, initialDuration);

        this.playerId = playerId;
        this.figurineType = figurineType;
        this.gameGlobals = gameGlobals;
    }

    public onInitialBuffApply(): void {
        this.specialEffect = AddSpecialEffectTarget('Abilities\\Spells\\Orc\\Voodoo\\VoodooAuraTarget.mdl', this.gameGlobals.PlayerHero[this.playerId], 'overhead');
        this.gameGlobals.FigurineActive[this.playerId] = true;
        this.gameGlobals.FigurineType[this.playerId] = this.figurineType;
    }

    public tick(): void {
        // This function is intentionally left empty!
    }

    public getBuffType(): BuffTypes {
        return BuffTypes.ANCIENT_FIGURINE;
    }

    public stackBuff(buff: this): void {
        this.setDuration(5);
        this.gameGlobals.FigurineActive[this.playerId] = true;

        if (buff.figurineType > this.figurineType) {
            this.figurineType = buff.figurineType;
            this.gameGlobals.FigurineType[this.playerId] = this.figurineType;
        }
    }

    public clearBuff(): void {
        if (this.specialEffect !== undefined) {
            DestroyEffect(this.specialEffect);
        }
        this.gameGlobals.FigurineActive[this.playerId] = false;
        this.gameGlobals.FigurineType[this.playerId] = FigurineTypes.NONE;
    }
}
