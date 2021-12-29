package com.uoc.tfm.qch.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class ImagesConfig {
	
	@Value("${cloudinary.cloudname}")
	private String cloudName;
	
	@Value("${cloudinary.apikey}")
	private String apiKey;
	
	@Value("${cloudinary.apisecret}")
	private String apiSecret;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Bean
	public Cloudinary cloudinaryConfig() {
	    Cloudinary cloudinary = null;
	    Map config = new HashMap();
	    config.put("cloud_name", cloudName);
	    config.put("api_key", apiKey);
	    config.put("api_secret", apiSecret);
	    cloudinary = new Cloudinary(config);
	    return cloudinary;
	}
}
