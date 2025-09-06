package in.umbrellaR1.GreenMist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.umbrellaR1.GreenMist.dto.ProductRequest;
import in.umbrellaR1.GreenMist.dto.ProductResponse;
import in.umbrellaR1.GreenMist.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/add")
    public ResponseEntity<ProductResponse> addProduct(
            @RequestPart("product") String productString,
            @RequestPart("file") MultipartFile file) {
        try {
            // Convert JSON string to ProductRequest
            ProductRequest request = objectMapper.readValue(productString, ProductRequest.class);

            // Call service to save product + file
            ProductResponse response = productService.addProduct(request, file);

            return ResponseEntity.ok(response);

        } catch (JsonProcessingException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public List<ProductResponse> readProducts(){
    	return productService.readProducts();
    	
    }
    
    @GetMapping("/{id}")
    public ProductResponse readProduct(@PathVariable String id) {
    	return productService.readProduct(id);
    	
    }
    
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
    	productService.deleteProduct(id);
    }
    
}
