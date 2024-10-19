// src/components/NavItem.jsx

import React from 'react';
import styles from './HomeComponent.module.css';

const NavItem = ({ icon, label, isActive, onClick }) => {
  const itemClass = isActive ? styles.activeNavItem : styles.navItem;

  return (
    <div className={itemClass} onClick={onClick}> {/* Call onClick when clicked */}
      <img loading="lazy" src={icon} alt="" className={styles.navIcon} />
      {isActive && <div className={styles.navText}>{label}</div>}
      {!isActive && <span className={styles['visually-hidden']}>{label}</span>}
    </div>
  );
};

export default NavItem;
