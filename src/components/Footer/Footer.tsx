import styles from './Footer.module.scss'
import LogoHeader from '../../assets/icons/LogoHeader'
import CompanyIcon from '../../assets/icons/CompanyIcon'
import UsersIcon from '../../assets/icons/UsersIcon'
import DataIcon from '../../assets/icons/DataIcon'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<nav>
					<ul>
						<h2>
							<span>
								<CompanyIcon />
							</span>
							Company
						</h2>
						<li>Terms of Use</li>
						<li>About Neuropoint</li>
						<li>Contact Us</li>
					</ul>
					<ul>
						<h2>
							<span>
								<UsersIcon />
							</span>
							Users
						</h2>
						<li>Privacy Policy</li>
						<li>Cookie Settings</li>
						<li>User Agreement</li>
					</ul>
					<ul>
						<h2>
							<span>
								<DataIcon />
							</span>
							Data & Compliance
						</h2>
						<li>Data Protection Overview</li>
						<li>Health Data Rights & Consent</li>
						<li>FAQ</li>
					</ul>
				</nav>
				<div className={styles.footerLeft}>
					<LogoHeader />
					<p>Smart health, created by Artler Agency.</p>
					<p>© 2024 Neuropoint Technologies. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
