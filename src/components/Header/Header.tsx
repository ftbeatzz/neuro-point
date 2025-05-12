import styles from './Header.module.scss'
import LogoHeader from '../../assets/icons/LogoHeader'

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<LogoHeader />
				</div>
				<nav className={styles.nav}>
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
			</div>
		</header>
	)
}

export default Header
