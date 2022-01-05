package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.QuestionDto;
import com.ssafy.vue.model.QuestionParameterDto;

@Mapper
public interface QuestionMapper {
	
	public int writeQuestion(QuestionDto questionDto) throws SQLException;
	public List<QuestionDto> listQuestion(QuestionParameterDto questionParameterDto) throws SQLException;
	public int getTotalCount(QuestionParameterDto questionParameterDto) throws SQLException;
	public QuestionDto getQuestion(int qno) throws SQLException;
	public void updateHit(int qno) throws SQLException;
	public int modifyQuestion(QuestionDto questionDto) throws SQLException;
	public void deleteMemo(int qno) throws SQLException;
	public int deleteQuestion(int qno) throws SQLException;
	
}