import { RemoveHandleEvent } from "./events/RemoveHandleEvent";
import { Handle } from "./Handle";
import { Event } from "./events/Event";
import { UnitEventProcessor, UnitEventType } from "../services/UnitEventProcessor";
import { EventSettings } from "../services/EventTarget";
import { ObjectStorage } from "../services/ObjectStorage";
import { UnitEvent } from "./events/unit/UnitEvent";
import { UnitDeathEvent } from "./events/unit/UnitDeathEvent";
import { UnitResearchEvent } from "./events/unit/UnitResearchEvent";
import { UnitStartTrainEvent } from "./events/unit/UnitStartTrainEvent";
import { UnitFinishTrainEvent } from "./events/unit/UnitFinishTrainEvent";
import { UnitDetectEvent } from "./events/unit/UnitDetectedEvent";
import { UnitSummonEvent } from "./events/unit/UnitSummonEvent";
import { UnitLoadedEvent } from "./events/unit/UnitLoadedEvent";
import { UnitSellItemEvent } from "./events/unit/UnitSellItemEvent";
import { UnitSellUnitEvent } from "./events/unit/UnitSellUnitEvent";
import { UnitChangeOwnerEvent } from "./events/unit/UnitChangeOwnerEvent";
import { UnitIssuedOrderEvent } from "./events/unit/UnitIssuedOrderEvent";
import { UnitIssuedPointOrderEvent } from "./events/unit/UnitIssuedPointOrderEvent";
import { UnitIssuedTargetOrderEvent } from "./events/unit/UnitIssuedTargetOrderEvent";
import { UnitSpellEvent } from "./events/unit/UnitSpellEvent";
import { UnitAcquiredTargetEvent } from "./events/unit/UnitAcquiredTargetEvent";
import { UnitTargetInRangeEvent } from "./events/unit/UnitTargetInRangeEvent";
import { UnitAttackedEvent } from "./events/unit/UnitAttackedEvent";
import { UnitStartConstructionEvent } from "./events/unit/UnitStartConstructionEvent";
import { UnitCancelConstructionEvent } from "./events/unit/UnitCancelConstructionEvent";
import { UnitFinishConstructionEvent } from "./events/unit/UnitFinishConstructionEvent";
import { UnitCancelTrainEvent } from "./events/unit/UnitCancelTrainEvent";
import { UnitDamagedEvent } from "./events/unit/UnitDamagedEvent";
import { UnitDamagingEvent } from "./events/unit/UnitDamagingEvent";
import { UnitHiddenEvent } from "./events/unit/UnitHiddenEvent";
import { UnitSelectedEvent } from "./events/unit/UnitSelectedEvent";
import { UnitDeselectedEvent } from "./events/unit/UnitDeselectedEvent";
import { UnitUpgradeEvent } from "./events/unit/UnitUpgradeEvent";
import { UnitHeroLevelEvent } from "./events/unit/UnitHeroLevelEvent";
import { UnitHeroReviveEvent } from "./events/unit/UnitHeroReviveEvent";
import { UnitDecayEvent } from "./events/unit/UnitDecayEvent";
import { UnitHeroSkillEvent } from "./events/unit/UnitHeroSkillEvent";
import { UnitDropItemEvent } from "./events/unit/UnitDropItemEvent";
import { UnitPickupItemEvent } from "./events/unit/UnitPickupItemEvent";
import { UnitUseItemEvent } from "./events/unit/UnitUseItemEvent";

const objectStorage = ObjectStorage.getInstance();
const unitEventProcessor = UnitEventProcessor.getInstance();

export class Unit extends Handle {
  constructor(handle: HUnit);
  constructor(owner: HPlayer, unit: number, x: number, y: number, face: number);
  constructor(owner: HPlayer, unit: number, x: number, y: number, face: number, corpse: boolean);
  constructor(owner: HPlayer, unitName: string, x: number, y: number, face: number);
  constructor(handleOrPlayer: any, unit?: undefined, x?: undefined, y?: undefined, face?: undefined, corpse?: undefined);
  public constructor(handleOrPlayer: any, unit?: number | string, x?: number, y?: number, face?: number, corpse?: boolean) {
    if (type(handleOrPlayer) === "unit") {
      super(handleOrPlayer);
    } else {
      if (!unit) throw new TypeError("unit must be set");

      if (type(unit) === "string") {
        super(CreateUnitByName(handleOrPlayer as HPlayer, unit as string, x as number, y as number, face as number));
      } else if (corpse) {
        super(CreateCorpse(handleOrPlayer as HPlayer, unit as number, x as number, y as number, face as number));
      } else {
        super(CreateUnit(handleOrPlayer as HPlayer, unit as number, x as number, y as number, face as number));
      }
    }
  }

  public toHandle(): HUnit | null {
    return this.handle as HUnit;
  }

