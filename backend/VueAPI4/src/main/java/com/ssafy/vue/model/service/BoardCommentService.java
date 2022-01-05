package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.BoardCommentDto;

public interface BoardCommentService {

	List<BoardCommentDto> list(String articleno);

	boolean create(BoardCommentDto boardcommentDto);

	boolean modify(BoardCommentDto boardcommentDto);

	boolean delete(int commentno);
	
}
