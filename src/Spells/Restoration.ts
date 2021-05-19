import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';

export class Restoration {
    private readonly trig: Trigger = new Trigger();
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    protected condition(): boolean {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return false;
        }

        if (!IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        return this.gameGlobals.PlayerRestoration[playerId] > 0;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const abilityId: number = GetSpellAbilityId();
        const abilityLevel: number = GetUnitAbilityLevel(trig, abilityId);
        const manaCost: number = BlzGetUnitAbilityManaCost(trig, abilityId, abilityLevel - 1);
        const healingAmount: number = manaCost * this.gameGlobals.PlayerRestoration[playerId];
        SetUnitState(trig, UNIT_STATE_LIFE, GetWidgetLife(trig) + healingAmount);
        DestroyEffect(AddSpecialEffectTarget('Abilities\\Spells\\Human\\Heal\\HealTarget.mdl', trig, 'origin'));
    }
}
