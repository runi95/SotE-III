import { ItemUse } from '../ItemUse';

export class CaduceusUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I019');
    private readonly arcaneVault: unit;

    constructor(arcaneVault: unit) {
        super();

        this.arcaneVault = arcaneVault;
    }

    protected action(): void {
        DestroyEffect(
            AddSpecialEffect(
                'Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTarget.mdl',
                GetUnitX(GetTriggerUnit()),
                GetUnitY(GetTriggerUnit()),
            ),
        );
        SetUnitPosition(GetTriggerUnit(), GetUnitX(this.arcaneVault), GetUnitY(this.arcaneVault));
    }
}
