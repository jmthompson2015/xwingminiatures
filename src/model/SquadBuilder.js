import InputValidator from "../utility/InputValidator.js";

import PilotCard from "../artifact/PilotCard.js";
import Faction from "../artifact/Faction.js";
import UpgradeCard from "../artifact/UpgradeCard.js";

import CardInstance from "./CardInstance.js";
import Reducer from "./Reducer.js";
import Squad from "./Squad.js";

const SquadBuilders = [];

SquadBuilders.push(new SquadBuilder(Faction.SCUM, "FFG When Crime Pays #1", 2017, "JumpMaster; Kihraxz; StarViper", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MANAROO_V2, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.DENGAR, UpgradeCard.PUNISHING_ONE]));
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_JOSTERO, agent, [UpgradeCard.VAKSAI, UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.HARPOON_MISSILES, UpgradeCard.ION_DISCHARGERS, UpgradeCard.PULSED_RAY_SHIELD, UpgradeCard.VECTORED_THRUSTERS, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.THWEEK, agent, [UpgradeCard.STAR_VIPER_MKII, UpgradeCard.PULSED_RAY_SHIELD]));
   return answer;
}));

SquadBuilders.push(new SquadBuilder(Faction.SCUM, "FFG When Crime Pays #2", 2017, "Kihraxz x2; M3-A; StarViper", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CARTEL_MARAUDER, agent, [UpgradeCard.VAKSAI, UpgradeCard.ION_DISCHARGERS, UpgradeCard.PULSED_RAY_SHIELD]));
   answer.push(new CardInstance(store, PilotCard.TALONBANE_COBRA, agent, [UpgradeCard.VAKSAI, UpgradeCard.PREDATOR, UpgradeCard.ION_DISCHARGERS, UpgradeCard.PULSED_RAY_SHIELD, UpgradeCard.STEALTH_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.CARTEL_SPACER, agent, [UpgradeCard.HEAVY_SCYK_INTERCEPTOR, UpgradeCard.FLECHETTE_CANNON]));
   answer.push(new CardInstance(store, PilotCard.THWEEK, agent, [UpgradeCard.STAR_VIPER_MKII]));
   return answer;
}));

SquadBuilders.push(new SquadBuilder(Faction.SCUM, "FFG When Crime Pays #3", 2017, "Kihraxz; StarVipers x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.VIKTOR_HEL, agent, [UpgradeCard.VAKSAI, UpgradeCard.WIRED, UpgradeCard.ION_DISCHARGERS, UpgradeCard.PULSED_RAY_SHIELD, UpgradeCard.STEALTH_DEVICE, UpgradeCard.VECTORED_THRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.GURI, agent, [UpgradeCard.STAR_VIPER_MKII, UpgradeCard.VIRAGO, UpgradeCard.BODYGUARD, UpgradeCard.ACCURACY_CORRECTOR, UpgradeCard.INERTIAL_DAMPENERS, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.THWEEK, agent, [UpgradeCard.STAR_VIPER_MKII, UpgradeCard.PROTON_TORPEDOES, UpgradeCard.AUTOTHRUSTERS]));
   return answer;
}));

// Paul Heaver (97 points, wave 11 content)
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #1", 2017, "K-Wing; Scurrg", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.SABINE_WREN, UpgradeCard.CLUSTER_MINES, UpgradeCard.ION_BOMBS, UpgradeCard.THERMAL_DETONATORS, UpgradeCard.ADVANCED_SLAM]));
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_NYM_REBEL, agent, [UpgradeCard.HAVOC, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.ADVANCED_SENSORS, UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.BOMBLET_GENERATOR, UpgradeCard.GENIUS, UpgradeCard.ENGINE_UPGRADE]));
   return answer;
}));

// Tim Hilton (100 points, wave 11 content)
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #2", 2017, "Auzituck; K-Wing; X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.LOWHHRICK, agent, [UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.WOOKIEE_COMMANDOS]));
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.CONCUSSION_MISSILES, UpgradeCard.SABINE_WREN, UpgradeCard.BOMBLET_GENERATOR, UpgradeCard.LONG_RANGE_SCANNERS]));
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent, [UpgradeCard.R4_D6, UpgradeCard.INTEGRATED_ASTROMECH]));
   return answer;
}));

// Josh Holt (100 points, wave 11 content)
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #3", 2017, "Auzituck; K-Wing; X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.LOWHHRICK, agent, [UpgradeCard.SELFLESSNESS, UpgradeCard.WOOKIEE_COMMANDOS]));
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.CONCUSSION_MISSILES, UpgradeCard.SABINE_WREN, UpgradeCard.BOMBLET_GENERATOR, UpgradeCard.LONG_RANGE_SCANNERS]));
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent, [UpgradeCard.R4_D6, UpgradeCard.INTEGRATED_ASTROMECH]));
   return answer;
}));

// Travis Johnson (100 points, wave 8 content)
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #4", 2017, "JumpMasters x3", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   return answer;
}));

