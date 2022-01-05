package com.ssafy.vue.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.AnswerDto;
import com.ssafy.vue.model.mapper.AnswerMapper;

@Service
public class AnswerServiceImpl implements AnswerService {

	@Autowired
	private AnswerMapper answerMapper;
	
	@Override
	public List<AnswerDto> list(String qno) {
		return answerMapper.list(qno);
	}

	@Override
	public boolean create(AnswerDto answerDto) {
		return answerMapper.create(answerDto) == 1;
	}

	@Override
	public boolean modify(AnswerDto answerDto) {
		return answerMapper.modify(answerDto) == 1;
	}

	@Override
	public boolean delete(int answerNo) {
		return answerMapper.delete(answerNo) == 1;
	}

}
