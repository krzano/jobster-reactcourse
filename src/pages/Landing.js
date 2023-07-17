import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					{/* info */}
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Freegan before they sold out cloud bread authentic squid chillwave quinoa. Polaroid pinterest kinfolk mlkshk
						banh mi vexillologist. Readymade four loko iPhone live-edge retro meh umami synth.
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login / Register
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};
export default Landing;
