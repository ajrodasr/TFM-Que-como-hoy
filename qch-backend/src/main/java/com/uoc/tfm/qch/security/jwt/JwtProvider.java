package com.uoc.tfm.qch.security.jwt;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.uoc.tfm.qch.security.domain.UsuarioPrincipal;
import com.uoc.tfm.qch.security.dto.JwtDto;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {

	private final static Logger log = LoggerFactory.getLogger(JwtProvider.class);

	@Value("${jwt.secret}")
	private String secret;
	@Value("${jwt.expiration}")
	private int expiration;

	public String generateToken(Authentication authentication) {
		UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
		List<String> roles = usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		return Jwts.builder()
				.setSubject(usuarioPrincipal.getUsername())
				.claim("roles", roles)
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
				.compact();
	}

	public String getIdUsuario(String token) {
		return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			log.error("Error en la validación del token", e);
		}
		return false;
	}
	
	@SuppressWarnings("unchecked")
	public String refreshToken(JwtDto jwtDto) throws ParseException {
		try {
			Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(jwtDto.getToken());
		} catch (ExpiredJwtException e) {
			log.info("El token ha expirado, refresacamos");
			JWT jwt = JWTParser.parse(jwtDto.getToken());
			JWTClaimsSet claims = jwt.getJWTClaimsSet();
			String idUsuario = claims.getSubject();
			List<String> roles = (List<String>) claims.getClaim("roles");
			return Jwts.builder()
					.setSubject(idUsuario)
					.claim("roles", roles)
					.setIssuedAt(new Date())
					.setExpiration(new Date(new Date().getTime() + expiration))
					.signWith(SignatureAlgorithm.HS512, secret.getBytes())
					.compact();
		}
		return null;
	}
}
