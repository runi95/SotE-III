import { Timer } from '../JassOverrides/Timer';
import { TimerUtils } from '../Utility/TimerUtils';
import { ChargingItem } from './ChargingItem';

export class ItemChargeUtils {
    private readonly timerUtils: TimerUtils;
    private readonly itemMap: Map<number, ChargingItem>;
    
    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
        this.itemMap = new Map<number, ChargingItem>();

        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            for (const keySet of this.itemMap) {
                keySet[1].charge();
            }
        });
    }

    addItem(chargingItem: ChargingItem): void {
        this.itemMap.set(chargingItem.chargingItemHandleId, chargingItem);
    }

    removeItem(itemHandleId: number): void {
        this.itemMap.delete(itemHandleId);
    }
}