// Marcel Manzano (100 points, wave 8 content)
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #5", 2017, "JumpMasters x3", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.R4_AGROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   return answer;
}));

// Justin Phua
// - Dengar + Expertise + Extra Munitions + Plasma Torpedoes + K4 Security Droid + Unhinged Astromech + Guidance Chips + Punishing One
// - Tel Trevura + Veteran Instincts + Extra Munitions + Plasma Torpedoes + K4 Security Droid + Unhinged Astromech + Guidance Chips
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Worlds #1", 2017, "JumpMasters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.DENGAR, agent, [UpgradeCard.PUNISHING_ONE, UpgradeCard.EXPERTISE, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.K4_SECURITY_DROID, UpgradeCard.UNHINGED_ASTROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.TEL_TREVURA, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.K4_SECURITY_DROID, UpgradeCard.UNHINGED_ASTROMECH, UpgradeCard.GUIDANCE_CHIPS]));
   return answer;
}));

// Nand Torfs
// - Miranda Doni + Autoblaster Turret + Plasma Torpedoes + Extra Munitions + Rey + Ion Bombs + Cluster Mines + Guidance Chips
// - Biggs Darklighter + R4-D6 + Integrated Astromech
// - Jess Pava + M9-G8 + Integrated Astromech + Pattern Analyzer
SquadBuilders.push(new SquadBuilder(Faction.RESISTANCE, "Worlds #2", 2017, "K-Wing; T-70; X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.AUTOBLASTER_TURRET, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.REY, UpgradeCard.ION_BOMBS, UpgradeCard.CLUSTER_MINES, UpgradeCard.GUIDANCE_CHIPS]));
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent, [UpgradeCard.R4_D6, UpgradeCard.INTEGRATED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.JESS_PAVA, agent, [UpgradeCard.M9_G8, UpgradeCard.PATTERN_ANALYZER, UpgradeCard.INTEGRATED_ASTROMECH]));
   return answer;
}));

// Nick Belle
// - Fenn Rau + Attanni Mindlink + Concord Dawn Protector + Autothrusters
// - Asajj Ventress + Attanni Mindlink + Latts Razzi
// - Palob Godalhi + Attanni Mindlink + Twin Laser Turret
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Worlds #3", 2017, "HWK-290; Lancer-class; Protectorate", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.FENN_RAU_SCUM, agent, [UpgradeCard.CONCORD_DAWN_PROTECTOR, UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.ASAJJ_VENTRESS, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.LATTS_RAZZI]));
   answer.push(new CardInstance(store, PilotCard.PALOB_GODALHI, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.TWIN_LASER_TURRET]));
   return answer;
}));

// Gerry Russell
// - Biggs Darklighter + R4-D6 + Integrated Astromech
// - Jess Pava + R2-D6 + Integrated Astromech + Pattern Analyzer + Adaptability
// - Braylen Stramm + Gunner + R3-A2 + Alliance Overhaul
// - Captain Rex
SquadBuilders.push(new SquadBuilder(Faction.RESISTANCE, "Worlds #4", 2017, "ARC-170; T-70; TIE Fighter; X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent, [UpgradeCard.R4_D6, UpgradeCard.INTEGRATED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.JESS_PAVA, agent, [UpgradeCard.ADAPTABILITY_INCREASE, UpgradeCard.R2_D6, UpgradeCard.PATTERN_ANALYZER, UpgradeCard.INTEGRATED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.BRAYLEN_STRAMM, agent, [UpgradeCard.GUNNER, UpgradeCard.R3_A2, UpgradeCard.ALLIANCE_OVERHAUL]));
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_REX, agent));
   return answer;
}));

// Mishary Alfaris
// - Fenn Rau + Attanni Mindlink + Concord Dawn Protector + Autothrusters
// - Asajj Ventress + Attanni Mindlink + Latts Razzi
// - Contracted Scout + Attanni Mindlink + Inspiring Recruit + Unhinged Astromech
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Worlds #5", 2017, "JumpMaster; Lancer-class; Protectorate", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.FENN_RAU_SCUM, agent, [UpgradeCard.CONCORD_DAWN_PROTECTOR, UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.ASAJJ_VENTRESS, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.LATTS_RAZZI]));
   answer.push(new CardInstance(store, PilotCard.CONTRACTED_SCOUT, agent, [UpgradeCard.ATTANNI_MINDLINK, UpgradeCard.INSPIRING_RECRUIT, UpgradeCard.UNHINGED_ASTROMECH]));
   return answer;
}));

SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "JMT", 2017, "Decimator; TIE Defender", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_OICUNN, agent, [UpgradeCard.PREDATOR, UpgradeCard.PROTON_TORPEDOES, UpgradeCard.YSANNE_ISARD, UpgradeCard.MARA_JADE, UpgradeCard.GUNNER, UpgradeCard.ION_PROJECTOR]));
   answer.push(new CardInstance(store, PilotCard.COUNTESS_RYAD, agent, [UpgradeCard.TIE_X7, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.TWIN_ION_ENGINE_MKII]));
   return answer;
}));

