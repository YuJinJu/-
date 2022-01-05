package com.ssafy.happyhouse.model.mapper;

import java.util.List;

import com.ssafy.happyhouse.model.GuestBookDto;

public interface GuestBookMapper {
	void registerArticle(GuestBookDto guestBookDto) throws Exception;
	List<GuestBookDto> listArticle() throws Exception;
	GuestBookDto getArticle(int articleNo) throws Exception;
	void updateArticle(GuestBookDto guestBookDto) throws Exception;
	void deleteArticle(int articleNo) throws Exception;
}
