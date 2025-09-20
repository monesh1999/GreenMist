package in.umbrellaR1.GreenMist.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.umbrellaR1.GreenMist.Repository.CartRepository;
import in.umbrellaR1.GreenMist.dto.CartRequest;
import in.umbrellaR1.GreenMist.dto.CartResponse;
import in.umbrellaR1.GreenMist.models.CartEntity;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserService userService;

//	@Override
//	public void addToCart(Long productId) {
//		Long loggedInUserId = userService.findByUserId();
//		Optional<CartEntity> cartOptional=cartRepository.findByUserId(loggedInUserId);
//		CartEntity entity = cartOptional.orElseGet(()-> new CartEntity(loggedInUserId,new HashMap<>()));
//		Map<String, Integer> cartItems =entity.getItems();
//		cartItems.put(productId, cartItems.getOrDefault(productId, 0)+1);
//		entity.setItems(cartItems);
//		entity = cartRepository.save(entity);
//		
//	}
	@Override
	public CartResponse addToCart(CartRequest request) {
	    Long loggedInUserId = userService.findByUserId(); 

	    CartEntity entity = cartRepository.findByUserId(loggedInUserId)
	            .orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));

	    Map<Long, Integer> cartItems = entity.getItems();
	    cartItems.put(request.getProductId(), cartItems.getOrDefault(request.getProductId(), 0) + 1);
	    
	    

	    entity.setItems(cartItems);

	    entity = cartRepository.save(entity);

	    return convertToResponse(entity);  // ✅ return DTO
	}

	
	private CartResponse convertToResponse(CartEntity cartEntity) {
	    CartResponse response = new CartResponse();
	    response.setId(cartEntity.getId());
	    response.setUserid(cartEntity.getUserId());
	    response.setItems(cartEntity.getItems());
	    return response;
	}


	@Override
	public CartResponse getCart() {
		Long loggedInUserId = userService.findByUserId();
		CartEntity entity = cartRepository.findByUserId(loggedInUserId).orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
		

		return convertToResponse(entity);
	}


	@Override
	public void clearCart() {
		Long loggedInUserId = userService.findByUserId();
		cartRepository.deleteByUserId(loggedInUserId);
	}


	@Override
	public CartResponse removeFromCart(CartRequest cartRequest) {
		Long loggedInUserId = userService.findByUserId();
		CartEntity entity = cartRepository.findByUserId(loggedInUserId).orElseThrow(()-> new RuntimeException("Cart is not found"));
		Map<Long, Integer> cartItems = entity.getItems();
		if(cartItems.containsKey(cartRequest.getProductId())) {
			int currentQty = cartItems.get(cartRequest.getProductId());
			if(currentQty > 0) {
				cartItems.put(cartRequest.getProductId(), currentQty -1);
			}
			else {
				cartItems.remove(cartRequest.getProductId());
			}
			entity = cartRepository.save(entity);
			return convertToResponse(entity);
		}
		
		
		return null;
	}

	
	
}
