import { type ReactNode } from 'react'
import Header from '../components/Header/Header.tsx'
import Footer from '../components/Footer/Footer.tsx'
import styles from './MainLayout.module.scss'

const MainLayout = ({ children }: { children: ReactNode }) => {

	return (
		<>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</>
	)
}

export default MainLayout
