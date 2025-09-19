package in.umbrellaR1.GreenMist.service;

import org.springframework.stereotype.Service;

import in.umbrellaR1.GreenMist.dto.CartRequest;
import in.umbrellaR1.GreenMist.dto.CartResponse;

@Service
public interface CartService {
	CartResponse addToCart(CartRequest request);
	
	CartResponse getCart();
	
	void clearCart();
	
	CartResponse removeFromCart(CartRequest cartRequest);


}
