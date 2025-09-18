package in.umbrellaR1.GreenMist.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.umbrellaR1.GreenMist.service.AppUserDetailsService;
import in.umbrellaR1.GreenMist.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final AppUserDetailsService appUserDetailsServices;
    private final JwtUtil jwtUtil;

    public JwtRequestFilter(AppUserDetailsService appUserDetailsServices, JwtUtil jwtUtil) {
        this.appUserDetailsServices = appUserDetailsServices;
        this.jwtUtil = jwtUtil;
    }

    public static final List<String> PUBLIC_URLS = List.of(
            "/api/login",
            "/api/register"
            
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // allow public URLs (also handle sub-paths for products)
        if (PUBLIC_URLS.stream().anyMatch(path::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = null;
        String email = null;

        // 1. Check header
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
        }

        // 2. Check cookies if no header
        if (jwt == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("jwt".equals(c.getName())) {
                        jwt = c.getValue();
                        break;
                    }
                }
            }
        }

        // 3. Validate token
        try {
            if (jwt != null) {
                email = jwtUtil.extractUsername(jwt);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = appUserDetailsServices.loadUserByUsername(email);

                    if (jwtUtil.validateToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        } catch (Exception ex) {
            // log failure instead of silently failing
            System.out.println("JWT validation failed: " + ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
