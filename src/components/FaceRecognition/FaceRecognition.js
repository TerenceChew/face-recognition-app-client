import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceDetectionBox }) => {
  const { topRow, rightCol, bottomRow, leftCol } = faceDetectionBox;
  const faceDetectionBoxPosition = {
    top: topRow,
    right: rightCol,
    bottom: bottomRow,
    left: leftCol
  }
  return (
    <div className='image-area-container'>
      <div className='image-area center'>
        <img id='input-image' src={imageUrl} alt=""/>
        <div className='face-detection-box' style={faceDetectionBoxPosition}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;