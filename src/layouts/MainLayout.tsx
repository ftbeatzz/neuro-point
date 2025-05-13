import { useEffect, useState, type ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Preloader from '../components/Preloader/Preloader'
import styles from './MainLayout.module.scss'

const MainLayout = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 2000))
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <Preloader />

	return (
		<>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</>
	)
}

export default MainLayout