// Nand Torfs
// - Dengar (54) + LW + Title + OCR4 + Zuckuss + Countermeasures + Glitterstim
// - Manaroo (43) + PTL + Gonk + R5-P8 + Engine + Seismic Torpedo + Feedback Array
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Worlds #1", 2016, "JumpMasters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.DENGAR, agent, [UpgradeCard.PUNISHING_ONE, UpgradeCard.LONE_WOLF, UpgradeCard.ZUCKUSS, UpgradeCard.OVERCLOCKED_R4, UpgradeCard.GLITTERSTIM, UpgradeCard.COUNTERMEASURES]));
   answer.push(new CardInstance(store, PilotCard.MANAROO, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.SEISMIC_TORPEDO, UpgradeCard.GONK, UpgradeCard.R5_P8, UpgradeCard.FEEDBACK_ARRAY, UpgradeCard.ENGINE_UPGRADE]));
   return answer;
}));

// Kevin Leintz
// - Corran (48) + PtL + FCS + R2D2 + engine
// - Miranda (52) + TLT + Advanced Slam + Sabine + Extra Munitions + Homing Missiles + Conner Net + Ion Bombs
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #2", 2016, "E-Wing; K-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CORRAN_HORN, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.EXTRA_MUNITIONS, UpgradeCard.HOMING_MISSILES, UpgradeCard.SABINE_WREN, UpgradeCard.CONNER_NET, UpgradeCard.ION_BOMBS, UpgradeCard.ADVANCED_SLAM]));
   return answer;
}));

// Duncan Howard
// - Omega Leader + Juke + Comm Relay + Shield
// - Vessery + Juke + x7 + Mk2
// - Omicron Group Pilot + Palpatine + Sensor Jammer
SquadBuilders.push(new SquadBuilder(Faction.FIRST_ORDER, "Worlds #3", 2016, "Lambda-class; TIE/fo; TIE Defender", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.OMEGA_LEADER, agent, [UpgradeCard.JUKE, UpgradeCard.COMM_RELAY, UpgradeCard.SHIELD_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.COLONEL_VESSERY, agent, [UpgradeCard.TIE_X7, UpgradeCard.JUKE, UpgradeCard.TWIN_ION_ENGINE_MKII]));
   answer.push(new CardInstance(store, PilotCard.OMICRON_GROUP_PILOT, agent, [UpgradeCard.SENSOR_JAMMER, UpgradeCard.EMPEROR_PALPATINE]));
   return answer;
}));

// Thomas "Jack" Mooney
// - Han + Predator + Luke + C3PO + Engine + Title
// - Jake + PTL + VI + AT + Prockets
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #4", 2016, "A-Wing; YT-1300", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HAN_SOLO_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR, UpgradeCard.LUKE_SKYWALKER, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.JAKE_FARRELL, agent, [UpgradeCard.A_WING_TEST_PILOT, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.PROTON_ROCKETS, UpgradeCard.AUTOTHRUSTERS]));
   return answer;
}));

// Steffen Kaehler
// - Vessery + Juke + x7
// - Ryad + PtL + x7 + Mk2
// - Omicron + Palpatine + Collision Detector
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #5", 2016, "Lambda-class; TIE Defenders x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.COLONEL_VESSERY, agent, [UpgradeCard.TIE_X7, UpgradeCard.JUKE]));
   answer.push(new CardInstance(store, PilotCard.COUNTESS_RYAD, agent, [UpgradeCard.TIE_X7, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.TWIN_ION_ENGINE_MKII]));
   answer.push(new CardInstance(store, PilotCard.OMICRON_GROUP_PILOT, agent, [UpgradeCard.COLLISION_DETECTOR, UpgradeCard.EMPEROR_PALPATINE]));
   return answer;
}));

// Duncan Howard
// - Omicron Group Pilot + Sensor Jammer + Emperor Palpatine
// - The Inquisitor + Push the Limit + Tie/v1 + Autothrusters
// - Soontir Fel + Push the Limit + Royal Guard TIE + Autothrusters + Stealth Device
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "US Nationals #1", 2016, "Lambda-class; TIE Prototype; TIE Interceptor", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.OMICRON_GROUP_PILOT, agent, [UpgradeCard.SENSOR_JAMMER, UpgradeCard.EMPEROR_PALPATINE]));
   answer.push(new CardInstance(store, PilotCard.THE_INQUISITOR, agent, [UpgradeCard.TIE_V1, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.SOONTIR_FEL, agent, [UpgradeCard.ROYAL_GUARD_TIE, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.AUTOTHRUSTERS, UpgradeCard.STEALTH_DEVICE]));
   return answer;
}));

