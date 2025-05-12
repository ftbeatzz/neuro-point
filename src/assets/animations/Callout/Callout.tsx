import React from 'react'
import { motion } from 'framer-motion'
import styles from './Callout.module.scss'

interface CalloutProps {
	icon: React.ReactNode
	text: string
	delay?: number
	x: string | number
	y: string | number
	lineWidth?: number // длина пунктирной линии в px
}

const Callout: React.FC<CalloutProps> = ({
	icon,
	text,
	delay = 0,
	x,
	y,
	lineWidth = 100,
}) => {
	return (
		<div
			className={styles.callout}
			style={
				{
					top: y,
					left: x,
					'--line-width': `${lineWidth}px`,
				} as React.CSSProperties
			}
		>
			{/* 3) Блок с иконкой и текстом */}
			<motion.div
				className={styles.label}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: delay + 1.1, duration: 0.5 }}
			>
				<span className={styles.icon}>{icon}</span>
				<span className={styles.text}>{text}</span>
			</motion.div>

			{/* 2) Пунктирная линия */}
			<motion.div
				className={styles.dash}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					delay: delay + 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
			/>

			{/* 1) Точка-капля */}
			<motion.div
				className={styles.dot}
				initial={{ scale: 0, y: -20, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				transition={{
					delay,
					type: 'spring',
					stiffness: 300,
					damping: 20,
				}}
			/>
		</div>
	)
}

export default Callout
