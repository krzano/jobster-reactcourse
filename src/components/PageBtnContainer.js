import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
	const { page, numOfPages } = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();

	const pages = Array.from({ length: numOfPages }, (item, index) => {
		return index + 1;
	});

	const prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1) {
			newPage = numOfPages;
		}
		dispatch(changePage(newPage));
	};
	const nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			newPage = 1;
		}
		dispatch(changePage(newPage));
	};

	return (
		<Wrapper>
			<button type='button' className='prev-btn' onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className='btn-container'>
				{pages.map((pageNumber) => {
					return (
						<button
							type='button'
							key={pageNumber}
							className={pageNumber === page ? 'page-btn active' : 'page-btn'}
							onClick={() => dispatch(changePage(pageNumber))}>
							{pageNumber}
						</button>
					);
				})}
			</div>
			<button type='button' className='prev-btn' onClick={nextPage}>
				<HiChevronDoubleRight />
				next
			</button>
		</Wrapper>
	);
};
export default PageBtnContainer;
