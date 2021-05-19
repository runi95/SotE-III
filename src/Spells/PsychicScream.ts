import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class PsychicScream extends Spell {
    protected readonly abilityId: number = FourCC('A01G');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 75 * abilityLevel + this.spellCastUtils.GetIntelligence(trig);
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const loc: location = Location(x, y);
        const grp: GroupInRange = new GroupInRange(500, loc);

        grp.for((u: unit) => {
            if (IsUnitEnemy(u, Player(playerId)) && UnitAlive(u)) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                const uX: number = GetUnitX(u);
                const uY: number = GetUnitY(u);
                const dist: number = Math.sqrt(Pow(uX - x, 2) + Pow(uY - y, 2));
                const multX: number = 100 * ((uX - x) / dist);
                const multY: number = 100 * ((uY - y) / dist);
                let targetX: number = uX;
                let targetY: number = uY;

                for (let i = 0; i < 4; i++) {
                    targetX += multX;
                    targetY += multY;
                    if (IsTerrainPathable(targetX, targetY, PATHING_TYPE_WALKABILITY)) {
                        targetX -= multX;
                        targetY -= multY;
                        break;
                    }
                }

                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', uX, uY));
                SetUnitPosition(u, targetX, targetY);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
