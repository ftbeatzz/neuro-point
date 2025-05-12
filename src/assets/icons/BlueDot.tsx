const BlueDot = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='21'
		height='21'
		viewBox='0 0 21 21'
		fill='none'
	>
		<g filter='url(#filter0_d_40_5243)'>
			<circle cx='10.5' cy='6.5' r='6.5' fill='url(#paint0_radial_40_5243)' />
		</g>
		<defs>
			<filter
				id='filter0_d_40_5243'
				x='0'
				y='0'
				width='21'
				height='21'
				filterUnits='userSpaceOnUse'
				color-interpolation-filters='sRGB'
			>
				<feFlood flood-opacity='0' result='BackgroundImageFix' />
				<feColorMatrix
					in='SourceAlpha'
					type='matrix'
					values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
					result='hardAlpha'
				/>
				<feOffset dy='4' />
				<feGaussianBlur stdDeviation='2' />
				<feComposite in2='hardAlpha' operator='out' />
				<feColorMatrix
					type='matrix'
					values='0 0 0 0 0.180392 0 0 0 0 0.541176 0 0 0 0 0.996078 0 0 0 0.12 0'
				/>
				<feBlend
					mode='normal'
					in2='BackgroundImageFix'
					result='effect1_dropShadow_40_5243'
				/>
				<feBlend
					mode='normal'
					in='SourceGraphic'
					in2='effect1_dropShadow_40_5243'
					result='shape'
				/>
			</filter>
			<radialGradient
				id='paint0_radial_40_5243'
				cx='0'
				cy='0'
				r='1'
				gradientUnits='userSpaceOnUse'
				gradientTransform='translate(10.5 6.5) rotate(90) scale(6.5)'
			>
				<stop stop-color='white' />
				<stop offset='1' stop-color='#2E8AFE' />
			</radialGradient>
		</defs>
	</svg>
)

export default BlueDot
