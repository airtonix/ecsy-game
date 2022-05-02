import React from 'react';

import styles from './Avatar.module.css';

type AvatarProps = {
  name: string;
};
export const Avatar = ({ name }: AvatarProps) => {
  return <section className={styles.block}>{name}</section>;
};
