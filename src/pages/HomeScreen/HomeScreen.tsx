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
import CheckArrow from '../../assets/icons/CheckArrow'
import TouchIcon from '../../assets/icons/TouchIcon'
import LoopIcon from '../../assets/icons/LoopIcon'
import BellIcon from '../../assets/icons/BellIcon'

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
	const appTopRef = useRef(null)
	const chooseRef = useRef(null)
	const trackingRef = useRef(null)

	const isRateLeftInView = useInView(rateLeftRef, {
		once: true,
		margin: '-100px',
	})
	const isPercentageInView = useInView(percentageRef, {
		once: true,
		margin: '-10px',
	})
	const isAppTopInView = useInView(appTopRef, { once: true, margin: '-100px' })

	const isChooseInView = useInView(chooseRef, { once: true, margin: '-100px' })

	const isTrackingInView = useInView(trackingRef, {
		once: true,
		margin: '-100px',
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
	}, [isPercentageInView, block1, block2, block3, line1, line2])

	const advantagesRefs = useRef<(HTMLDivElement | null)[]>([])
	const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			let minDistance = Infinity
			let closestIndex: number | null = null

			advantagesRefs.current.forEach((ref, index) => {
				if (!ref) return
				const rect = ref.getBoundingClientRect()
				const centerY = rect.top + rect.height / 2
				const distance = Math.abs(window.innerHeight / 2 - centerY)

				if (distance < minDistance) {
					minDistance = distance
					closestIndex = index
				}
			})

			setActiveAdvantage(closestIndex)
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll() // initial run

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

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

			<section className={styles.advantagesContainer}>
				<div className={styles.advantagesWrapper}>
					<h2>Advantages</h2>
					<div className={styles.advantagesContent}>
						{[
							{
								title: 'Continuous Real-Time Tracking',
								text: 'Your vitals, activity, and sleep are monitored 24/7 with zero manual input — always up to date, always in sync.',
							},
							{
								title: 'Advanced Analytics Engine',
								text: 'AI-powered algorithms turn raw sensor data into meaningful, actionable insights about your body and mind.',
							},
							{
								title: 'Personalized Health Recommendations',
								text: 'Neuropoint analyzes your patterns to deliver daily, data-backed guidance tailored to your wellness goals.',
							},
							{
								title: 'Early Warning System',
								text: 'Get notified instantly when our system detects unusual patterns in your health data, allowing you to take early action before minor imbalances become serious health concerns.',
							},
							{
								title: 'Bio-Behavioral Baselines',
								text: 'Track long-term trends in your stress, recovery, sleep, and cognitive focus — and know when you’re off balance.',
							},
							{
								title: 'End-to-End Data Privacy',
								text: 'Your health data is encrypted, anonymized, and stored securely — never shared or sold. You remain the sole owner and in full control of your information.',
							},
							{
								title: 'Fast, Secure Device Sync',
								text: 'Easily connect your favorite wearables and health sensors in just seconds — with seamless syncing, no setup hassle, and zero data gaps.',
							},
						].map((item, i) => (
							<div
								key={i}
								ref={(el: HTMLDivElement | null) => {
									advantagesRefs.current[i] = el
								}}
								className={`${styles.advantagesList} ${
									activeAdvantage === i ? styles.active : ''
								}`}
							>
								<CheckArrow />
								<div className={styles.listTxt}>
									<h3>{item.title}</h3>
									<p>{item.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={styles.appContainer}>
				<div className={styles.appWrapper}>
					<div className={styles.appContent}>
						<motion.div
							className={styles.appTop}
							ref={appTopRef}
							initial={{ opacity: 0, y: 60 }}
							animate={isAppTopInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							<div className={styles.appBlock}>
								<ParticlesTxtRate />
								<div className={styles.appMockups}>
									<img src='/mockups.png' alt='' />
								</div>
								<div className={styles.appBlockTxt}>
									<h2>Meet the Neuropoint App</h2>
									<h3>
										Your personal health intelligence system — in your pocket.
									</h3>
								</div>
							</div>
						</motion.div>
						<div className={styles.appBottom}>
							{[...Array(3)].map((_, i) => {
								const content = [
									{
										icon: <TouchIcon />,
										title: 'Integration & Devices',
										text: 'Neuropoint connects seamlessly with leading wearables and biometric sensors — including Apple Watch, Oura, Fitbit, and more — through secure APIs and real-time syncing.',
									},
									{
										icon: <LoopIcon />,
										title: 'Health Data Engine',
										text: 'All incoming data is analyzed by our AI-driven wellness engine, which continuously monitors your vitals, detects trends, and delivers actionable insights backed by medical science.',
									},
									{
										icon: <BellIcon />,
										title: 'Automation & Alerts',
										text: 'From daily summaries to real-time warnings, Neuropoint automates everything — alerting you when something’s off, and suggesting exactly how to respond.',
									},
								][i]

								return (
									<motion.div
										key={i}
										className={styles.appBlock}
										initial={{ opacity: 0, y: 60 }}
										animate={isAppTopInView ? { opacity: 1, y: 0 } : {}}
										transition={{
											duration: 0.6,
											delay: 0.3 + i * 0.3,
											ease: 'easeOut',
										}}
									>
										{content.icon}
										<h2>{content.title}</h2>
										<p>{content.text}</p>
									</motion.div>
								)
							})}
						</div>
					</div>
				</div>
			</section>

			<section className={styles.chooseContainer}>
				<div className={styles.chooseWrapper}>
					<div className={styles.chooseBlueBlock}>
						<div className={styles.chooseContent} ref={chooseRef}>
							<div className={styles.chooseTop}>
								<motion.h2
									initial={{ opacity: 0, y: 40 }}
									animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.6 }}
								>
									Why Choose <span>Neuropoint?</span>
								</motion.h2>

								<motion.h3
									initial={{ opacity: 0, y: 40 }}
									animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.2, duration: 0.6 }}
								>
									Neuropoint is built on a foundation of scientific integrity,
									intelligent design, and user-first data ethics.
								</motion.h3>
							</div>
							<div className={styles.chooseBottom}>
								<motion.div
									className={styles.chooseBlock}
									initial={{ opacity: 0, x: -60 }}
									animate={isChooseInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
								>
									<h2>Trusted Technology & Integrations</h2>
									<ul>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 0.8, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Built in collaboration with best biometric scientists
												and digital health researchers
											</p>
										</motion.li>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 1.0, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Integrated with over 50 wearable and sensor devices
												worldwide
											</p>
										</motion.li>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 1.2, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Backed by secure infrastructure with encrypted syncing
												and device APIs
											</p>
										</motion.li>
									</ul>
								</motion.div>

								<motion.div
									className={styles.chooseBlock}
									initial={{ opacity: 0, x: 60 }}
									animate={isChooseInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
								>
									<h2>Privacy & Intelligence You Control</h2>
									<ul>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 0.8, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Aligned with HIPAA, GDPR, and next-gen health data
												regulations
											</p>
										</motion.li>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 1.0, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Transparent AI that explains every recommendation and
												alert
											</p>
										</motion.li>
										<motion.li
											initial={{ opacity: 0, y: 30 }}
											animate={isChooseInView ? { opacity: 1, y: 0 } : {}}
											transition={{ delay: 1.2, duration: 0.4 }}
										>
											<span>
												<CheckArrow />
											</span>
											<p>
												Trusted by health professionals and coaches across 30+
												countries
											</p>
										</motion.li>
									</ul>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.trackingContainer} ref={trackingRef}>
				<div className={styles.trackingWrapper}>
					<motion.div
						className={styles.trackingContent}
						initial='hidden'
						animate={isTrackingInView ? 'visible' : 'hidden'}
						variants={{ hidden: {}, visible: {} }}
					>
						<motion.h2
							initial={{ opacity: 0, y: 40 }}
							animate={isTrackingInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6 }}
						>
							Discover What Your Body's Data Is Telling <span>You</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 40 }}
							animate={isTrackingInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							Start your personalized health journey today — we’ll help you
							unlock deeper insights and better decisions.
						</motion.p>

						<motion.div
							className={styles.trackingDash}
							initial={{ opacity: 0, y: 40 }}
							animate={isTrackingInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4, duration: 0.6 }}
						></motion.div>

						<motion.div
							className={styles.trackingBtn}
							initial={{ opacity: 0, y: 40 }}
							animate={isTrackingInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.6, duration: 0.6 }}
						>
							<button>
								Start Tracking Now{' '}
								<span>
									<ButtonArrow />
								</span>
							</button>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</main>
	)
}

export default HomeScreen
