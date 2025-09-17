package in.umbrellaR1.GreenMist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.umbrellaR1.GreenMist.Repository.UserRepository;
import in.umbrellaR1.GreenMist.dto.UserRequest;
import in.umbrellaR1.GreenMist.dto.UserResponse;
import in.umbrellaR1.GreenMist.models.UserEntity;


@Service
public class UserService implements UserServiceImpl {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponse registerUser(UserRequest request) {
		UserEntity newUser = convertToEntity(request);
		newUser = userRepository.save(newUser);
		return convertToResponse(newUser);
		
	}
	
	private UserEntity convertToEntity(UserRequest request) {
		UserEntity entity = new UserEntity();
		entity.setEmail(request.getEmail());
		entity.setName(request.getName());
		entity.setPassword(passwordEncoder.encode(request.getPassword()));
		return entity;
	}
	
	private UserResponse convertToResponse(UserEntity registerUser) {
		UserResponse response = new UserResponse();
		response.setEmail(registerUser.getEmail());
		response.setId(registerUser.getId());
		response.setName(registerUser.getName());
		return response;
	}

}
