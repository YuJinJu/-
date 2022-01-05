package com.ssafy.vue.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.BoardCommentDto;
import com.ssafy.vue.model.mapper.BoardCommentMapper;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {

	@Autowired
	private BoardCommentMapper boardcommentMapper;

	@Override
	public List<BoardCommentDto> list(String articleno) {
		return boardcommentMapper.list(articleno);
	}

	@Override
	public boolean create(BoardCommentDto boardcommentDto) {
		return boardcommentMapper.create(boardcommentDto) == 1;
	}

	@Override
	public boolean modify(BoardCommentDto boardcommentDto) {
		return boardcommentMapper.modify(boardcommentDto) == 1;
	}

	@Override
	public boolean delete(int commentno) {
		return boardcommentMapper.delete(commentno) == 1;
	}




}