// Jeff Berling
// - Dengar + Punishing One + Lone Wolf + R5-P8 + Glitterstim + Plasma Torpedoes + Zuckuss + Counter-Measures
// - Manaroo + Feedback Array + Push the Limit + Unhinged Astromech + Engine Upgrade + Recon Specialist
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #2", 2016, "JumpMasters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.DENGAR, agent, [UpgradeCard.PUNISHING_ONE, UpgradeCard.LONE_WOLF, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.ZUCKUSS, UpgradeCard.R5_P8, UpgradeCard.GLITTERSTIM, UpgradeCard.COUNTERMEASURES]));
   answer.push(new CardInstance(store, PilotCard.MANAROO, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.RECON_SPECIALIST, UpgradeCard.UNHINGED_ASTROMECH, UpgradeCard.FEEDBACK_ARRAY, UpgradeCard.ENGINE_UPGRADE]));
   return answer;
}));

// Preston Blitzer
// - Whisper + Intelligence Agent + Fire-Control System + Advanced Cloaking Device + Veteran Instincts
// - Captain Oicunn + Emperor Palpatine + Rebel Captive + Engine Upgrade + Predator
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "US Nationals #3", 2016, "Decimator; TIE Phantom", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.WHISPER, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.ADVANCED_CLOAKING_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_OICUNN, agent, [UpgradeCard.PREDATOR, UpgradeCard.EMPEROR_PALPATINE, UpgradeCard.REBEL_CAPTIVE, UpgradeCard.ENGINE_UPGRADE]));
   return answer;
}));

// Derek Tokaz
// - Bossk + Crack Shot + Concussion Missiles + Zuckuss + Dengar
// - Tel Trevura + Push the Limit + Gonk + R5-P8 + Feedback Array + Hull Upgrade + Punishing One
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #4", 2016, "JumpMaster; YV-666", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.BOSSK, agent, [UpgradeCard.CRACK_SHOT, UpgradeCard.CONCUSSION_MISSILES, UpgradeCard.ZUCKUSS, UpgradeCard.DENGAR]));
   answer.push(new CardInstance(store, PilotCard.TEL_TREVURA, agent, [UpgradeCard.PUNISHING_ONE, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.GONK, UpgradeCard.R5_P8, UpgradeCard.FEEDBACK_ARRAY, UpgradeCard.HULL_UPGRADE]));
   return answer;
}));

// Bryan England
// - Manaroo + Push the Limit + Unhinged Astromech + Feedback Array + Flechette Torpedoes + Gonk + Engine Upgrade
// - Dengar + Punishing One + Lone Wolf + Overclocked R4 + Glitterstim + Plasma Torpedoes + Zuckuss + Counter-Measures
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #5", 2016, "JumpMasters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MANAROO, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FLECHETTE_TORPEDOES, UpgradeCard.GONK, UpgradeCard.UNHINGED_ASTROMECH, UpgradeCard.FEEDBACK_ARRAY, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.DENGAR, agent, [UpgradeCard.PUNISHING_ONE, UpgradeCard.LONE_WOLF, UpgradeCard.PLASMA_TORPEDOES, UpgradeCard.ZUCKUSS, UpgradeCard.OVERCLOCKED_R4, UpgradeCard.GLITTERSTIM, UpgradeCard.COUNTERMEASURES]));
   return answer;
}));

// Experimental: Huge ships
const HugeShipImperialSquadBuilder = new SquadBuilder(Faction.IMPERIAL, "Huge Ships: 168 Points", 2016, "Gozanti-class; Raider-class; TIE Advanced", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.GOZANTI_CLASS_CRUISER, agent));
   answer.push(new CardInstance(store, PilotCard.JUNO_ECLIPSE, agent));
   answer.push(new CardInstance(store, PilotCard.RAIDER_CLASS_CORVETTE, agent));
   return answer;
});
SquadBuilders.push(HugeShipImperialSquadBuilder);

// Experimental: Huge ships
const HugeShipRebelSquadBuilder = new SquadBuilder(Faction.REBEL, "Huge Ships: 219 Points", 2016, "CR90; G-75; X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CR90_CORVETTE, agent, [UpgradeCard.HAN_SOLO, UpgradeCard.QUAD_LASER_CANNONS, UpgradeCard.QUAD_LASER_CANNONS, UpgradeCard.GUNNERY_TEAM, UpgradeCard.SENSOR_TEAM, UpgradeCard.TIBANNA_GAS_SUPPLIES, UpgradeCard.CHEWBACCA, UpgradeCard.TANTIVE_IV], [UpgradeCard.WEAPONS_ENGINEER, UpgradeCard.QUAD_LASER_CANNONS, UpgradeCard.ENGINEERING_TEAM, UpgradeCard.IONIZATION_REACTOR]));
   answer.push(new CardInstance(store, PilotCard.WES_JANSON, agent, [UpgradeCard.R2_D2_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.GR_75_MEDIUM_TRANSPORT, agent, [UpgradeCard.DUTYFREE, UpgradeCard.RAYMUS_ANTILLES, UpgradeCard.FREQUENCY_JAMMER, UpgradeCard.EM_EMITTER]));
   return answer;
});
SquadBuilders.push(HugeShipRebelSquadBuilder);

