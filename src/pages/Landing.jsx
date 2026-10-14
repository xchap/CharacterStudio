import React from "react"
import styles from "./Landing.module.css"
import { ViewMode, ViewContext } from "../context/ViewContext"

import { SoundContext } from "../context/SoundContext"
import { AudioContext } from "../context/AudioContext"
import { SceneContext } from "../context/SceneContext"

import { connectWallet } from "../library/mint-utils"

const opensea_Key = import.meta.env.VITE_OPENSEA_KEY;

function Landing() {
  const { setViewMode } = React.useContext(ViewContext)
  const { playSound } = React.useContext(SoundContext)
  const { isMute } = React.useContext(AudioContext)
  const { characterManager } = React.useContext(SceneContext)

  const createCharacter = () => {
    setViewMode(ViewMode.CREATE)
    !isMute && playSound('backNextButton');
  }

  const createVRMCharacter = () => {
    setViewMode(ViewMode.CLAIM)
    !isMute && playSound('backNextButton');
  }

  const optimizeCharacter = () => {
    setViewMode(ViewMode.OPTIMIZER)
    characterManager.loadOptimizerManifest();
    !isMute && playSound('backNextButton');
  }
  const getWallet = async() => {
    const address = await connectWallet()
    if (address != "")setViewMode(ViewMode.WALLET)
    !isMute && playSound('backNextButton');
  }

  const loadCharacter = () => {
    setViewMode(ViewMode.LOAD)
    !isMute && playSound('backNextButton');
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={createCharacter}>
          <span className={styles.label}>Create</span>
        </button>
        <button className={styles.button} onClick={createVRMCharacter}>
          <span className={styles.label}>Batch</span>
        </button>
        <button className={styles.button} onClick={optimizeCharacter}>
          <span className={styles.label}>Optimize</span>
        </button>
      </div>
    </div>
  )
}

export default Landing
