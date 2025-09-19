package in.umbrellaR1.GreenMist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.umbrellaR1.GreenMist.dto.CartRequest;
import in.umbrellaR1.GreenMist.dto.CartResponse;
import in.umbrellaR1.GreenMist.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	
	@PostMapping
	public CartResponse addToCart(@RequestBody CartRequest request) {
	    if (request.getProductId() == null) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Product ID is required");
	    }

	    cartService.addToCart(request);
	    return cartService.addToCart(request);
	}
	
	@GetMapping
	public CartResponse getCart() {
		return cartService.getCart();
		
	}
	
	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void clearCart() {
		cartService.clearCart();
	}
	
	@PostMapping("/remove")
	public CartResponse removeFromCart(@RequestBody CartRequest request) {
		if (request.getProductId() == null) {
	        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Product ID is required");
	    }
		return cartService.removeFromCart(request);
	}
	



}