// Kirk Mistr
// - IG88B + IG-2000 + Flechette Canon + Autothrusters
// - IG88C + IG-2000 + Ion Canon + Autothrusters;
// - Tansarii Point Veteran + Lone Wolf
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "EKM", 2016, "Aggressors x2; M3-A", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.IG_88B, agent, [UpgradeCard.IG_2000, UpgradeCard.FLECHETTE_CANNON, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.IG_88C, agent, [UpgradeCard.IG_2000, UpgradeCard.ION_CANNON, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.TANSARII_POINT_VETERAN, agent, [UpgradeCard.LONE_WOLF]));
   return answer;
}));

// Paul Heaver
// - Poe Dameron + R2‑D2 + Veteran Instincts + Autothrusters
// - Gold Squadron Pilot + R3‑A2 + BTL‑A4 Y‑wing + Twin Laser Turret
// - Gold Squadron Pilot + Twin Laser Turret
// - Bandit Squadron Pilot
SquadBuilders.push(new SquadBuilder(Faction.RESISTANCE, "Worlds #1", 2015, "T-70; Y-Wings x2; Z-95", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.POE_DAMERON, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.GOLD_SQUADRON_PILOT, agent, [UpgradeCard.BTL_A4_Y_WING, UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.R3_A2]));
   answer.push(new CardInstance(store, PilotCard.GOLD_SQUADRON_PILOT, agent, [UpgradeCard.TWIN_LASER_TURRET]));
   answer.push(new CardInstance(store, PilotCard.BANDIT_SQUADRON_PILOT, agent));
   return answer;
}));

// Nathan Eide
// - Corran Horn + R2-D2 + Engine Upgrade + Push The Limit + Fire Control Systems;
// - Poe Dameron + Veteran Instincts + Autothrusters + R5-P9
// - Prototype Pilot + Chardaan Refit
SquadBuilders.push(new SquadBuilder(Faction.RESISTANCE, "Worlds #2", 2015, "A-Wing; E-Wing; T-70", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CORRAN_HORN, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.POE_DAMERON, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.R5_P9, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.PROTOTYPE_PILOT, agent, [UpgradeCard.CHARDAAN_REFIT]));
   return answer;
}));

// Phillip Booth
// - IG-88A&B + Heavy Laser Cannon + Autothrusters + Glitterstim + Crackshot + Fire Control Systems + IG-2000
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Worlds #3", 2015, "Aggressors x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.IG_88A, agent, [UpgradeCard.IG_2000, UpgradeCard.CRACK_SHOT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.GLITTERSTIM, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.IG_88B, agent, [UpgradeCard.IG_2000, UpgradeCard.CRACK_SHOT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.GLITTERSTIM, UpgradeCard.AUTOTHRUSTERS]));
   return answer;
}));

// Jeremy Howard
// - Fel + PtL + Royal Guard Title + Stealth + Autothrusters
// - Vader + Lone Wolf + title + ATC
// - Omicron Group Shuttle + Palpatine + Sensor Jammer
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #4", 2015, "Lambda-class; TIE Advanced; TIE Interceptor", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.SOONTIR_FEL, agent, [UpgradeCard.ROYAL_GUARD_TIE, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.AUTOTHRUSTERS, UpgradeCard.STEALTH_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.DARTH_VADER, agent, [UpgradeCard.TIE_X1, UpgradeCard.LONE_WOLF, UpgradeCard.ADVANCED_TARGETING_COMPUTER]));
   answer.push(new CardInstance(store, PilotCard.OMICRON_GROUP_PILOT, agent, [UpgradeCard.EMPEROR_PALPATINE, UpgradeCard.SENSOR_JAMMER]));
   return answer;
}));

// Aaron Bonar
// - Miranda Doni + Tactician + Twin Laser Turret;
// - Warden Squadron Pilot + Tactician + Twin Laser Turret x2
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #5", 2015, "K-Wings x3", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MIRANDA_DONI, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.TACTICIAN]));
   answer.push(new CardInstance(store, PilotCard.WARDEN_SQUADRON_PILOT, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.TACTICIAN]));
   answer.push(new CardInstance(store, PilotCard.WARDEN_SQUADRON_PILOT, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.TACTICIAN]));
   return answer;
}));

// Jeff Berling
// - Dash + Lone Wolf + HLC + Outrider + R2-D2 crew + Anti-Pursuit Lasers
// - Blue Squadron Pilot x2
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #1", 2015, "B-Wings x2; YT-2400", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.DASH_RENDAR, agent, [UpgradeCard.OUTRIDER, UpgradeCard.LONE_WOLF, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.R2_D2_CREW, UpgradeCard.ANTI_PURSUIT_LASERS]));
   answer.push(new CardInstance(store, PilotCard.BLUE_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.BLUE_SQUADRON_PILOT, agent));
   return answer;
}));

