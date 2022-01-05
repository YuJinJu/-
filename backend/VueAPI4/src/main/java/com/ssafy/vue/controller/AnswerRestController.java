package com.ssafy.vue.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.vue.model.AnswerDto;
import com.ssafy.vue.model.service.AnswerService;

import io.swagger.annotations.ApiOperation;

//http://localhost:9999/vuews/swagger-ui.html
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/answer")
public class AnswerRestController {

	private static final Logger logger = LoggerFactory.getLogger(AnswerRestController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	AnswerService answerService;

	@ApiOperation(value = "qno에 해당하는 댓글 목록을 반환한다.", response = List.class)
	@GetMapping("{qno}")
	public ResponseEntity<List<AnswerDto>> listAnswer(@PathVariable("qno") String qno) {
		logger.debug("listAnswer - 호출");
		return new ResponseEntity<>(answerService.list(qno), HttpStatus.OK);
	}

	@ApiOperation(value = "새로운 댓글을 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PostMapping
	public ResponseEntity<String> createAnswer(@RequestBody AnswerDto answerDto) {
		logger.debug("createAnswer - 호출");
		if(answerService.create(answerDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "글번호가 answer_no에 해당하는 댓글을 수정한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@PutMapping
	public ResponseEntity<String> modifyAnswer(@RequestBody AnswerDto answerDto) {
		logger.debug("modifyAnswer - 호출");
		logger.debug("" + answerDto);
		System.out.println("댓글 수정하자!!!"  + answerDto);
		if(answerService.modify(answerDto)) {
			System.out.println("댓글 수정 성공!!!");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "글번호가 answer_no에 해당하는 댓글을 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("{answerNO}")
	public ResponseEntity<String> deleteBook(@PathVariable("answerNO") int answerNO) {
		logger.debug("deleteBook - 호출");
		if(answerService.delete(answerNO)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}
