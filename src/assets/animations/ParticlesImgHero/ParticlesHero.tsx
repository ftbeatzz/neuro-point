import React, { useRef, useEffect } from 'react'
import styles from './ParticlesHero.module.scss'

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	size: number
	originX: number
	originY: number
}

const NUM_PARTICLES = 60 // плотность частиц с линиями
const FREE_PARTICLES = 30 // плотность «свободных» частиц без линий
const PARTICLE_MIN_SIZE = 0.5 // минимальный размер частицы
const PARTICLE_MAX_SIZE = 3 // максимальный размер частицы
const ORBIT_RADIUS = 60
const MAX_DISTANCE = 150
const CENTER_RADIUS = 100 // зона, куда частицы не летают
const EDGE_FADE = 70 // глубина фейда по краям
const SPEED_FACTOR = 0.6 // регулировка скорости
const HOVER_DISTANCE = 250 // радиус «притяжения» к курсору

const ParticlesHero: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const lineParticles = useRef<Particle[]>([])
	const freeParticles = useRef<Particle[]>([])
	const mousePos = useRef({ x: 0, y: 0, active: false })

	useEffect(() => {
		console.log(
			'Line particles:',
			NUM_PARTICLES,
			'| Free particles:',
			FREE_PARTICLES,
			'| Size:',
			PARTICLE_MIN_SIZE,
			'–',
			PARTICLE_MAX_SIZE,
			'| Speed factor:',
			SPEED_FACTOR
		)

		const canvas = canvasRef.current!
		const ctx = canvas.getContext('2d')!

		// Обновляем размеры canvas
		const resize = () => {
			canvas.width = canvas.clientWidth
			canvas.height = canvas.clientHeight
		}
		window.addEventListener('resize', resize)
		resize()

		// Обработчики мыши
		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect()
			mousePos.current.x = e.clientX - rect.left
			mousePos.current.y = e.clientY - rect.top
			mousePos.current.active = true
		}
		const handleMouseLeave = () => {
			mousePos.current.active = false
		}
		canvas.addEventListener('mousemove', handleMouseMove)
		canvas.addEventListener('mouseleave', handleMouseLeave)

		// Функция создания частицы вне центра
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

		// Инициализация массивов
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
						ctx.strokeStyle = `rgba(46,138,254,${alpha * 0.4})`
						ctx.lineWidth = 1
						ctx.beginPath()
						ctx.moveTo(p1.x, p1.y)
						ctx.lineTo(p2.x, p2.y)
						ctx.stroke()
					}
				}
			}

			// 2) линии притяжения к курсору
			if (mousePos.current.active) {
				for (const p of lineParticles.current) {
					const dx = p.x - mousePos.current.x
					const dy = p.y - mousePos.current.y
					const dist = Math.hypot(dx, dy)
					if (dist < HOVER_DISTANCE) {
						const alpha = 1 - dist / HOVER_DISTANCE
						ctx.strokeStyle = `rgba(46,138,254,${alpha * 0.4})`
						ctx.lineWidth = 1
						ctx.beginPath()
						ctx.moveTo(p.x, p.y)
						ctx.lineTo(mousePos.current.x, mousePos.current.y)
						ctx.stroke()
					}
				}
			}

			// 3) обновляем и рисуем все частицы
			const allParticles = [...lineParticles.current, ...freeParticles.current]
			for (const p of allParticles) {
				p.x += p.vx
				p.y += p.vy

				// ограничиваем орбиту
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

				// отталкиваем от центра
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

				// рисуем частицу
				ctx.fillStyle = '#2E8AFE'
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
				ctx.fill()
			}

			// 4) вывод количества freeParticles
			ctx.save()
			ctx.fillStyle = 'rgba(255,255,255,0.8)'
			ctx.font = '12px sans-serif'
			ctx.textAlign = 'left'
			ctx.textBaseline = 'top'
			ctx.fillText(`Free particles: ${freeParticles.current.length}`, 10, 10)
			ctx.restore()

			// 5) плавный фейд по краям
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
			canvas.removeEventListener('mousemove', handleMouseMove)
			canvas.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	return <canvas ref={canvasRef} className={styles.canvas} />
}

export default ParticlesHero
