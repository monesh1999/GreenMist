package in.umbrellaR1.GreenMist.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {
	
	Authentication getAuthentication();
}
