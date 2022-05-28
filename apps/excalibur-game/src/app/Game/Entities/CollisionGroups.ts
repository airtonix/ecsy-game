import { CollisionGroupManager } from 'excalibur';

export const PlayerCollisionGroup = CollisionGroupManager.create('Player');
export const NpcCollisionGroup = CollisionGroupManager.create('NpcGroup');
export const PortalCollisionGroup = CollisionGroupManager.create('PortalGroup');
export const EnemyCollisionGroup = CollisionGroupManager.create('EnemyGroup');
