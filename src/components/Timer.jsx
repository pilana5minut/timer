import { useState } from 'react'
import styles from './Timer.module.scss'

const timerFormat = {
  minute: 'numeric',
  second: 'numeric',
  hour: 'numeric',
}

export default function Timer() {
  const [timerValue, setTimerValue] = useState('00:00:00')
  const [currentTimeDifference, setCurrentTimeDifference] = useState(0)
  const [timerID, setTimerID] = useState(null)

  const handleStartTimer = () => {
    const startTime = Date.now()
    const id = setInterval(() => {
      let timeDifference = Date.now() - startTime + currentTimeDifference
      setCurrentTimeDifference(timeDifference)
      setTimerValue(new Date(timeDifference - 10_800_000).toLocaleString('ru', timerFormat))
    }, 1000)
    setTimerID(id)
  }

  const handlePauseTimer = () => {
    clearInterval(timerID)
    setTimerValue(new Date(currentTimeDifference - 10_800_000).toLocaleString('ru', timerFormat))
  }

  const handleResetTimer = () => {
    clearInterval(timerID)
    setTimerID(null)
    setTimerValue('00:00:00')
    setCurrentTimeDifference(0)
  }

  return (
    <section className={styles.timer}>
      <h2>{timerValue}</h2>
      <div className={styles.controlWrapper}>
        <button
          type="button"
          onClick={handleStartTimer}
        >
          Start
        </button>
        <button
          type="button"
          onClick={handlePauseTimer}
        >
          Pause
        </button>
        <button
          type="button"
          onClick={handleResetTimer}
        >
          Reset
        </button>
      </div>
    </section>
  )
}
