package in.umbrellaR1.GreenMist.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;



import in.umbrellaR1.GreenMist.Repository.ProductRepository;
import in.umbrellaR1.GreenMist.dto.ProductRequest;
import in.umbrellaR1.GreenMist.dto.ProductResponse;
import in.umbrellaR1.GreenMist.models.ProductEntity;

@Service
public class ProductService implements ProductServiceImpl {
	
	
	@Autowired
	private ProductRepository productRepo;
    
    @Override
    public String uploadFile(MultipartFile file) {
        try {
            // ⚠️ Better: use "uploads/" outside resources (works after JAR build)
        	String uploadDir = System.getProperty("user.dir") + "/uploads/";


            // Create folder if not exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique file name
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = UUID.randomUUID().toString() + extension;

            // Save file to local folder
            File dest = new File(uploadDir + fileName);
            file.transferTo(dest);

            // Return URL (served via WebConfig)
            return "/uploads/" + fileName;

        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed", ex);
        }
    }


	@Override
	public ProductResponse addProduct(ProductRequest request, MultipartFile file) {
	    ProductEntity newProductEntity = convertToEntity(request);
	    // Save uploaded file
	    String imageUrl = uploadFile(file);
	    newProductEntity.setImageUrl(imageUrl);
	    // Save product in DB
	    ProductEntity saved = productRepo.save(newProductEntity);
	    // Convert back to response
	    return convertToResponse(saved);
	}
	
	
	private ProductEntity convertToEntity(ProductRequest request) {
		ProductEntity entity = new ProductEntity();
		entity.setName(request.getName());
		entity.setDescription(request.getDescription());
		entity.setCategory(request.getCategory());
		entity.setPrice(request.getPrice());
		return entity;
	}
	

	private ProductResponse convertToResponse(ProductEntity entity) {
	    ProductResponse response = new ProductResponse();
	    response.setId(entity.getId());  // UUID -> String
	    response.setName(entity.getName());
	    response.setDescription(entity.getDescription());
	    response.setCategory(entity.getCategory());
	    response.setPrice(entity.getPrice());
	    response.setImageUrl(entity.getImageUrl());
	    return response;
	}


	@Override
	public List<ProductResponse> readProducts() {
	    List<ProductEntity> databaseEntries = productRepo.findAll();

	    return databaseEntries.stream()
	            .map(this::convertToResponse)  
	            .collect(Collectors.toList());
	}
	
	
	@Override
	public ProductResponse readProduct(String id) {
	    Long productId = Long.valueOf(id); // convert String → Long
	    ProductEntity existingProduct = productRepo.findById(productId)
	            .orElseThrow(() -> new RuntimeException("Product not found for this Id: " + id));
	    return convertToResponse(existingProduct);
	}


	@Override
	public boolean deleteFile(String filename) {
	    try {
	        String uploadDir = "uploads/";
	        // if filename is full path like "/uploads/abc.png", take only last part
	        if (filename.contains("/")) {
	            filename = filename.substring(filename.lastIndexOf("/") + 1);
	        }

	        File file = new File(uploadDir + filename);

	        if (file.exists()) {
	            return file.delete(); // true if deleted
	        } else {
	            return false; // file not found
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

	@Override
	public void deleteProduct(Long id) {
	    ProductEntity existingProduct = productRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Product not found for this Id: " + id));

	    // delete the image file if exists
	    if (existingProduct.getImageUrl() != null) {
	        deleteFile(existingProduct.getImageUrl());
	    }

	    // delete the product from DB
	    productRepo.deleteById(id);
	}






}
