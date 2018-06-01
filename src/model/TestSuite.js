// var testModules = ["Ability", "ActivationAction", "ActivationPhaseTask", "Adjudicator", "Agent", "AgentReducer", "AgentSquadAction",
//       "AgentSquadInitialState", "AgentSquadReducer", "AttackDice", "CardComparator", "CardInstance", "CardReducer", "CombatAction", "CombatAction2",
//       "CombatPhaseTask", "DamageDealer", "DefenseDice", "EndPhaseTask", "Engine", "Environment", "EnvironmentReducer", "EventObserver", "FiringComputer",
//       "InitialState", "ManeuverAction", "ManeuverComputer", "MediumAgent", "ModifyDiceAbility", "Path", "PhaseObserver", "PilotInstanceUtilities",
//       "PlanningPhaseTask", "Position", "RangeRuler", "RectanglePath", "Reducer", "Selector", "ShipActionAbility", "ShipDestroyedAction", "ShipFledAction",
//       "SimpleAgent", "Squad", "SquadBuilder", "TargetLock", "Weapon", "WeaponInterface",
//
//       "DamageAbility0", "DamageAbility1", "DamageAbility2", "DamageAbility3", "DamageAbility4",
//       "PilotAbility0", "PilotAbility1", "PilotAbility2", "PilotAbility3", "PilotAbility4",
//       "UpgradeAbility0", "UpgradeAbility1", "UpgradeAbility2", "UpgradeAbility3", "UpgradeAbility4",
//
//       "EnvironmentFactory", "MockAttackDice", "MockDefenseDice",
//     ];
import Logger from "../utility/Logger.js";

import AbilityTest from "./Ability.test.js";
import ActivationActionTest from "./ActivationAction.test.js";
import ActivationPhaseTaskTest from "./ActivationPhaseTask.test.js";
import AdjudicatorTest from "./Adjudicator.test.js";
import AgentTest from "./Agent.test.js";
import AgentReducerTest from "./AgentReducer.test.js";
import AgentSquadActionTest from "./AgentSquadAction.test.js";
import AgentSquadInitialStateTest from "./AgentSquadInitialState.test.js";
import AgentSquadReducerTest from "./AgentSquadReducer.test.js";
import AttackDiceTest from "./AttackDice.test.js";
import CardComparatorTest from "./CardComparator.test.js";
import CardInstanceTest from "./CardInstance.test.js";
import CardReducerTest from "./CardReducer.test.js";
import CombatActionTest from "./CombatAction.test.js";
import CombatAction2Test from "./CombatAction2.test.js";
import CombatPhaseTaskTest from "./CombatPhaseTask.test.js";
import DamageDealerTest from "./DamageDealer.test.js";
import DefenseDiceTest from "./DefenseDice.test.js";
import EndPhaseTaskTest from "./EndPhaseTask.test.js";
import EngineTest from "./Engine.test.js";
import EnvironmentTest from "./Environment.test.js";
import EnvironmentFactoryTest from "./EnvironmentFactory.test.js";
import EnvironmentReducerTest from "./EnvironmentReducer.test.js";
import EventObserverTest from "./EventObserver.test.js";
import FiringComputerTest from "./FiringComputer.test.js";
import InitialStateTest from "./InitialState.test.js";
import ManeuverActionTest from "./ManeuverAction.test.js";
import ManeuverComputerTest from "./ManeuverComputer.test.js";
import MediumAgentTest from "./MediumAgent.test.js";
import MockAttackDiceTest from "./MockAttackDice.test.js";
import MockDefenseDiceTest from "./MockDefenseDice.test.js";
import ModifyDiceAbilityTest from "./ModifyDiceAbility.test.js";
import PathTest from "./Path.test.js";
import PhaseObserverTest from "./PhaseObserver.test.js";
import PilotInstanceUtilitiesTest from "./PilotInstanceUtilities.test.js";
import PlanningPhaseTaskTest from "./PlanningPhaseTask.test.js";
import PositionTest from "./Position.test.js";
import RangeRulerTest from "./RangeRuler.test.js";
import RectanglePathTest from "./RectanglePath.test.js";
import ReducerTest from "./Reducer.test.js";
import SelectorTest from "./Selector.test.js";
import ShipActionAbility from "./ShipActionAbility.test.js";
import ShipDestroyedActionTest from "./ShipDestroyedAction.test.js";
import ShipFledActionTest from "./ShipFledAction.test.js";
import SimpleAgentTest from "./SimpleAgent.test.js";
import SquadTest from "./Squad.test.js";
import SquadBuilderTest from "./SquadBuilder.test.js";
import TargetLockTest from "./TargetLock.test.js";
import WeaponTest from "./Weapon.test.js";
import WeaponInterfaceTest from "./WeaponInterface.test.js";

import DamageAbility0Test from "./DamageAbility0.test.js";
import DamageAbility1Test from "./DamageAbility1.test.js";
import DamageAbility2Test from "./DamageAbility2.test.js";
import DamageAbility3Test from "./DamageAbility3.test.js";
import DamageAbility4Test from "./DamageAbility4.test.js";
import PilotAbility0Test from "./PilotAbility0.test.js";
import PilotAbility1Test from "./PilotAbility1.test.js";
import PilotAbility2Test from "./PilotAbility2.test.js";
import PilotAbility3Test from "./PilotAbility3.test.js";
import PilotAbility4Test from "./PilotAbility4.test.js";
import UpgradeAbility0Test from "./UpgradeAbility0.test.js";
import UpgradeAbility1Test from "./UpgradeAbility1.test.js";
import UpgradeAbility2Test from "./UpgradeAbility2.test.js";
import UpgradeAbility3Test from "./UpgradeAbility3.test.js";
import UpgradeAbility4Test from "./UpgradeAbility4.test.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();