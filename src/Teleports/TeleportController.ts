import { RedEntrance } from './RedEntrance';
import { BlueEntrance } from './BlueEntrance';
import { TealEntrance } from './TealEntrance';
import { PurpleEntrance } from './PurpleEntrance';
import { YellowEntrance } from './YellowEntrance';
import { OrangeEntrance } from './OrangeEntrance';
import { SpawnTeleporter } from './SpawnTeleporter';
import { GameGlobals } from "../Game/GameGlobals";
import { Trigger } from "../JassOverrides/Trigger";

export class TeleportController {
    private readonly teleports: SpawnTeleporter[];
    private readonly locustAbilityId: number = FourCC('Aloc');
    private readonly waygateUnitId: number = FourCC('n00Z');
    private readonly gameGlobals: GameGlobals;
    private freeze = false;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
        this.teleports = [
            new RedEntrance(),
            new BlueEntrance(),
            new TealEntrance(),
            new PurpleEntrance(),
            new YellowEntrance(),
            new OrangeEntrance(),
        ];

        this.createWaygate(Player(0), 8576, 10240, 10048, 10240);
        this.createWaygate(Player(1), 8576, -256, 10048, -256);
        this.createWaygate(Player(2), 8576, -10720, 10048, -10720);
        this.createWaygate(Player(3), -2656, 10240, -4128, 10240);
        this.createWaygate(Player(4), -2656, -256, -4128, -256);
        this.createWaygate(Player(5), -2656, -10720, -4128, -10720);

        const trig: Trigger = new Trigger();
        trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
        trig.addCondition(() => GetIssuedOrderIdBJ() === 851971 && !this.freeze);
        trig.addAction(() => {
            const orderedX: number = GetOrderPointX();
            const orderedY: number = GetOrderPointY();
            const orderedUnit: unit = GetOrderedUnit();
            const playerId: number = GetPlayerId(GetOwningPlayer(orderedUnit));

            for(let i = 0; i < this.gameGlobals.PlayerSpawnRegion.length; i++) {
                if (playerId !== i && RectContainsCoords(this.gameGlobals.PlayerSpawnRegion[i], orderedX, orderedY)) {
                    this.freeze = true;
                    IssuePointOrderById(orderedUnit, 851971, GetUnitX(orderedUnit), GetUnitY(orderedUnit));
                    this.freeze = false;
                }
            }
        });
    }

    createWaygate(p: player, x: number, y: number, destinationX: number, destinationY: number): void {
        const waygate: unit = CreateUnit(p, this.waygateUnitId, x, y, 270);
        WaygateSetDestination(waygate, destinationX, destinationY);
        WaygateActivate(waygate, true);
        UnitAddAbility(waygate, this.locustAbilityId);
    }
}
