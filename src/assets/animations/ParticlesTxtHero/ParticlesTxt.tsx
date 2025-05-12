import React, { useRef, useEffect } from 'react'
import styles from './ParticlesTxt.module.scss'

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	size: number
	originX: number
	originY: number
}

const NUM_PARTICLES = 25 // плотность частиц с линиями
const FREE_PARTICLES = 0 // плотность «свободных» частиц без линий
const PARTICLE_MIN_SIZE = 2 // минимальный размер частицы
const PARTICLE_MAX_SIZE = 5 // максимальный размер частицы
const ORBIT_RADIUS = 100
const MAX_DISTANCE = 100
const CENTER_RADIUS = 0 // зона, куда частицы не летают
const EDGE_FADE = 70 // глубина фейда по краям
const SPEED_FACTOR = 0.3 // регулировка скорости

const ParticlesTxt: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const lineParticles = useRef<Particle[]>([])
	const freeParticles = useRef<Particle[]>([])

	useEffect(() => {

		const canvas = canvasRef.current!
		const ctx = canvas.getContext('2d')!

		const resize = () => {
			canvas.width = canvas.clientWidth
			canvas.height = canvas.clientHeight
		}
		window.addEventListener('resize', resize)
		resize()

		const createParticle = (): Particle => {
			let x: number, y: number
			do {
				x = Math.random() * canvas.width
				y = Math.random() * canvas.height
			} while (
				Math.hypot(x - canvas.width / 2, y - canvas.height / 2) < CENTER_RADIUS
			)
			return {
				x,
				y,
				originX: x,
				originY: y,
				vx: (Math.random() - 0.5) * SPEED_FACTOR,
				vy: (Math.random() - 0.5) * SPEED_FACTOR,
				size:
					Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE) +
					PARTICLE_MIN_SIZE,
			}
		}

		lineParticles.current = Array.from(
			{ length: NUM_PARTICLES },
			createParticle
		)
		freeParticles.current = Array.from(
			{ length: FREE_PARTICLES },
			createParticle
		)

		let raf: number
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			// 1) линии между lineParticles
			for (let i = 0; i < lineParticles.current.length; i++) {
				for (let j = i + 1; j < lineParticles.current.length; j++) {
					const p1 = lineParticles.current[i]
					const p2 = lineParticles.current[j]
					const dx = p1.x - p2.x
					const dy = p1.y - p2.y
					const dist = Math.hypot(dx, dy)
					if (dist < MAX_DISTANCE) {
						const alpha = 1 - dist / MAX_DISTANCE
						ctx.strokeStyle = `rgba(51,51,51,${alpha * 0.6})`
						ctx.lineWidth = 1
						ctx.beginPath()
						ctx.moveTo(p1.x, p1.y)
						ctx.lineTo(p2.x, p2.y)
						ctx.stroke()
					}
				}
			}

			const allParticles = [...lineParticles.current, ...freeParticles.current]
			// 2) обновляем и рисуем все частицы
			for (const p of allParticles) {
				p.x += p.vx
				p.y += p.vy

				const dxo = p.x - p.originX
				const dyo = p.y - p.originY
				const dO = Math.hypot(dxo, dyo)
				if (dO > ORBIT_RADIUS) {
					p.vx *= -1
					p.vy *= -1
					const k = ORBIT_RADIUS / dO
					p.x = p.originX + dxo * k
					p.y = p.originY + dyo * k
				}

				const dc = Math.hypot(p.x - canvas.width / 2, p.y - canvas.height / 2)
				if (dc < CENTER_RADIUS) {
					const ang = Math.atan2(
						p.y - canvas.height / 2,
						p.x - canvas.width / 2
					)
					const speed = Math.hypot(p.vx, p.vy)
					p.vx = Math.cos(ang) * speed
					p.vy = Math.sin(ang) * speed
				}

				ctx.fillStyle = '#33333399'
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
				ctx.fill()
			}

			// 3) вывод количества freeParticles в углу
			ctx.save()
			ctx.fillStyle = 'rgba(255,255,255,0.8)'
			ctx.font = '12px sans-serif'
			ctx.textAlign = 'left'
			ctx.textBaseline = 'top'
			ctx.fillText(`Free particles: ${freeParticles.current.length}`, 10, 10)
			ctx.restore()

			// 4) плавный фейд по краям
			ctx.save()
			ctx.globalCompositeOperation = 'destination-out'
			let grad

			// верх
			grad = ctx.createLinearGradient(0, 0, 0, EDGE_FADE)
			grad.addColorStop(0, 'rgba(0,0,0,1)')
			grad.addColorStop(1, 'rgba(0,0,0,0)')
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, canvas.width, EDGE_FADE)

			// низ
			grad = ctx.createLinearGradient(
				0,
				canvas.height - EDGE_FADE,
				0,
				canvas.height
			)
			grad.addColorStop(0, 'rgba(0,0,0,0)')
			grad.addColorStop(1, 'rgba(0,0,0,1)')
			ctx.fillStyle = grad
			ctx.fillRect(0, canvas.height - EDGE_FADE, canvas.width, EDGE_FADE)

			// лево
			grad = ctx.createLinearGradient(0, 0, EDGE_FADE, 0)
			grad.addColorStop(0, 'rgba(0,0,0,1)')
			grad.addColorStop(1, 'rgba(0,0,0,0)')
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, EDGE_FADE, canvas.height)

			// право
			grad = ctx.createLinearGradient(
				canvas.width - EDGE_FADE,
				0,
				canvas.width,
				0
			)
			grad.addColorStop(0, 'rgba(0,0,0,0)')
			grad.addColorStop(1, 'rgba(0,0,0,1)')
			ctx.fillStyle = grad
			ctx.fillRect(canvas.width - EDGE_FADE, 0, EDGE_FADE, canvas.height)

			ctx.restore()

			raf = requestAnimationFrame(animate)
		}

		animate()
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return <canvas ref={canvasRef} className={styles.canvas} />
}

export default ParticlesTxt
