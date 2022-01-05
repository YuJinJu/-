package com.ssafy.vue.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.vue.model.BoardCommentDto;
import com.ssafy.vue.model.service.BoardCommentService;

import io.swagger.annotations.ApiOperation;

//http://localhost:9999/vuews/swagger-ui.html
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/boardcomment")
public class BoardCommentRestController {

	private static final Logger logger = LoggerFactory.getLogger(BoardCommentRestController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	BoardCommentService boardcommentService;

	@ApiOperation(value = "articleno 에 해당하는 댓글 목록을 반환", response = List.class)
	@GetMapping("{articleno}")
	public ResponseEntity<List<BoardCommentDto>> listComment(@PathVariable("articleno") String articleno) {
		logger.debug("listComment - 호출");
		return new ResponseEntity<>(boardcommentService.list(articleno), HttpStatus.OK);
	}

	@ApiOperation(value = "새 댓글을 입력, success 또는 fail 반환", response = String.class)
	@PostMapping
	public ResponseEntity<String> createComment(@RequestBody BoardCommentDto boardcommentDto) {
		logger.debug("createComment - 호출");
		if(boardcommentService.create(boardcommentDto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "commentno 에 해당하는 댓글 수정, success 또는 fail 반환", response = String.class)
	@PutMapping
	public ResponseEntity<String> modifyComment(@RequestBody BoardCommentDto boardcommentDto) {
		logger.debug("modifyComment - 호출");
		logger.debug("" + boardcommentDto);
		System.out.println("댓글 수정하자!!!"  + boardcommentDto);
		if(boardcommentService.modify(boardcommentDto)) {
			System.out.println("댓글 수정 성공!!!");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "commentno 에 해당하는 댓글 삭제, success 또는 fail 반환", response = String.class)
	@DeleteMapping("{commentno}")
	public ResponseEntity<String> deleteComment(@PathVariable("commentno") int commentno) {
		logger.debug("deleteBook - 호출");
		if(boardcommentService.delete(commentno)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}
