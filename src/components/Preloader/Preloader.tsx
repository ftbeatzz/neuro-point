import Lottie from 'lottie-react'
import loaderAnimation from '../../assets/animations/preloader.json'
import styles from './Preloader.module.scss'

const Preloader = () => {
	return (
		<div className={styles.preloaderWrapper}>
			<Lottie
				animationData={loaderAnimation}
				loop={true}
				style={{ height: '260px', width: '260px' }}
			/>
		</div>
	)
}

export default Preloader
