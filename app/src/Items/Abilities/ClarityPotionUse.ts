import { ItemUse } from '../ItemUse';

export class ClarityPotionUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I00G');

    protected action(): void {
        UnitRemoveBuffsBJ(bj_REMOVEBUFFS_NEGATIVE, GetTriggerUnit());
    }
}
