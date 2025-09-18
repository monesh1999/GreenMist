package in.umbrellaR1.GreenMist.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private final String SECRET = "GreenMist-create-by-monesh-ThisSecretKeyMustBeAtLeast32Bytes"; 
	private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

	 private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	 
	
	
	public String generateToken(UserDetails userDetails) {
		 Map<String,Object> cliams = new HashMap<>();
		 return createToken(cliams,userDetails.getUsername());
		 
	 }


	private String createToken(Map<String, Object> cliams, String username) {
		return Jwts.builder()
         .setClaims(cliams)
         .setSubject(username)
         .setIssuedAt(new Date(System.currentTimeMillis()))
         .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
         .signWith(secretKey, SignatureAlgorithm.HS256)
         .compact();
	 }
	
	public String extractUsername(String token) {
		 return extractClaims(token,Claims::getSubject);
		 
	 }
	public Date extractExpired(String token) {
		 return extractClaims(token,Claims::getExpiration);
	 }
	 public Boolean isTokenExpired(String token) {
		 return extractExpired(token).before(new Date());
	 }
	 public Claims extractAllClaims(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(secretKey)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	                
	    }
	 public <T> T extractClaims(String token, Function<Claims,T> claimsResolver) {
		 final Claims claims = extractAllClaims(token);
		 return claimsResolver.apply(claims);
	 }
	 
	 public Boolean validateToken(String token,UserDetails userDetails) {
		 final String email = extractUsername(token);
		 return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	 }

}
