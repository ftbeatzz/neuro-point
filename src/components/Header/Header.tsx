import styles from './Header.module.scss'

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logo}></div>
				<nav className={styles.nav}>
				</nav>
			</div>
		</header>
	)
}

export default Header
