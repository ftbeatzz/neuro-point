import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import styles from './HomeScreen.module.scss'
import ButtonArrow from '../../assets/icons/ButtonArrow'
import ParticlesHero from '../../assets/animations/ParticlesImgHero/ParticlesHero'
import ParticlesTxt from '../../assets/animations/ParticlesTxtHero/ParticlesTxt'
import ParticlesTxtRate from '../../assets/animations/ParticlesTxtRate/ParticlesTxtRate'
import Callout from '../../assets/animations/Callout/Callout'
import HeartIcon from '../../assets/icons/HeartIcon'
import StatisticIcon from '../../assets/icons/StatisticIcon'
import NotifIcon from '../../assets/icons/NotifIcon'
import { HealthDashboard } from '../../assets/animations/HealthDashboard/HealthDashboard'

const useDelayedCount = (
	end: number,
	delayMs: number,
	duration = 1000,
	trigger = false
) => {
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (!trigger) return
		const timeout = setTimeout(() => {
			let start: number | null = null
			const step = (timestamp: number) => {
				if (!start) start = timestamp
				const progress = Math.min((timestamp - start) / duration, 1)
				const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
				setValue(Math.floor(eased * end))
				if (progress < 1) requestAnimationFrame(step)
			}
			requestAnimationFrame(step)
		}, delayMs)

		return () => clearTimeout(timeout)
	}, [end, delayMs, duration, trigger])

	return value
}

const HomeScreen = () => {
	const rateLeftRef = useRef(null)
	const percentageRef = useRef(null)

	const isRateLeftInView = useInView(rateLeftRef, {
		once: true,
		margin: '-100px',
	})
	const isPercentageInView = useInView(percentageRef, {
		once: true,
		margin: '-0px',
	})

	const block1 = useAnimation()
	const block2 = useAnimation()
	const block3 = useAnimation()
	const line1 = useAnimation()
	const line2 = useAnimation()

	const [show1, setShow1] = useState(false)
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)

	const value1 = useDelayedCount(98, 600, 2500, show1)
	const value2 = useDelayedCount(92, 1000, 2500, show2)
	const value3 = useDelayedCount(87, 1000, 2500, show3)

	useEffect(() => {
		if (!isPercentageInView) return

		async function sequence() {
			setShow1(true)
			await block1.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })

			await line1.start({ width: 100, transition: { duration: 0.4 } })

			setShow2(true)
			await block2.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })

			await line2.start({ width: 100, transition: { duration: 0.4 } })

			setShow3(true)
			await block3.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })
		}

		sequence()
	}, [isPercentageInView])

	return (
		<main className={styles.main}>
			<section className={styles.heroContainer}>
				<div className={styles.heroWrapper}>
					<div className={styles.heroContent}>
						<div className={styles.heroLeft}>
							<div className={styles.heroTxt}>
								<ParticlesTxt />
								<h1>
									Take <span>Control</span> of Your <span>Health</span>
								</h1>
								<h2>Intelligently</h2>
								<p>
									Neuropoint connects your wearable devices, sensors, and health
									data into one intelligent platform, giving you real-time
									insights, early warnings, and personalized recommendations to
									improve your well-being every day
								</p>
							</div>
							<div className={styles.heroBtns}>
								<button className={styles.blueBtn}>
									Start Tracking Now{' '}
									<span className={styles.arrowWrapper}>
										{' '}
										<ButtonArrow />{' '}
									</span>
								</button>
								<button>See How It Works</button>
							</div>
						</div>
						<div className={styles.heroRightWrapper}>
							<ParticlesHero />
							<Callout
								icon={<StatisticIcon />}
								text='Your Vitals in Real Time'
								delay={0}
								x='10%'
								y='-5%'
								lineWidth={120}
							/>
							<Callout
								icon={<HeartIcon />}
								text=' Daily Wellness Insights'
								delay={1}
								x='0'
								y='99%'
								lineWidth={120}
							/>
							<Callout
								icon={<NotifIcon />}
								text='Smart Health Alerts'
								delay={2}
								x='65%'
								y='80%'
								lineWidth={120}
							/>
							<div className={styles.heroRight}>
								<img src='/heroImg.png' alt='' />
							</div>
						</div>
					</div>
				</div>
			</section>

			<motion.section className={styles.rateContainer}>
				<div className={styles.rateWrapper}>
					<div className={styles.rateBlueBlock}>
						<div className={styles.rateContent}>
							<ParticlesTxtRate />

							<motion.div ref={rateLeftRef} className={styles.rateLeft}>
								<motion.h2
									initial={{ opacity: 0, x: 50 }}
									animate={isRateLeftInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
								>
									Unlock Deeper Understanding of Your Body –{' '}
									<span>All in One Place</span>
								</motion.h2>

								<motion.p
									initial={{ opacity: 0, x: 50 }}
									animate={isRateLeftInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
								>
									- Neuropoint connects with wearables, trackers, and sensors to
									gather real-time metrics across every major health category.
								</motion.p>

								<motion.p
									initial={{ opacity: 0, x: 50 }}
									animate={isRateLeftInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
								>
									- From heart rate and sleep to stress, oxygen, and activity,
									we bring it all into one clean, actionable dashboard.
								</motion.p>

								<motion.p
									initial={{ opacity: 0, x: 50 }}
									animate={isRateLeftInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
								>
									- No more jumping between apps or exporting spreadsheets. It’s
									all here, intelligently organized and always accessible.
								</motion.p>
							</motion.div>

							<div className={styles.rateRight}>
								<HealthDashboard />
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			<section ref={percentageRef} className={styles.percentageContainer}>
				<div className={styles.percentageWrapper}>
					<div className={styles.percentageContent}>
						<motion.div
							className={styles.block}
							initial={{ opacity: 0, y: 20 }}
							animate={block1}
						>
							<h3>{show1 ? `${value1}%` : ''}</h3>
							<p>
								<span>Less time</span> spent switching <br /> between health
								apps
							</p>
						</motion.div>

						<motion.div
							className={styles.line}
							initial={{ width: 0 }}
							animate={line1}
						/>

						<motion.div
							className={styles.block}
							initial={{ opacity: 0, y: 20 }}
							animate={block2}
						>
							<h3>{show2 ? `${value2}%` : ''}</h3>
							<p>
								Of users <span>feel more in control</span> <br /> after 7 days
							</p>
						</motion.div>

						<motion.div
							className={styles.line}
							initial={{ width: 0 }}
							animate={line2}
						/>

						<motion.div
							className={styles.block}
							initial={{ opacity: 0, y: 20 }}
							animate={block3}
						>
							<h3>{show3 ? `${value3}%` : ''}</h3>
							<p>
								Of users <span>improve</span> sleep, stress <br /> or focus
								within 2 weeks
							</p>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default HomeScreen
