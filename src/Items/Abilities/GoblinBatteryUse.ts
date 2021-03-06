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
        SetItemCharges(GetManipulatedItem(), 1);
        const chargesDivided: number = charges / 10;
        for (let i = 0; i < chargesDivided; i++) {
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Weapons\\Bolt\\BoltImpact.mdl',
                    x + this.randomNumberGenerator.random(0, 400) - 200,
                    y + this.randomNumberGenerator.random(0, 400) - 200,
                ),
            );
        }

        // Min damage (1 charge): 2
        //     damage (25 charges): 75
        //     damage (50 charges): 200
        //     damage (75 charges): 375
        //     damage (90 charges): 504
        // Max damage (100 charges): 600
        const damage: number = 2 * charges + 4 * Pow(charges / 10, 2);
        // const damage: number = Pow(0.94, -charges);
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(400, loc);
        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
