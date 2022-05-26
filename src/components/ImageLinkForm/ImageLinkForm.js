import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onKeyDownHandler }) => {
  return (
    <div className='form-area center tc br3'>
      <p className='f4'>This Magic Brain will detect faces in pictures. Give it a try!</p>
      <div className='input-area w-100 center shadow-5'>
        <input
          type='text'
          placeholder='image link'
          className='pa2 br2'
          onChange={onInputChange}
          onKeyDown={onKeyDownHandler}
        />
        <button
          className='grow link pointer pa2 br2'
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  )
}

export default ImageLinkForm;