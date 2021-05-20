export class ChargingItem {
    private readonly chargingItem: item;
    private readonly chargeLimit: number;
    private chargeLimitReachedFunction: ((chargedItem: item) => void) | undefined;
    private chargeConditionFunction: (() => boolean) | undefined;
    readonly chargingItemHandleId: number;

    constructor(chargingItem: item, chargeLimit: number) {
        this.chargingItem = chargingItem;
        this.chargeLimit = chargeLimit;
        this.chargingItemHandleId = GetHandleId(chargingItem);
    }

    setChargeCondition(chargeConditionFunction: () => boolean): void {
        this.chargeConditionFunction = chargeConditionFunction;
    }

    charge(): void {
        if (this.chargeConditionFunction === undefined || this.chargeConditionFunction()) {
            const charges: number = GetItemCharges(this.chargingItem);
            if (charges < this.chargeLimit) {
                SetItemCharges(this.chargingItem, charges + 1);
            } else {
                this.onChargeLimitReached();
            }
        }
    }

    setChargeLimitReachFunction(chargeLimitReachedFunction: (chargedItem: item) => void): void {
        this.chargeLimitReachedFunction = chargeLimitReachedFunction;
    }

    // eslint-disable-next-line
    onChargeLimitReached(): void {
        if (this.chargeLimitReachedFunction !== undefined) {
            this.chargeLimitReachedFunction(this.chargingItem);
        }
    }
}