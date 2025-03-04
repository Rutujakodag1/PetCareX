const ProductImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
  
    return (
      <div>
        <img src={selectedImage} alt="Selected Product" className="w-full mb-4 rounded-lg object-cover" />
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 cursor-pointer rounded-lg"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductImageGallery;
  