// Phillip Horny
// - Oicunn + Predator + ysanne + gunner + rebel captive + engine + proximity mine
// - Soontir + PtL + autothruster + stealth device + title
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "US Nationals #2", 2015, "Decimator; TIE Interceptor", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_OICUNN, agent, [UpgradeCard.PREDATOR, UpgradeCard.YSANNE_ISARD, UpgradeCard.GUNNER, UpgradeCard.REBEL_CAPTIVE, UpgradeCard.PROXIMITY_MINES, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.SOONTIR_FEL, agent, [UpgradeCard.ROYAL_GUARD_TIE, UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.AUTOTHRUSTERS, UpgradeCard.STEALTH_DEVICE]));
   return answer;
}));

// Jonathan Grasser
// - Chewbacca + Predator + Luke + C-3PO + MF
// - Vrill + HLC (no title) + Recon Specialist + Anti-pursuit Lasers
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #3", 2015, "YT-1300; YT-2400", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CHEWBACCA_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR, UpgradeCard.LUKE_SKYWALKER, UpgradeCard.C_3PO]));
   answer.push(new CardInstance(store, PilotCard.EADEN_VRILL, agent, [UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.RECON_SPECIALIST, UpgradeCard.ANTI_PURSUIT_LASERS]));
   return answer;
}));

// Kyle Adams
// - Dash + Predator + Title + Mangler + Chewbacca crew
// - Corran + PtL + FCS + R2-D2 + Engine
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #4", 2015, "E-Wing; YT-2400", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.CORRAN_HORN, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.DASH_RENDAR, agent, [UpgradeCard.OUTRIDER, UpgradeCard.PREDATOR, UpgradeCard.MANGLER_CANNON, UpgradeCard.CHEWBACCA]));
   return answer;
}));

// Mark Moriarity
// - IG88B&C + VI + HLC + FCS + Autothrusters + Inertial dampeners + title
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "US Nationals #5", 2015, "Aggressors x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.IG_88B, agent, [UpgradeCard.IG_2000, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.INERTIAL_DAMPENERS, UpgradeCard.AUTOTHRUSTERS]));
   answer.push(new CardInstance(store, PilotCard.IG_88C, agent, [UpgradeCard.IG_2000, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.INERTIAL_DAMPENERS, UpgradeCard.AUTOTHRUSTERS]));
   return answer;
}));

// Thug Life
// - Syndicate Thug + Twin Laser Turret + Unhinged Astromech x4
SquadBuilders.push(new SquadBuilder(Faction.SCUM, "Thug Life v2", 2015, "Y-Wings x4", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.SYNDICATE_THUG, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.UNHINGED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.SYNDICATE_THUG, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.UNHINGED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.SYNDICATE_THUG, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.UNHINGED_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.SYNDICATE_THUG, agent, [UpgradeCard.TWIN_LASER_TURRET, UpgradeCard.UNHINGED_ASTROMECH]));
   return answer;
}));

const CoreSetFirstOrderSquadBuilder = new SquadBuilder(Faction.FIRST_ORDER, "First Order TFA Core Set: 39 Points", 2015, "TIE/fo Fighters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.EPSILON_LEADER, agent, [UpgradeCard.WIRED]));
   answer.push(new CardInstance(store, PilotCard.ZETA_ACE, agent));
   return answer;
});
SquadBuilders.push(CoreSetFirstOrderSquadBuilder);

const CoreSetResistanceSquadBuilder = new SquadBuilder(Faction.RESISTANCE, "Resistance TFA Core Set: 39 Points", 2015, "T-70", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.POE_DAMERON, agent, [UpgradeCard.BB_8, UpgradeCard.PROTON_TORPEDOES, UpgradeCard.WEAPONS_GUIDANCE]));
   return answer;
});
SquadBuilders.push(CoreSetResistanceSquadBuilder);

// Paul Heaver
// - Han Solo + Predator + C-3P0 + R2-D2 + MF + Engine Upgrade
// - Tala Squadron Pilot x3
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #1", 2014, "YT-1300; Z-95s x3", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HAN_SOLO_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR, UpgradeCard.C_3PO, UpgradeCard.R2_D2_CREW, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   return answer;
}));

// Morgan Reid
// - Whisper + VI + ACD + FCS + Rebel Captive
// - Howlrunner + Swarm; 3x Academy
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #2", 2014, "TIE Fighters x4; TIE Phantom", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.WHISPER, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.REBEL_CAPTIVE, UpgradeCard.ADVANCED_CLOAKING_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.HOWLRUNNER, agent, [UpgradeCard.SWARM_TACTICS]));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   return answer;
}));

