package com.ssafy.vue.model.mapper;

import java.util.List;

import com.ssafy.vue.model.BoardCommentDto;

public interface BoardCommentMapper {

	List<BoardCommentDto> list(String articleno);

	int create(BoardCommentDto boardcommentDto);

	int modify(BoardCommentDto boardcommentDto);

	int delete(int commentno);
	
}
