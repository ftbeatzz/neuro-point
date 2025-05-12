import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import styles from './HealthDashboard.module.scss'
import SleepIcon from '../../icons/SleepIcon'
import SmallHeartIcon from '../../icons/SmallHeartIcon'
import TreeIcon from '../../icons/TreeIcon'
import LogoHeader from '../../icons/LogoHeader'

const LINE_V = 235
const LINE_H = 365
const DASH_BORDER = 2
const BAR_FULL = 300
const BAR_FILL = 200

const useCount = (end: number, duration = 1000) => {
	const [value, setValue] = useState(0)
	useEffect(() => {
		let start: number | null = null
		const step = (timestamp: number) => {
			if (!start) start = timestamp
			const progress = Math.min((timestamp - start) / duration, 1)
			setValue(Math.floor(progress * end))
			if (progress < 1) requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}, [end, duration])
	return value
}

export const HealthDashboard: React.FC = () => {
	const vertCtrls = useAnimation()
	const horizCtrls = useAnimation()
	const blockCtrls = useAnimation()
	const overviewCtrls = useAnimation()
	const sleepCtrls = useAnimation()

	const [started, setStarted] = useState(false)

	const heartRate = useCount(started ? 72 : 0, 1200)
	const oxygen = useCount(started ? 97 : 0, 1200)
	const sleepMin = useCount(started ? 6.75 * 60 : 0, 1200)

	const overviewRef = useRef(null)
	const inView = useInView(overviewRef, { once: true, margin: '-100px' })

	useEffect(() => {
		if (!inView || started) return
		setStarted(true)

		async function sequence() {
			await vertCtrls.start({ height: LINE_V, transition: { duration: 0.6 } })
			await horizCtrls.start({ width: LINE_H, transition: { duration: 0.6 } })
			await blockCtrls.start(i => ({
				opacity: 1,
				y: 0,
				transition: { duration: 0.6, delay: i * 0.3 },
			}))
			await overviewCtrls.start({
				opacity: 1,
				y: 0,
				transition: { duration: 0.6 },
			})
			sleepCtrls.start({
				width: `${BAR_FILL}px`,
				transition: { duration: 1.2 },
			})
		}
		sequence()
	}, [inView, started])

	return (
		<div className={styles.container}>
			<motion.div
				className={styles.dashV}
				initial={{ height: 0 }}
				animate={vertCtrls}
				style={{ borderLeft: `${DASH_BORDER}px dashed #2E8AFE` }}
			/>
			<motion.div
				className={styles.dashH}
				initial={{ width: 0 }}
				animate={horizCtrls}
				style={{ borderTop: `${DASH_BORDER}px dashed #2E8AFE` }}
			/>

			<div className={styles.blocks}>
				<motion.div
					className={styles.blockHeart}
					custom={0}
					initial={{ opacity: 0, y: 20 }}
					animate={blockCtrls}
				>
					<h4>Heart Rate</h4>
					<div className={styles.value}>
						<SmallHeartIcon />
						<p>{heartRate} bpm</p>
					</div>
					<div className={styles.status}>Normal</div>
				</motion.div>

				<motion.div
					className={styles.blockOxygen}
					custom={1}
					initial={{ opacity: 0, y: 20 }}
					animate={blockCtrls}
				>
					<h4>Oxygen Level</h4>
					<div className={styles.value}>
						<TreeIcon />
						<p>{oxygen}%</p>
					</div>
					<div className={styles.status}>Optimal</div>
				</motion.div>
			</div>

			<motion.div
				ref={overviewRef}
				className={styles.overview}
				initial={{ opacity: 0, y: 20 }}
				animate={overviewCtrls}
			>
				<div className={styles.sleepRowTop}>
					<LogoHeader />
					<h3>HEALTH OVERVIEW</h3>
				</div>
				<div className={styles.sleepRow}>
					<div className={styles.headerSleepRow}>
						<p>Sleep Duration</p>
						<p>Improving</p>
					</div>
					<div className={styles.values}>
						<div>
							<SleepIcon />
							<p>
								{Math.floor(sleepMin / 60)}h {Math.round(sleepMin % 60)}m
							</p>
						</div>
						<div>
							<p>8h</p>
							<SleepIcon />
						</div>
					</div>
					<div
						className={styles.barBackground}
						style={{ width: `${BAR_FULL}px` }}
					>
						<motion.div
							className={styles.barFill}
							initial={{ width: 0 }}
							animate={sleepCtrls}
						/>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