// Ira Mayers
// - Han + MF + Gunner + C-3P0 + Engine + Predator
// - Tala Squadron Pilot x2
// - Bandit Squadron Pilot
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #3", 2014, "YT-1300; Z-95s x3", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HAN_SOLO_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.PREDATOR, UpgradeCard.GUNNER, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.BANDIT_SQUADRON_PILOT, agent));
   return answer;
}));

// Keith Wilson
// - Howlrunner
// - Dark Curse
// - Black Squadron Pilot + DtF
// - Obsidian x2
// - Academy Pilot x2
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #4", 2014, "TIE Fighters x7", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HOWLRUNNER, agent));
   answer.push(new CardInstance(store, PilotCard.DARK_CURSE, agent));
   answer.push(new CardInstance(store, PilotCard.BLACK_SQUADRON_PILOT, agent, [UpgradeCard.DRAW_THEIR_FIRE]));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   return answer;
}));

// Richard Hsu
// - Wedge + DTF + R2D2
// - Cracken + VI
// - Biggs
// - Rookie
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #5", 2014, "X-Wings x3; Z-95", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.WEDGE_ANTILLES, agent, [UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.R2_D2_ASTROMECH]));
   answer.push(new CardInstance(store, PilotCard.AIREN_CRACKEN, agent, [UpgradeCard.VETERAN_INSTINCTS]));
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   return answer;
}));

// Rick Sidebotham
// - Whisper + Veteran Instincts + Fire-Control Systems + Advanced Cloaking Device + Gunner
// - Soontir Fel + Push the Limit
// - Captain Yorr
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "US Nationals #1", 2014, "Lambda-class; TIE Interceptor; TIE Phantom", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.WHISPER, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.GUNNER, UpgradeCard.ADVANCED_CLOAKING_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.SOONTIR_FEL, agent, [UpgradeCard.PUSH_THE_LIMIT]));
   answer.push(new CardInstance(store, PilotCard.CAPTAIN_YORR, agent));
   return answer;
}));

// Jeff Berling
// - Chewbacca + Millennium Falcon + C-3P0 + R2-D2 + Draw Their Fire
// - Lando + Nien Nunb + Han Solo + Draw Their Fire
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #2", 2014, "YT-1300s x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.LANDO_CALRISSIAN, agent, [UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.NIEN_NUNB, UpgradeCard.HAN_SOLO]));
   answer.push(new CardInstance(store, PilotCard.CHEWBACCA_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.DRAW_THEIR_FIRE, UpgradeCard.C_3PO, UpgradeCard.R2_D2_CREW]));
   return answer;
}));

// Paul Heaver
// - Han Solo + Luke Skywalker + Veteran Instincts + C-3P0 + Millennium Falcon + Engine Upgrade
// - Biggs
// Tala Squadron Pilot
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #3", 2014, "X-Wing; YT-1300; Z-95", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HAN_SOLO_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.LUKE_SKYWALKER, UpgradeCard.C_3PO, UpgradeCard.ENGINE_UPGRADE]));
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent));
   answer.push(new CardInstance(store, PilotCard.TALA_SQUADRON_PILOT, agent));
   return answer;
}));

// Nick Jones
// - Howlrunner + Push the Limit
// - Obsidian Squadron Pilot x6
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "US Nationals #4", 2014, "TIE Fighters x7", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HOWLRUNNER, agent, [UpgradeCard.PUSH_THE_LIMIT]));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   return answer;
}));

// David Pontier
// - Han Solo + Determination + Luke Skywalker + Millenium Falcon
// - Corran Horn + Push the Limit + R2-D2 + Fire Control System
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "US Nationals #5", 2014, "E-Wing; YT-1300", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HAN_SOLO_REBEL, agent, [UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.DETERMINATION, UpgradeCard.LUKE_SKYWALKER]));
   answer.push(new CardInstance(store, PilotCard.CORRAN_HORN, agent, [UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.R2_D2_ASTROMECH]));
   return answer;
}));

// 2013 World Champion Paul Heaver
// - Biggs Darklighter in an X-wing
// - Rookie Pilot in an X-wing
// - Dagger Squadron Pilot in a B-wing + Advanced Sensors
// - Dagger Squadron Pilot in a B-wing + Advanced Sensors
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #1", 2013, "B-Wings x2; X-Wings x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.BIGGS_DARKLIGHTER, agent));
   answer.push(new CardInstance(store, PilotCard.DAGGER_SQUADRON_PILOT, agent, [UpgradeCard.ADVANCED_SENSORS]));
   answer.push(new CardInstance(store, PilotCard.DAGGER_SQUADRON_PILOT, agent, [UpgradeCard.ADVANCED_SENSORS]));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   return answer;
}));

// Dallas Parker
// - Howlrunner in a TIE-fighter + Stealth + Determination
// - Dark Curse in a TIE-fighter
// - Academy Pilot in a TIE-fighter x5
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #2", 2013, "TIE Fighters x7", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HOWLRUNNER, agent, [UpgradeCard.STEALTH_DEVICE, UpgradeCard.DETERMINATION]));
   answer.push(new CardInstance(store, PilotCard.DARK_CURSE, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   return answer;
}));

