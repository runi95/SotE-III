import { ItemUse } from '../ItemUse';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';
import { GroupInRange } from '../../JassOverrides/GroupInRange';

export class GoblinBatteryUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I01O');
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Monsoon\\MonsoonBoltTarget.mdl', x, y));
        const charges: number = GetItemCharges(GetManipulatedItem());
        SetItemCharges(GetManipulatedItem(), 0);
        const chargesDivided: number = charges / 10;
        for (let i: number = 0; i < chargesDivided; i++) {
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Weapons\\Bolt\\BoltImpact.mdl',
                    x + this.randomNumberGenerator.random(0, 400) - 200,
                    y + this.randomNumberGenerator.random(0, 400) - 200,
                ),
            );
        }

        const damage: number = Pow(0.94, -charges);
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(400, loc);
        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });

        RemoveLocation(loc);
    }
}
