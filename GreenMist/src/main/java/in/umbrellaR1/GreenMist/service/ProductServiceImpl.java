package in.umbrellaR1.GreenMist.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.umbrellaR1.GreenMist.dto.ProductRequest;
import in.umbrellaR1.GreenMist.dto.ProductResponse;

public interface ProductServiceImpl {
	
	String uploadFile(MultipartFile file);
	
	ProductResponse addProduct(ProductRequest request,MultipartFile file);
	
	List<ProductResponse> readProducts();
	
	ProductResponse readProduct(String id);
	
	boolean deleteFile(String filename);
	
	void deleteProduct(Long id);

}