// Jonathan Gomes
// - Luke Skywalker in an X-wing + Shield Upgrade + R2-D2 + Draw Their Fire
// - Rookie Pilot in an X-wing x3
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #3", 2013, "X-Wings x4", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.LUKE_SKYWALKER, agent, [UpgradeCard.SHIELD_UPGRADE, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.DRAW_THEIR_FIRE]));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   return answer;
}));

// David Bergstrom
// - Howlrunner in a TIE-fighter + Stealth Device
// - Backstabber in a TIE-fighter
// - Obsidian Squadron Pilot in a TIE-fighter x3
// - Academy Pilot in a TIE-fighter x2
SquadBuilders.push(new SquadBuilder(Faction.IMPERIAL, "Worlds #4", 2013, "TIE Fighters x7", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.HOWLRUNNER, agent, [UpgradeCard.STEALTH_DEVICE]));
   answer.push(new CardInstance(store, PilotCard.BACKSTABBER, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.OBSIDIAN_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ACADEMY_PILOT, agent));
   return answer;
}));

// Jim Blakley
// - Rookie Pilot in an X-wing x2
// - Blue Squadron in an B-wing
// - Gold Squadron in an Y-wing x2
SquadBuilders.push(new SquadBuilder(Faction.REBEL, "Worlds #5", 2013, "B-Wing; X-Wings x2; Y-Wings x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.BLUE_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.ROOKIE_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.GOLD_SQUADRON_PILOT, agent));
   answer.push(new CardInstance(store, PilotCard.GOLD_SQUADRON_PILOT, agent));
   return answer;
}));

const CoreSetImperialSquadBuilder = new SquadBuilder(Faction.IMPERIAL, "Imperial Core Set: 36 Points", 2012, "TIE Fighters x2", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.MAULER_MITHEL, agent, [UpgradeCard.MARKSMANSHIP]));
   answer.push(new CardInstance(store, PilotCard.DARK_CURSE, agent));
   return answer;
});
SquadBuilders.push(CoreSetImperialSquadBuilder);

const CoreSetRebelSquadBuilder = new SquadBuilder(Faction.REBEL, "Rebel Core Set: 36 Points", 2012, "X-Wing", function(store, agent)
{
   const answer = [];
   answer.push(new CardInstance(store, PilotCard.LUKE_SKYWALKER, agent, [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH]));
   return answer;
});
SquadBuilders.push(CoreSetRebelSquadBuilder);

function SquadBuilder(factionKey, name, year, description, buildFunction)
{
   InputValidator.validateNotNull("factionKey", factionKey);
   InputValidator.validateNotNull("name", name);
   InputValidator.validateNotNull("year", year);
   InputValidator.validateNotNull("description", description);
   InputValidator.validateNotNull("buildFunction", buildFunction);

   this.factionKey = function()
   {
      return factionKey;
   };

   this.name = function()
   {
      return name;
   };

   this.year = function()
   {
      return year;
   };

   this.description = function()
   {
      return description;
   };

   this.buildSquad = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      // SquadBuilder uses its own separate store.
      const store = Redux.createStore(Reducer.root);
      const tokens = buildFunction(store, agent);

      return new Squad(factionKey, name, year, description, tokens);
   };
}

SquadBuilder.prototype.toString = function()
{
   return this.year() + " " + this.name() + " (" + this.description() + ")";
};

SquadBuilder.findByNameAndYear = function(name, year)
{
   let answer;
   const length = SquadBuilders.length;

   for (let i = 0; i < length; i++)
   {
      const squadBuilder = SquadBuilders[i];

      if (squadBuilder.name() === name && squadBuilder.year() === year)
      {
         answer = squadBuilder;
         break;
      }
   }

   return answer;
};

SquadBuilder.findByFaction = function(factionKey)
{
   InputValidator.validateNotNull("factionKey", factionKey);

   return SquadBuilders.filter(function(squadBuilder)
   {
      return Faction.isFriendly(squadBuilder.factionKey(), factionKey);
   });
};

export default (
{
   findByNameAndYear: SquadBuilder.findByNameAndYear,
   findByFaction: SquadBuilder.findByFaction,
   SquadBuilders: SquadBuilders,
   CoreSetFirstOrderSquadBuilder: CoreSetFirstOrderSquadBuilder,
   CoreSetImperialSquadBuilder: CoreSetImperialSquadBuilder,
   CoreSetRebelSquadBuilder: CoreSetRebelSquadBuilder,
   CoreSetResistanceSquadBuilder: CoreSetResistanceSquadBuilder,
   HugeShipImperialSquadBuilder: HugeShipImperialSquadBuilder,
   HugeShipRebelSquadBuilder: HugeShipRebelSquadBuilder,
   SquadBuilder: SquadBuilder,
});