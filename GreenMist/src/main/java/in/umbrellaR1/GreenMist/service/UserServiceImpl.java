package in.umbrellaR1.GreenMist.service;

import in.umbrellaR1.GreenMist.dto.UserRequest;
import in.umbrellaR1.GreenMist.dto.UserResponse;

public interface UserServiceImpl {
	
	UserResponse registerUser(UserRequest request);
	
	Long findByUserId();
	
	

}
