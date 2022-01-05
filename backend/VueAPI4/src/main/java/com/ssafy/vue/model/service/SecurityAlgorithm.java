package com.ssafy.vue.model.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityAlgorithm {
	public static String createHash(String str) {
		String hasString = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-512");
			sh.update(str.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			
			for(int i = 0; i < 8; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			hasString = sb.toString();
		} catch(NoSuchAlgorithmException e) {
			e.printStackTrace();
			hasString = null;
		}
		return hasString;
	}
}
