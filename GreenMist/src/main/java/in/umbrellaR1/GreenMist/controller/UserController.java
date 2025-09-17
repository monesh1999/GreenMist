package in.umbrellaR1.GreenMist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import in.umbrellaR1.GreenMist.dto.UserRequest;
import in.umbrellaR1.GreenMist.dto.UserResponse;
import in.umbrellaR1.GreenMist.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public UserResponse register(@RequestBody UserRequest request) {
		UserResponse response = userService.registerUser(request);
		return response;
	}
	
}
