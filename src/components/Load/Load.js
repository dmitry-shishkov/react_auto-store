import React from "react";
import styles from "./Load.module.scss"

export const Load = () => {
  return (
    <div>
      <div className={styles.loadBlock}>
        <div className={styles.load}></div>
      </div>
    </div>
  );
}
