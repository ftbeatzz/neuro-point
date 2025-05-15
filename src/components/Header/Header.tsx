// Header.tsx
import { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import LogoHeader from '../../assets/icons/LogoHeader'
import BurgerIcon from '../../assets/icons/BurgerIcon'
import CloseIcon from '../../assets/icons/CloseIcon'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
	}, [isMenuOpen])

	const toggleMenu = () => setIsMenuOpen(prev => !prev)

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<LogoHeader />
				</div>

				<nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
					<ul>
						<li>
							<a href='#'>Overview</a>
						</li>
						<li>
							<a href='#'>How It Works</a>
						</li>
						<li>
							<a href='#'>Advantages</a>
						</li>
						<li>
							<a href='#'>Key Features</a>
						</li>
						<li>
							<a href='#'>Why Choose Us</a>
						</li>
					</ul>
				</nav>

				<div className={styles.headerBtn}>
					<button>Get Started</button>
				</div>

				{/* иконка-обёртка для анимации */}
				<div
					className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
					onClick={toggleMenu}
				>
					{isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
				</div>
			</div>

			{isMenuOpen && <div className={styles.overlay} onClick={toggleMenu} />}
		</header>
	)
}

export default Header
