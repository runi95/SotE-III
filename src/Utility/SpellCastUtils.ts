import { GameGlobals } from "../Game/GameGlobals";
import { RandomNumberGenerator } from "./RandomNumberGenerator";

export class SpellCastUtils {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly fullVialItemId: number = FourCC('I016');

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public GetIntelligence(u: unit): number {
        const int: number = GetHeroInt(u, true);
        let bonuses = 0;

        const playerId: number = GetPlayerId(GetOwningPlayer(u));
        if (this.gameGlobals.ManaStoneCount[playerId] > 0) {
            const currentMana: number = GetUnitState(u, UNIT_STATE_MANA);
            const newManaAmount: number = 0.95 * currentMana;
            bonuses += currentMana - newManaAmount;
            SetUnitManaBJ(u, newManaAmount);
        }

        const fullVial: item = GetItemOfTypeFromUnitBJ(u, this.fullVialItemId);
        if (fullVial !== undefined) {
            if (GetItemCharges(fullVial) === 60) {
                SetItemCharges(fullVial, 0);
                bonuses += 0.25 * int;
            }
        }

        if (this.gameGlobals.PlayerCriticalCast[playerId] > 0) {
            if (this.randomNumberGenerator.random(1, 100) <= 25) {
                bonuses += (int + bonuses) * this.gameGlobals.PlayerCriticalCast[playerId]
            }
        }

        return int + bonuses;
    }
}
