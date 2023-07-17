const FormRow = ({ type, name, labelText, value, handleChange }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<input
				className='form-input'
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};
export default FormRow;
