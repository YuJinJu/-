package com.ssafy.happyhouse.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.GuestBookDto;
import com.ssafy.happyhouse.model.mapper.GuestBookMapper;

@Service
public class GuestBookServiceImpl implements GuestBookService {

	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void registerArticle(GuestBookDto guestBookDto) throws Exception {
		sqlSession.getMapper(GuestBookMapper.class).registerArticle(guestBookDto);

	}

	@Override
	public List<GuestBookDto> listArticle() throws Exception {
		return sqlSession.getMapper(GuestBookMapper.class).listArticle();
	}

	@Override
	public GuestBookDto getArticle(int articleNo) throws Exception {
		return sqlSession.getMapper(GuestBookMapper.class).getArticle(articleNo);
	}

	@Override
	public void updateArticle(GuestBookDto guestBookDto) throws Exception {
		sqlSession.getMapper(GuestBookMapper.class).updateArticle(guestBookDto);

	}

	@Override
	public void deleteArticle(int articleNo) throws Exception {
		sqlSession.getMapper(GuestBookMapper.class).deleteArticle(articleNo);

	}

}