  public addEventListener(type: "remove", listener: (event: RemoveHandleEvent<Unit>) => void, once?: EventSettings): void;
  public addEventListener(type: UnitEventType, listener: (event: UnitEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "death", listener: (event: UnitDeathEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchstart", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchcancel", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "researchfinish", listener: (event: UnitResearchEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "trainstart", listener: (event: UnitStartTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "traincancel", listener: (event: UnitCancelTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "trainfinish", listener: (event: UnitFinishTrainEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "detected", listener: (event: UnitDetectEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "summon", listener: (event: UnitSummonEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "loaded", listener: (event: UnitLoadedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "sellitem", listener: (event: UnitSellItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "sellunit", listener: (event: UnitSellUnitEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "changeowner", listener: (event: UnitChangeOwnerEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "dropitem", listener: (event: UnitDropItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "pickupitem", listener: (event: UnitPickupItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "useitem", listener: (event: UnitUseItemEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedorder", listener: (event: UnitIssuedOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedpointorder", listener: (event: UnitIssuedPointOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "issuedtargetorder", listener: (event: UnitIssuedTargetOrderEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellchannel", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellcast", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spelleffect", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellfinish", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "spellendcast", listener: (event: UnitSpellEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "acquiredtarget", listener: (event: UnitAcquiredTargetEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "targetinrange", listener: (event: UnitTargetInRangeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "attacked", listener: (event: UnitAttackedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "rescued", listener: (event: UnitAttackedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructstart", listener: (event: UnitStartConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructcancel", listener: (event: UnitCancelConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "constructfinish", listener: (event: UnitFinishConstructionEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "damaged", listener: (event: UnitDamagedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "damaging", listener: (event: UnitDamagingEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "hidden", listener: (event: UnitHiddenEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "selected", listener: (event: UnitSelectedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "deselected", listener: (event: UnitDeselectedEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradestart", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradecancel", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "upgradefinish", listener: (event: UnitUpgradeEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herolevel", listener: (event: UnitHeroLevelEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivable", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivestart", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivecancel", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "herorevivefinish", listener: (event: UnitHeroReviveEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "decay", listener: (event: UnitDecayEvent) => void, once?: EventSettings): void;
  public addEventListener(type: "heroskill", listener: (event: UnitHeroSkillEvent) => void, once?: EventSettings): void;
  public addEventListener(type: string, listener: (event: Event) => void, once?: EventSettings): void {
    if (unitEventProcessor.support(type)) {
      unitEventProcessor.subscribe(type, this);
      this.registerEventListener(type, listener, once);
    } else {
      super.addEventListener(type, listener, once);
    }
  }

  //
  // Autogenerated calls
  //

  public addHeroXP(xpToAdd: number, showEyeCandy: boolean): void {
    return AddHeroXP(this.handle as HUnit, xpToAdd, showEyeCandy);
  }

  public addItemToStock(itemId: number, currentStock: number, stockMax: number): void {
    return AddItemToStock(this.handle as HUnit, itemId, currentStock, stockMax);
  }

  public addResourceAmount(amount: number): void {
    return AddResourceAmount(this.handle as HUnit, amount);
  }

  public addAnimationProperties(animProperties: string, add: boolean): void {
    return AddUnitAnimationProperties(this.handle as HUnit, animProperties, add);
  }

  public addUnitToStock(unitId: number, currentStock: number, stockMax: number): void {
    return AddUnitToStock(this.handle as HUnit, unitId, currentStock, stockMax);
  }

  public decAbilityLevel(abilcode: number): number {
    return DecUnitAbilityLevel(this.handle as HUnit, abilcode);
  }

  public enableAttack(enable: boolean): void {
    return EnableUnitAttack(this.handle as HUnit, enable);
  }

  public enableAttackEx(enable: boolean): void {
    return EnableUnitAttackEx(this.handle as HUnit, enable);
  }

  public enableInventory(enable: boolean): void {
    return EnableUnitInventory(this.handle as HUnit, enable);
  }

  public enableInventoryEx(enable: boolean): void {
    return EnableUnitInventoryEx(this.handle as HUnit, enable);
  }

  public enableMovement(enable: boolean): void {
    return EnableUnitMovement(this.handle as HUnit, enable);
  }

  public enableMovementEx(enable: boolean): void {
    return EnableUnitMovementEx(this.handle as HUnit, enable);
  }

  public getHeroAgi(includeBonuses: boolean): number {
    return GetHeroAgi(this.handle as HUnit, includeBonuses);
  }

  public getHeroBaseProperName(nameIndex: number): string {
    return GetHeroBaseProperName(this.handle as HUnit, nameIndex);
  }

  public getHeroExperienceNeeded(forLevel: number): number {
    return GetHeroExperienceNeeded(this.handle as HUnit, forLevel);
  }

  public getHeroInt(includeBonuses: boolean): number {
    return GetHeroInt(this.handle as HUnit, includeBonuses);
  }

  public getHeroLevel(): number {
    return GetHeroLevel(this.handle as HUnit);
  }

  public getHeroMaxLevelExperienceNeeded(): number {
    return GetHeroMaxLevelExperienceNeeded(this.handle as HUnit);
  }

  public getHeroProperName(): string {
    return GetHeroProperName(this.handle as HUnit);
  }

  public getHeroSkillPoints(): number {
    return GetHeroSkillPoints(this.handle as HUnit);
  }

  public getHeroStr(includeBonuses: boolean): number {
    return GetHeroStr(this.handle as HUnit, includeBonuses);
  }

  public getHeroXP(): number {
    return GetHeroXP(this.handle as HUnit);
  }

  public getOwningPlayer(): HPlayer {
    return GetOwningPlayer(this.handle as HUnit);
  }

  public getAbility(aid: number): HAbility {
    return GetUnitAbility(this.handle as HUnit, aid);
  }

  public getAbilityByIndex(index: number): HAbility {
    return GetUnitAbilityByIndex(this.handle as HUnit, index);
  }

  public getAbilityLevel(abilcode: number): number {
    return GetUnitAbilityLevel(this.handle as HUnit, abilcode);
  }

  public getAttackCooldownByIndex(atttackIndex: number): number {
    return GetUnitAttackCooldownByIndex(this.handle as HUnit, atttackIndex);
  }

  public getAttackRangeByIndex(atttackIndex: number): number {
    return GetUnitAttackRangeByIndex(this.handle as HUnit, atttackIndex);
  }

  public getAttacksEnabledIndex(): number {
    return GetUnitAttacksEnabledIndex(this.handle as HUnit);
  }

  public getAttackTypeByIndex(atttackIndex: number): HAttackType {
    return GetUnitAttackTypeByIndex(this.handle as HUnit, atttackIndex);
  }

  public getBackswingPointByIndex(atttackIndex: number): number {
    return GetUnitBackswingPointByIndex(this.handle as HUnit, atttackIndex);
  }

  public getBaseDamageByIndex(atttackIndex: number): number {
    return GetUnitBaseDamageByIndex(this.handle as HUnit, atttackIndex);
  }

  public getBaseMissileArt(attackIndex: number): string {
    return GetUnitBaseMissileArt(this.handle as HUnit, attackIndex);
  }

  public getBaseMissileSpeed(attackIndex: number): number {
    return GetUnitBaseMissileSpeed(this.handle as HUnit, attackIndex);
  }

  public getBonusDamageByIndex(atttackIndex: number): number {
    return GetUnitBonusDamageByIndex(this.handle as HUnit, atttackIndex);
  }

  public getBuff(buffId: number): HBuff {
    return GetUnitBuff(this.handle as HUnit, buffId);
  }

  public getBuffLevel(buffId: number): number {
    return GetUnitBuffLevel(this.handle as HUnit, buffId);
  }

  public getCurrentOrder(): number {
    return GetUnitCurrentOrder(this.handle as HUnit);
  }

  public getCurrentResources(): number {
    return GetUnitCurrentResources(this.handle as HUnit);
  }

  public getDamageDicesByIndex(atttackIndex: number): number {
    return GetUnitDamageDicesByIndex(this.handle as HUnit, atttackIndex);
  }

  public getDamageDicesSideByIndex(atttackIndex: number): number {
    return GetUnitDamageDicesSideByIndex(this.handle as HUnit, atttackIndex);
  }

  public getDamagePointByIndex(atttackIndex: number): number {
    return GetUnitDamagePointByIndex(this.handle as HUnit, atttackIndex);
  }

  public getDamageReduction(): number {
    return GetUnitDamageReduction(this.handle as HUnit);
  }

  public getDefaultAcquireRange(): number {
    return GetUnitDefaultAcquireRange(this.handle as HUnit);
  }

  public getDefaultFlyHeight(): number {
    return GetUnitDefaultFlyHeight(this.handle as HUnit);
  }

  public getDefaultMoveSpeed(): number {
    return GetUnitDefaultMoveSpeed(this.handle as HUnit);
  }

  public getDefaultPropWindow(): number {
    return GetUnitDefaultPropWindow(this.handle as HUnit);
  }

  public getDefaultTurnSpeed(): number {
    return GetUnitDefaultTurnSpeed(this.handle as HUnit);
  }

  public getEluneMagicResist(): number {
    return GetUnitEluneMagicResist(this.handle as HUnit);
  }

  public getFlyHeight(): number {
    return GetUnitFlyHeight(this.handle as HUnit);
  }

  public getFoodMade(): number {
    return GetUnitFoodMade(this.handle as HUnit);
  }

  public getFoodUsed(): number {
    return GetUnitFoodUsed(this.handle as HUnit);
  }

  public getLevel(): number {
    return GetUnitLevel(this.handle as HUnit);
  }

  public getLoc(): HLocation {
    return GetUnitLoc(this.handle as HUnit);
  }

  public getLocustFlag(): number {
    return GetUnitLocustFlag(this.handle as HUnit);
  }

  public getMagicResistByType(resistType: number): number {
    return GetUnitMagicResistByType(this.handle as HUnit, resistType);
  }

  public getMinimapX(): number {
    return GetUnitMinimapX(this.handle as HUnit);
  }

  public getMinimapY(): number {
    return GetUnitMinimapY(this.handle as HUnit);
  }

  public getName(): string {
    return GetUnitName(this.handle as HUnit);
  }

  public getNextAttackTimeStampByIndex(attackIndex: number): number {
    return GetUnitNextAttackTimeStampByIndex(this.handle as HUnit, attackIndex);
  }

  public getPointValue(): number {
    return GetUnitPointValue(this.handle as HUnit);
  }

  public getRace(): HRace {
    return GetUnitRace(this.handle as HUnit);
  }

  public getRallyDestructable(): HDestructable {
    return GetUnitRallyDestructable(this.handle as HUnit);
  }

  public getRallyPoint(): HLocation {
    return GetUnitRallyPoint(this.handle as HUnit);
  }

  public getRallyUnit(): Unit {
    return objectStorage.getOrWrap(GetUnitRallyUnit(this.handle as HUnit));
  }

  public getRunicMagicResist(): number {
    return GetUnitRunicMagicResist(this.handle as HUnit);
  }

  public getState(whichUnitState: HUnitState): number {
    return GetUnitState(this.handle as HUnit, whichUnitState);
  }

  public getTotalMagicResist(): number {
    return GetUnitTotalMagicResist(this.handle as HUnit);
  }

  public getTotalMoveSpeed(): number {
    return GetUnitTotalMoveSpeed(this.handle as HUnit);
  }

  public getVertexColour(): number {
    return GetUnitVertexColour(this.handle as HUnit);
  }

  public getWeaponSoundByIndex(atttackIndex: number): number {
    return GetUnitWeaponSoundByIndex(this.handle as HUnit, atttackIndex);
  }

  public getWeaponTypeByIndex(atttackIndex: number): HWeaponType {
    return GetUnitWeaponTypeByIndex(this.handle as HUnit, atttackIndex);
  }

  public incAbilityLevel(abilcode: number): number {
    return IncUnitAbilityLevel(this.handle as HUnit, abilcode);
  }

  public issueBuildOrder(unitToBuild: string, x: number, y: number): boolean {
    return IssueBuildOrder(this.handle as HUnit, unitToBuild, x, y);
  }

  public issueBuildOrderById(unitId: number, x: number, y: number): boolean {
    return IssueBuildOrderById(this.handle as HUnit, unitId, x, y);
  }

  public issueImmediateOrder(order: string): boolean {
    return IssueImmediateOrder(this.handle as HUnit, order);
  }

  public issueImmediateOrderById(order: number): boolean {
    return IssueImmediateOrderById(this.handle as HUnit, order);
  }

  public issueInstantPointOrder(order: string, x: number, y: number, instantTargetWidget: HWidget): boolean {
    return IssueInstantPointOrder(this.handle as HUnit, order, x, y, instantTargetWidget);
  }

  public issueInstantPointOrderById(order: number, x: number, y: number, instantTargetWidget: HWidget): boolean {
    return IssueInstantPointOrderById(this.handle as HUnit, order, x, y, instantTargetWidget);
  }

  public issueInstantTargetOrder(order: string, targetWidget: HWidget, instantTargetWidget: HWidget): boolean {
    return IssueInstantTargetOrder(this.handle as HUnit, order, targetWidget, instantTargetWidget);
  }

  public issueInstantTargetOrderById(order: number, targetWidget: HWidget, instantTargetWidget: HWidget): boolean {
    return IssueInstantTargetOrderById(this.handle as HUnit, order, targetWidget, instantTargetWidget);
  }

  public issuePointOrder(order: string, x: number, y: number): boolean {
    return IssuePointOrder(this.handle as HUnit, order, x, y);
  }

  public issuePointOrderById(order: number, x: number, y: number): boolean {
    return IssuePointOrderById(this.handle as HUnit, order, x, y);
  }

  public issuePointOrderByIdLoc(order: number, whichLocation: HLocation): boolean {
    return IssuePointOrderByIdLoc(this.handle as HUnit, order, whichLocation);
  }

  public issuePointOrderLoc(order: string, whichLocation: HLocation): boolean {
    return IssuePointOrderLoc(this.handle as HUnit, order, whichLocation);
  }

  public issueTargetOrder(order: string, targetWidget: HWidget): boolean {
    return IssueTargetOrder(this.handle as HUnit, order, targetWidget);
  }

  public issueTargetOrderById(order: number, targetWidget: HWidget): boolean {
    return IssueTargetOrderById(this.handle as HUnit, order, targetWidget);
  }

  public isSuspendedXP(): boolean {
    return IsSuspendedXP(this.handle as HUnit);
  }

  public isUnit(whichSpecifiedUnit: Unit): boolean {
    return IsUnit(this.handle as HUnit, whichSpecifiedUnit.handle as HUnit);
  }

  public isAbilityVisible(abilityId: number): boolean {
    return IsUnitAbilityVisible(this.handle as HUnit, abilityId);
  }

  public isAlly(whichPlayer: HPlayer): boolean {
    return IsUnitAlly(this.handle as HUnit, whichPlayer);
  }

  public isAttackEnabled(): boolean {
    return IsUnitAttackEnabled(this.handle as HUnit);
  }

  public isAttackEnabledEx(): boolean {
    return IsUnitAttackEnabledEx(this.handle as HUnit);
  }

  public isDead(): boolean {
    return IsUnitDead(this.handle as HUnit);
  }

  public isDetected(whichPlayer: HPlayer): boolean {
    return IsUnitDetected(this.handle as HUnit, whichPlayer);
  }

  public isEnemy(whichPlayer: HPlayer): boolean {
    return IsUnitEnemy(this.handle as HUnit, whichPlayer);
  }

  public isFogged(whichPlayer: HPlayer): boolean {
    return IsUnitFogged(this.handle as HUnit, whichPlayer);
  }

  public isGatherer(): boolean {
    return IsUnitGatherer(this.handle as HUnit);
  }

  public isHero(): boolean {
    return IsUnitHero(this.handle as HUnit);
  }

  public isHidden(): boolean {
    return IsUnitHidden(this.handle as HUnit);
  }

  public isIllusion(): boolean {
    return IsUnitIllusion(this.handle as HUnit);
  }

  public isInForce(whichForce: HForce): boolean {
    return IsUnitInForce(this.handle as HUnit, whichForce);
  }

  public isInGroup(whichGroup: HGroup): boolean {
    return IsUnitInGroup(this.handle as HUnit, whichGroup);
  }

  public isInRange(otherUnit: Unit, distance: number): boolean {
    return IsUnitInRange(this.handle as HUnit, otherUnit.handle as HUnit, distance);
  }

  public isInRangeLoc(whichLocation: HLocation, distance: number): boolean {
    return IsUnitInRangeLoc(this.handle as HUnit, whichLocation, distance);
  }

  public isInRangeXY(x: number, y: number, distance: number): boolean {
    return IsUnitInRangeXY(this.handle as HUnit, x, y, distance);
  }

  public isInTransport(whichTransport: Unit): boolean {
    return IsUnitInTransport(this.handle as HUnit, whichTransport.handle as HUnit);
  }

  public isInventoryEnabled(): boolean {
    return IsUnitInventoryEnabled(this.handle as HUnit);
  }

  public isInventoryEnabledEx(): boolean {
    return IsUnitInventoryEnabledEx(this.handle as HUnit);
  }

  public isInvisible(whichPlayer: HPlayer): boolean {
    return IsUnitInvisible(this.handle as HUnit, whichPlayer);
  }

  public isInvulnerable(): boolean {
    return IsUnitInvulnerable(this.handle as HUnit);
  }

  public isLoaded(): boolean {
    return IsUnitLoaded(this.handle as HUnit);
  }

  public isMasked(whichPlayer: HPlayer): boolean {
    return IsUnitMasked(this.handle as HUnit, whichPlayer);
  }

  public isMovementEnabled(): boolean {
    return IsUnitMovementEnabled(this.handle as HUnit);
  }

  public isMovementEnabledEx(): boolean {
    return IsUnitMovementEnabledEx(this.handle as HUnit);
  }

  public isMoving(): boolean {
    return IsUnitMoving(this.handle as HUnit);
  }

  public isOwnedByPlayer(whichPlayer: HPlayer): boolean {
    return IsUnitOwnedByPlayer(this.handle as HUnit, whichPlayer);
  }

  public isPaused(): boolean {
    return IsUnitPaused(this.handle as HUnit);
  }

  public isRace(whichRace: HRace): boolean {
    return IsUnitRace(this.handle as HUnit, whichRace);
  }

  public isSelectable(): boolean {
    return IsUnitSelectable(this.handle as HUnit);
  }

  public isSelected(whichPlayer: HPlayer): boolean {
    return IsUnitSelected(this.handle as HUnit, whichPlayer);
  }

  public isShop(): boolean {
    return IsUnitShop(this.handle as HUnit);
  }

  public isStateNormal(additionalCheck: boolean): boolean {
    return IsUnitStateNormal(this.handle as HUnit, additionalCheck);
  }

  public isStunned(): boolean {
    return IsUnitStunned(this.handle as HUnit);
  }

  public isTower(): boolean {
    return IsUnitTower(this.handle as HUnit);
  }

  public isType(whichUnitType: HUnitType): boolean {
    return IsUnitType(this.handle as HUnit, whichUnitType);
  }

  public isisible(whichPlayer: HPlayer): boolean {
    return IsUnitVisible(this.handle as HUnit, whichPlayer);
  }

  public kill(): void {
    return KillUnit(this.handle as HUnit);
  }

  public morphToTypeId(uid: number): void {
    return MorphUnitToTypeId(this.handle as HUnit, uid);
  }

  public morphToTypeIdEx(
    uid: number,
    unitFlags: number,
    updateHealthState: boolean,
    updateManaState: boolean,
    healthStateId: number,
    manaStateId: number,
    updateScale: boolean,
    replaceAbilities: boolean,
    whichAbility: HAbility,
    resetBuildingAnimation: boolean
  ): void {
    return MorphUnitToTypeIdEx(
      this.handle as HUnit,
      uid,
      unitFlags,
      updateHealthState,
      updateManaState,
      healthStateId,
      manaStateId,
      updateScale,
      replaceAbilities,
      whichAbility,
      resetBuildingAnimation
    );
  }

  public pause(flag: boolean): void {
    return PauseUnit(this.handle as HUnit, flag);
  }

  public pauseEx(flag: boolean): void {
    return PauseUnitEx(this.handle as HUnit, flag);
  }

  public queueAnimation(whichAnimation: string): void {
    return QueueUnitAnimation(this.handle as HUnit, whichAnimation);
  }

  public recycleGuardPosition(): void {
    return RecycleGuardPosition(this.handle as HUnit);
  }

  public redraw(): void {
    return RedrawUnit(this.handle as HUnit);
  }

  public removeGuardPosition(): void {
    return RemoveGuardPosition(this.handle as HUnit);
  }

  public removeItemFromStock(itemId: number): void {
    return RemoveItemFromStock(this.handle as HUnit, itemId);
  }

  public removeUnitFromStock(unitId: number): void {
    return RemoveUnitFromStock(this.handle as HUnit, unitId);
  }

  public resetLookAt(): void {
    return ResetUnitLookAt(this.handle as HUnit);
  }

  public reviveHero(x: number, y: number, doEyecandy: boolean): boolean {
    return ReviveHero(this.handle as HUnit, x, y, doEyecandy);
  }

  public reviveHeroLoc(loc: HLocation, doEyecandy: boolean): boolean {
    return ReviveHeroLoc(this.handle as HUnit, loc, doEyecandy);
  }

  public selectHeroSkill(abilcode: number): void {
    return SelectHeroSkill(this.handle as HUnit, abilcode);
  }

  public select(flag: boolean): void {
    return SelectUnit(this.handle as HUnit, flag);
  }

  public setCameraOrientController(xoffset: number, yoffset: number): void {
    return SetCameraOrientController(this.handle as HUnit, xoffset, yoffset);
  }

  public setCameraTargetController(xoffset: number, yoffset: number, inheritOrientation: boolean): void {
    return SetCameraTargetController(this.handle as HUnit, xoffset, yoffset, inheritOrientation);
  }

  public setHeroAgi(newAgi: number, permanent: boolean): void {
    return SetHeroAgi(this.handle as HUnit, newAgi, permanent);
  }

  public setHeroBaseProperName(nameIndex: number, properName: string): void {
    return SetHeroBaseProperName(this.handle as HUnit, nameIndex, properName);
  }

  public setHeroInt(newInt: number, permanent: boolean): void {
    return SetHeroInt(this.handle as HUnit, newInt, permanent);
  }

  public setHeroLevel(level: number, showEyeCandy: boolean): void {
    return SetHeroLevel(this.handle as HUnit, level, showEyeCandy);
  }

  public setHeroStr(newStr: number, permanent: boolean): void {
    return SetHeroStr(this.handle as HUnit, newStr, permanent);
  }

  public setHeroXP(newXpVal: number, showEyeCandy: boolean): void {
    return SetHeroXP(this.handle as HUnit, newXpVal, showEyeCandy);
  }

  public setItemTypeSlots(slots: number): void {
    return SetItemTypeSlots(this.handle as HUnit, slots);
  }

  public setAbilityLevel(abilcode: number, level: number): number {
    return SetUnitAbilityLevel(this.handle as HUnit, abilcode, level);
  }

  public setAnimation(whichAnimation: string): void {
    return SetUnitAnimation(this.handle as HUnit, whichAnimation);
  }

  public setAnimationByIndex(whichAnimation: number): void {
    return SetUnitAnimationByIndex(this.handle as HUnit, whichAnimation);
  }

  public setAnimationWithRarity(whichAnimation: string, rarity: HRarityControl): void {
    return SetUnitAnimationWithRarity(this.handle as HUnit, whichAnimation, rarity);
  }

  public setAttackCooldownByIndex(atttackIndex: number, attackCooldown: number): void {
    return SetUnitAttackCooldownByIndex(this.handle as HUnit, atttackIndex, attackCooldown);
  }

  public setAttackRangeByIndex(atttackIndex: number, range: number): void {
    return SetUnitAttackRangeByIndex(this.handle as HUnit, atttackIndex, range);
  }

  public setAttackState(atttackIndex: number, attackState: number): number {
    return SetUnitAttackState(this.handle as HUnit, atttackIndex, attackState);
  }

  public setAttackTypeByIndex(atttackIndex: number, attackType: HAttackType): void {
    return SetUnitAttackTypeByIndex(this.handle as HUnit, atttackIndex, attackType);
  }

  public setBackswingPointByIndex(atttackIndex: number, backswing: number): void {
    return SetUnitBackswingPointByIndex(this.handle as HUnit, atttackIndex, backswing);
  }

  public setBaseDamageByIndex(atttackIndex: number, damage: number): void {
    return SetUnitBaseDamageByIndex(this.handle as HUnit, atttackIndex, damage);
  }

  public setBaseMissileArt(attackIndex: number, missleArt: string): void {
    return SetUnitBaseMissileArt(this.handle as HUnit, attackIndex, missleArt);
  }

  public setBaseMissileSpeed(attackIndex: number, missleSpeed: number): void {
    return SetUnitBaseMissileSpeed(this.handle as HUnit, attackIndex, missleSpeed);
  }

  public setBlendTime(blendTime: number): void {
    return SetUnitBlendTime(this.handle as HUnit, blendTime);
  }

  public setBonusDamageByIndex(atttackIndex: number, bonusDamage: number): void {
    return SetUnitBonusDamageByIndex(this.handle as HUnit, atttackIndex, bonusDamage);
  }

  public setColor(whichColor: HPlayerColor): void {
    return SetUnitColor(this.handle as HUnit, whichColor);
  }

  public setControl(flagValue: number, isSetFlagValue: boolean, ismove: boolean, isattack: boolean, isinventory: boolean): void {
    return SetUnitControl(this.handle as HUnit, flagValue, isSetFlagValue, ismove, isattack, isinventory);
  }

  public setCreepGuard(creepGuard: boolean): void {
    return SetUnitCreepGuard(this.handle as HUnit, creepGuard);
  }

  public setDamageDicesByIndex(atttackIndex: number, dices: number): void {
    return SetUnitDamageDicesByIndex(this.handle as HUnit, atttackIndex, dices);
  }

  public setDamageDicesSideByIndex(atttackIndex: number, dicesSides: number): void {
    return SetUnitDamageDicesSideByIndex(this.handle as HUnit, atttackIndex, dicesSides);
  }

  public setDamagePointByIndex(atttackIndex: number, damagePoint: number): void {
    return SetUnitDamagePointByIndex(this.handle as HUnit, atttackIndex, damagePoint);
  }

  public setExploded(exploded: boolean): void {
    return SetUnitExploded(this.handle as HUnit, exploded);
  }

  public setFacingEx(facing: number, isInstant: boolean): void {
    return SetUnitFacingEx(this.handle as HUnit, facing, isInstant);
  }

  public setFacingInstant(facing: number): void {
    return SetUnitFacingInstant(this.handle as HUnit, facing);
  }

  public setFacingTimed(facingAngle: number, duration: number): void {
    return SetUnitFacingTimed(this.handle as HUnit, facingAngle, duration);
  }

  public setFlyHeight(newHeight: number, rate: number): void {
    return SetUnitFlyHeight(this.handle as HUnit, newHeight, rate);
  }

  public setInvulnerable(flag: boolean): void {
    return SetUnitInvulnerable(this.handle as HUnit, flag);
  }

  public setLocustFlag(flag: number, mode: number): void {
    return SetUnitLocustFlag(this.handle as HUnit, flag, mode);
  }

  public setLookAt(whichBone: string, lookAtTarget: Unit, offsetX: number, offsetY: number, offsetZ: number): void {
    return SetUnitLookAt(this.handle as HUnit, whichBone, lookAtTarget.handle as HUnit, offsetX, offsetY, offsetZ);
  }

  public setModel(modelName: string): void {
    return SetUnitModel(this.handle as HUnit, modelName);
  }

  public setMoveTypeByIndex(moveIndex: number): void {
    return SetUnitMoveTypeByIndex(this.handle as HUnit, moveIndex);
  }

  public setNextAttackTimeStampByIndex(attackIndex: number, time: number): void {
    return SetUnitNextAttackTimeStampByIndex(this.handle as HUnit, attackIndex, time);
  }

  public setOwner(whichPlayer: HPlayer, changeColor: boolean): void {
    return SetUnitOwner(this.handle as HUnit, whichPlayer, changeColor);
  }

  public setPathing(flag: boolean): void {
    return SetUnitPathing(this.handle as HUnit, flag);
  }

  public setPosition(newX: number, newY: number): void {
    return SetUnitPosition(this.handle as HUnit, newX, newY);
  }

  public setPositionLoc(whichLocation: HLocation): void {
    return SetUnitPositionLoc(this.handle as HUnit, whichLocation);
  }

  public setReplaceableTexture(textureName: string, textureIndex: number): void {
    return SetUnitReplaceableTexture(this.handle as HUnit, textureName, textureIndex);
  }

  public setRescuable(byWhichPlayer: HPlayer, flag: boolean): void {
    return SetUnitRescuable(this.handle as HUnit, byWhichPlayer, flag);
  }

  public setRescueRange(range: number): void {
    return SetUnitRescueRange(this.handle as HUnit, range);
  }

  public setScale(scaleX: number, scaleY: number, scaleZ: number): void {
    return SetUnitScale(this.handle as HUnit, scaleX, scaleY, scaleZ);
  }

  public setSelectable(selectable: boolean): void {
    return SetUnitSelectable(this.handle as HUnit, selectable);
  }

  public setState(whichUnitState: HUnitState, newVal: number): void {
    return SetUnitState(this.handle as HUnit, whichUnitState, newVal);
  }

  public setStunned(state: boolean): void {
    return SetUnitStunned(this.handle as HUnit, state);
  }

  public setTruesightImmuneState(state: boolean): void {
    return SetUnitTruesightImmuneState(this.handle as HUnit, state);
  }

  public setTypeSlots(slots: number): void {
    return SetUnitTypeSlots(this.handle as HUnit, slots);
  }

  public setUseFood(useFood: boolean): void {
    return SetUnitUseFood(this.handle as HUnit, useFood);
  }

  public setVertexColor(red: number, green: number, blue: number, alpha: number): void {
    return SetUnitVertexColor(this.handle as HUnit, red, green, blue, alpha);
  }

  public setWeaponSoundByIndex(atttackIndex: number, weaponSound: number): void {
    return SetUnitWeaponSoundByIndex(this.handle as HUnit, atttackIndex, weaponSound);
  }

  public setWeaponTypeByIndex(atttackIndex: number, weaponType: HWeaponType): void {
    return SetUnitWeaponTypeByIndex(this.handle as HUnit, atttackIndex, weaponType);
  }

  public show(show: boolean): void {
    return ShowUnit(this.handle as HUnit, show);
  }

  public showAbility(abilityId: number, show: boolean): void {
    return ShowUnitAbility(this.handle as HUnit, abilityId, show);
  }

  public startItemCooldown(whichItem: HItem, cooldown: number): void {
    return StartItemCooldown(this.handle as HUnit, whichItem, cooldown);
  }

  public suspendHeroXP(flag: boolean): void {
    return SuspendHeroXP(this.handle as HUnit, flag);
  }

  public addAbility(abilityId: number): boolean {
    return UnitAddAbility(this.handle as HUnit, abilityId);
  }

  public addAbilityEx(abilityId: number, checkForDuplicates: boolean): boolean {
    return UnitAddAbilityEx(this.handle as HUnit, abilityId, checkForDuplicates);
  }

  public addExtraAttackByIndex(atttackIndex: number): boolean {
    return UnitAddExtraAttackByIndex(this.handle as HUnit, atttackIndex);
  }

  public addIndicator(red: number, green: number, blue: number, alpha: number): void {
    return UnitAddIndicator(this.handle as HUnit, red, green, blue, alpha);
  }

  public addItem(whichItem: HItem): boolean {
    return UnitAddItem(this.handle as HUnit, whichItem);
  }

  public addItemById(itemId: number): HItem {
    return UnitAddItemById(this.handle as HUnit, itemId);
  }

  public addItemToSlotById(itemId: number, itemSlot: number): boolean {
    return UnitAddItemToSlotById(this.handle as HUnit, itemId, itemSlot);
  }

  public addSleep(add: boolean): void {
    return UnitAddSleep(this.handle as HUnit, add);
  }

  public addSleepPerm(add: boolean): void {
    return UnitAddSleepPerm(this.handle as HUnit, add);
  }

  public addType(whichUnitType: HUnitType): boolean {
    return UnitAddType(this.handle as HUnit, whichUnitType);
  }

  public applySilence(state: boolean): void {
    return UnitApplySilence(this.handle as HUnit, state);
  }

  public applyTimedLife(buffId: number, duration: number): void {
    return UnitApplyTimedLife(this.handle as HUnit, buffId, duration);
  }

  public applyUpdates(): number {
    return UnitApplyUpdates(this.handle as HUnit);
  }

  public cancelCurrentAttackByIndex(atttackIndex: number): number {
    return UnitCancelCurrentAttackByIndex(this.handle as HUnit, atttackIndex);
  }

  public canSleep(): boolean {
    return UnitCanSleep(this.handle as HUnit);
  }

  public canSleepPerm(): boolean {
    return UnitCanSleepPerm(this.handle as HUnit);
  }

  public countBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): number {
    return UnitCountBuffsEx(this.handle as HUnit, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public damagePoint(
    delay: number,
    radius: number,
    x: number,
    y: number,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: HAttackType,
    damageType: HDamageType,
    weaponType: HWeaponType
  ): boolean {
    return UnitDamagePoint(this.handle as HUnit, delay, radius, x, y, amount, attack, ranged, attackType, damageType, weaponType);
  }

  public damageTarget(
    target: HWidget,
    amount: number,
    attack: boolean,
    ranged: boolean,
    attackType: HAttackType,
    damageType: HDamageType,
    weaponType: HWeaponType
  ): boolean {
    return UnitDamageTarget(this.handle as HUnit, target, amount, attack, ranged, attackType, damageType, weaponType);
  }

  public disableAbilities(state: boolean): void {
    return UnitDisableAbilities(this.handle as HUnit, state);
  }

  public dropItemPoint(whichItem: HItem, x: number, y: number): boolean {
    return UnitDropItemPoint(this.handle as HUnit, whichItem, x, y);
  }

  publicdropItemSlot(whichItem: HItem, slot: number): boolean {
    return UnitDropItemSlot(this.handle as HUnit, whichItem, slot);
  }

  public dropItemTarget(whichItem: HItem, target: HWidget): boolean {
    return UnitDropItemTarget(this.handle as HUnit, whichItem, target);
  }

  public hasBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): boolean {
    return UnitHasBuffsEx(this.handle as HUnit, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public hasItem(whichItem: HItem): boolean {
    return UnitHasItem(this.handle as HUnit, whichItem);
  }

  public ignoreAlarm(flag: boolean): boolean {
    return UnitIgnoreAlarm(this.handle as HUnit, flag);
  }

  public ignoreAlarmToggled(): boolean {
    return UnitIgnoreAlarmToggled(this.handle as HUnit);
  }

  public inventorySize(): number {
    return UnitInventorySize(this.handle as HUnit);
  }

  public isSleeping(): boolean {
    return UnitIsSleeping(this.handle as HUnit);
  }

  public itemInSlot(itemSlot: number): HItem {
    return UnitItemInSlot(this.handle as HUnit, itemSlot);
  }

  public makeAbilityPermanent(permanent: boolean, abilityId: number): boolean {
    return UnitMakeAbilityPermanent(this.handle as HUnit, permanent, abilityId);
  }

  public modifySkillPoints(skillPointDelta: number): boolean {
    return UnitModifySkillPoints(this.handle as HUnit, skillPointDelta);
  }

  public pauseTimedLife(flag: boolean): void {
    return UnitPauseTimedLife(this.handle as HUnit, flag);
  }

  public removeAbility(abilityId: number): boolean {
    return UnitRemoveAbility(this.handle as HUnit, abilityId);
  }

  public removeAbilityEx(abilityId: number, removeDuplicates: boolean): boolean {
    return UnitRemoveAbilityEx(this.handle as HUnit, abilityId, removeDuplicates);
  }

  public removeBuffs(removePositive: boolean, removeNegative: boolean): void {
    return UnitRemoveBuffs(this.handle as HUnit, removePositive, removeNegative);
  }

  public removeBuffsEx(
    removePositive: boolean,
    removeNegative: boolean,
    magic: boolean,
    physical: boolean,
    timedLife: boolean,
    aura: boolean,
    autoDispel: boolean
  ): void {
    return UnitRemoveBuffsEx(this.handle as HUnit, removePositive, removeNegative, magic, physical, timedLife, aura, autoDispel);
  }

  public removeItem(whichItem: HItem): void {
    return UnitRemoveItem(this.handle as HUnit, whichItem);
  }

  public removeItemFromSlot(itemSlot: number): HItem {
    return UnitRemoveItemFromSlot(this.handle as HUnit, itemSlot);
  }

  public removeType(whichUnitType: HUnitType): boolean {
    return UnitRemoveType(this.handle as HUnit, whichUnitType);
  }

  public resetAttackCooldownByIndex(atttackIndex: number): boolean {
    return UnitResetAttackCooldownByIndex(this.handle as HUnit, atttackIndex);
  }

  public resetCooldown(): void {
    return UnitResetCooldown(this.handle as HUnit);
  }

  public setConstructionProgress(constructionPercentage: number): void {
    return UnitSetConstructionProgress(this.handle as HUnit, constructionPercentage);
  }

  public setUpgradeProgress(upgradePercentage: number): void {
    return UnitSetUpgradeProgress(this.handle as HUnit, upgradePercentage);
  }

  public setUsesAltIcon(flag: boolean): void {
    return UnitSetUsesAltIcon(this.handle as HUnit, flag);
  }

  public shareVision(whichPlayer: HPlayer, share: boolean): void {
    return UnitShareVision(this.handle as HUnit, whichPlayer, share);
  }

  public stripHeroLevel(howManyLevels: number): boolean {
    return UnitStripHeroLevel(this.handle as HUnit, howManyLevels);
  }

  public suspendDecay(suspend: boolean): void {
    return UnitSuspendDecay(this.handle as HUnit, suspend);
  }

  public unapplyUpdates(): number {
    return UnitUnapplyUpdates(this.handle as HUnit);
  }

  public useItem(whichItem: HItem): boolean {
    return UnitUseItem(this.handle as HUnit, whichItem);
  }

  public useItemPoint(whichItem: HItem, x: number, y: number): boolean {
    return UnitUseItemPoint(this.handle as HUnit, whichItem, x, y);
  }

  public useItemTarget(whichItem: HItem, target: HWidget): boolean {
    return UnitUseItemTarget(this.handle as HUnit, whichItem, target);
  }

  public wakeUp(): void {
    return UnitWakeUp(this.handle as HUnit);
  }

  public updateInfoBar(): number {
    return UpdateUnitInfoBar(this.handle as HUnit);
  }

  public waygateActivate(activate: boolean): void {
    return WaygateActivate(this.handle as HUnit, activate);
  }

  public waygateGetDestinationX(): number {
    return WaygateGetDestinationX(this.handle as HUnit);
  }

  public waygateGetDestinationY(): number {
    return WaygateGetDestinationY(this.handle as HUnit);
  }

  public waygateIsActive(): boolean {
    return WaygateIsActive(this.handle as HUnit);
  }

  public waygateSetDestination(x: number, y: number): void {
    return WaygateSetDestination(this.handle as HUnit, x, y);
  }

  //
  // Autogenerated props
  //

  public get heroBasePrimaryStat(): HHeroAttribute {
    return GetHeroBasePrimaryStat(this.handle as HUnit);
  }

  public set heroBasePrimaryStat(value: HHeroAttribute) {
    SetHeroBasePrimaryStat(this.handle as HUnit, value);
  }

  public get resourceAmount(): number {
    return GetResourceAmount(this.handle as HUnit);
  }

  public set resourceAmount(value: number) {
    SetResourceAmount(this.handle as HUnit, value);
  }

  public get acquireRange(): number {
    return GetUnitAcquireRange(this.handle as HUnit);
  }

  public set acquireRange(value: number) {
    SetUnitAcquireRange(this.handle as HUnit, value);
  }

  public get armour(): number {
    return GetUnitArmour(this.handle as HUnit);
  }

  public set armour(value: number) {
    SetUnitArmour(this.handle as HUnit, value);
  }

  public get armourType(): HDefenseType {
    return GetUnitArmourType(this.handle as HUnit);
  }

  public set armourType(value: HDefenseType) {
    SetUnitArmourType(this.handle as HUnit, value);
  }

  public get attackSpeed(): number {
    return GetUnitAttackSpeed(this.handle as HUnit);
  }

  public set attackSpeed(value: number) {
    SetUnitAttackSpeed(this.handle as HUnit, value);
  }

  public get baseAwakenTip(): string {
    return GetUnitBaseAwakenTip(this.handle as HUnit);
  }

  public set baseAwakenTip(value: string) {
    SetUnitBaseAwakenTip(this.handle as HUnit, value);
  }

  public get baseColour(): number {
    return GetUnitBaseColour(this.handle as HUnit);
  }

  public set baseColour(value: number) {
    SetUnitBaseColour(this.handle as HUnit, value);
  }

  public get baseColourA(): number {
    return GetUnitBaseColourA(this.handle as HUnit);
  }

  public set baseColourA(value: number) {
    SetUnitBaseColourA(this.handle as HUnit, value);
  }

  public get baseColourB(): number {
    return GetUnitBaseColourB(this.handle as HUnit);
  }

  public set baseColourB(value: number) {
    SetUnitBaseColourB(this.handle as HUnit, value);
  }

  public get baseColourG(): number {
    return GetUnitBaseColourG(this.handle as HUnit);
  }

  public set baseColourG(value: number) {
    SetUnitBaseColourG(this.handle as HUnit, value);
  }

  public get baseColourR(): number {
    return GetUnitBaseColourR(this.handle as HUnit);
  }

  public set baseColourR(value: number) {
    SetUnitBaseColourR(this.handle as HUnit, value);
  }

  public get baseDaySight(): number {
    return GetUnitBaseDaySight(this.handle as HUnit);
  }

  public set baseDaySight(value: number) {
    SetUnitBaseDaySight(this.handle as HUnit, value);
  }

  public get baseDescription(): string {
    return GetUnitBaseDescription(this.handle as HUnit);
  }

  public set baseDescription(value: string) {
    SetUnitBaseDescription(this.handle as HUnit, value);
  }

  public get baseGoldCost(): number {
    return GetUnitBaseGoldCost(this.handle as HUnit);
  }

  public set baseGoldCost(value: number) {
    SetUnitBaseGoldCost(this.handle as HUnit, value);
  }

  public get baseHotkey(): HOsKeyType {
    return GetUnitBaseHotkey(this.handle as HUnit);
  }

  public set baseHotkey(value: HOsKeyType) {
    SetUnitBaseHotkey(this.handle as HUnit, value);
  }

  public get baseIcon(): string {
    return GetUnitBaseIcon(this.handle as HUnit);
  }

  public set baseIcon(value: string) {
    SetUnitBaseIcon(this.handle as HUnit, value);
  }

  public get baseModel(): string {
    return GetUnitBaseModel(this.handle as HUnit);
  }

  public set baseModel(value: string) {
    SetUnitBaseModel(this.handle as HUnit, value);
  }

  public get baseName(): string {
    return GetUnitBaseName(this.handle as HUnit);
  }

  public set baseName(value: string) {
    SetUnitBaseName(this.handle as HUnit, value);
  }

  public get baseNightSight(): number {
    return GetUnitBaseNightSight(this.handle as HUnit);
  }

  public set baseNightSight(value: number) {
    SetUnitBaseNightSight(this.handle as HUnit, value);
  }

  public get basePortrait(): string {
    return GetUnitBasePortrait(this.handle as HUnit);
  }

  public set basePortrait(value: string) {
    SetUnitBasePortrait(this.handle as HUnit, value);
  }

  public get baseReviveTip(): string {
    return GetUnitBaseReviveTip(this.handle as HUnit);
  }

  public set baseReviveTip(value: string) {
    SetUnitBaseReviveTip(this.handle as HUnit, value);
  }

  public get baseSelectionScale(): number {
    return GetUnitBaseSelectionScale(this.handle as HUnit);
  }

  public set baseSelectionScale(value: number) {
    SetUnitBaseSelectionScale(this.handle as HUnit, value);
  }

  public get baseShadowTex(): string {
    return GetUnitBaseShadowTex(this.handle as HUnit);
  }

  public set baseShadowTex(value: string) {
    SetUnitBaseShadowTex(this.handle as HUnit, value);
  }

  public get baseTip(): string {
    return GetUnitBaseTip(this.handle as HUnit);
  }

  public set baseTip(value: string) {
    SetUnitBaseTip(this.handle as HUnit, value);
  }

  public get baseUberTip(): string {
    return GetUnitBaseUberTip(this.handle as HUnit);
  }

  public set baseUberTip(value: string) {
    SetUnitBaseUberTip(this.handle as HUnit, value);
  }

  public get bonusMoveSpeedPercent(): number {
    return GetUnitBonusMoveSpeedPercent(this.handle as HUnit);
  }

  public set bonusMoveSpeedPercent(value: number) {
    SetUnitBonusMoveSpeedPercent(this.handle as HUnit, value);
  }

  public get currentLife(): number {
    return GetUnitCurrentLife(this.handle as HUnit);
  }

  public set currentLife(value: number) {
    SetUnitCurrentLife(this.handle as HUnit, value);
  }

  public get currentMana(): number {
    return GetUnitCurrentMana(this.handle as HUnit);
  }

  public set currentMana(value: number) {
    SetUnitCurrentMana(this.handle as HUnit, value);
  }

  public get currentSight(): number {
    return GetUnitCurrentSight(this.handle as HUnit);
  }

  public set currentSight(value: number) {
    SetUnitCurrentSight(this.handle as HUnit, value);
  }

  public get facing(): number {
    return GetUnitFacing(this.handle as HUnit);
  }

  public set facing(value: number) {
    SetUnitFacing(this.handle as HUnit, value);
  }

  public get itemSlots(): number {
    return GetUnitItemSlots(this.handle as HUnit);
  }

  public set itemSlots(value: number) {
    SetUnitItemSlots(this.handle as HUnit, value);
  }

  public get lifeRegen(): number {
    return GetUnitLifeRegen(this.handle as HUnit);
  }

  public set lifeRegen(value: number) {
    SetUnitLifeRegen(this.handle as HUnit, value);
  }

  public get manaRegen(): number {
    return GetUnitManaRegen(this.handle as HUnit);
  }

  public set manaRegen(value: number) {
    SetUnitManaRegen(this.handle as HUnit, value);
  }

  public get maxLife(): number {
    return GetUnitMaxLife(this.handle as HUnit);
  }

  public set maxLife(value: number) {
    SetUnitMaxLife(this.handle as HUnit, value);
  }

  public get maxMana(): number {
    return GetUnitMaxMana(this.handle as HUnit);
  }

  public set maxMana(value: number) {
    SetUnitMaxMana(this.handle as HUnit, value);
  }

  public get moveAIType(): number {
    return GetUnitMoveAIType(this.handle as HUnit);
  }

  public set moveAIType(value: number) {
    SetUnitMoveAIType(this.handle as HUnit, value);
  }

  public get moveSpeed(): number {
    return GetUnitMoveSpeed(this.handle as HUnit);
  }

  public set moveSpeed(value: number) {
    SetUnitMoveSpeed(this.handle as HUnit, value);
  }

  public get moveType(): number {
    return GetUnitMoveType(this.handle as HUnit);
  }

  public set moveType(value: number) {
    SetUnitMoveType(this.handle as HUnit, value);
  }

  public get primaryStat(): HHeroAttribute {
    return GetUnitPrimaryStat(this.handle as HUnit);
  }

  public set primaryStat(value: HHeroAttribute) {
    SetUnitPrimaryStat(this.handle as HUnit, value);
  }

  public get propWindow(): number {
    return GetUnitPropWindow(this.handle as HUnit);
  }

  public set propWindow(value: number) {
    SetUnitPropWindow(this.handle as HUnit, value);
  }

  public get stunCounter(): number {
    return GetUnitStunCounter(this.handle as HUnit);
  }

  public set stunCounter(value: number) {
    SetUnitStunCounter(this.handle as HUnit, value);
  }

  public get timeScale(): number {
    return GetUnitTimeScale(this.handle as HUnit);
  }

  public set timeScale(value: number) {
    SetUnitTimeScale(this.handle as HUnit, value);
  }

  public get turnSpeed(): number {
    return GetUnitTurnSpeed(this.handle as HUnit);
  }

  public set turnSpeed(value: number) {
    SetUnitTurnSpeed(this.handle as HUnit, value);
  }

  public get typeId(): number {
    return GetUnitTypeId(this.handle as HUnit);
  }

  public set typeId(value: number) {
    SetUnitTypeId(this.handle as HUnit, value);
  }

  public get baseMoveSpeed(): number {
    return GetUnitUnitBaseMoveSpeed(this.handle as HUnit);
  }

  public set baseMoveSpeed(value: number) {
    SetUnitUnitBaseMoveSpeed(this.handle as HUnit, value);
  }

  public get userData(): number {
    return GetUnitUserData(this.handle as HUnit);
  }

  public set userData(value: number) {
    SetUnitUserData(this.handle as HUnit, value);
  }

  public get x(): number {
    return GetUnitX(this.handle as HUnit);
  }

  public set x(value: number) {
    SetUnitX(this.handle as HUnit, value);
  }

  public get y(): number {
    return GetUnitY(this.handle as HUnit);
  }

  public set y(value: number) {
    SetUnitY(this.handle as HUnit, value);
  }
}
