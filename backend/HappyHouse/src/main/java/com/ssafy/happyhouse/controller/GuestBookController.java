package com.ssafy.happyhouse.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ssafy.happyhouse.model.GuestBookDto;
import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.GuestBookService;

//게스트북 처리용 controller
@Controller
@RequestMapping("/guestbook")
public class GuestBookController {

   private static final Logger logger = LoggerFactory.getLogger(GuestBookController.class);

   @Autowired
   private ServletContext servletContext;
   
   @Autowired
   private GuestBookService guestBookService;

   @GetMapping("/register")
   public String register() {
      return "guestbook/write";
   }

   @PostMapping("/register")
   public String register(GuestBookDto guestBookDto, Model model, HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
      MemberDto memberDto = (MemberDto) session.getAttribute("userinfo");
      //MemberDto memberDto = new MemberDto();
      guestBookDto.setUserId(memberDto.getUserId());
      guestBookService.registerArticle(guestBookDto);
      redirectAttributes.addFlashAttribute("msg", "글작성 성공!!!");
      return "redirect:/guestbook/list";
   }

   @GetMapping("/list")
   public ModelAndView list() throws Exception {
      ModelAndView mav = new ModelAndView();
      List<GuestBookDto> list = guestBookService.listArticle();
      mav.addObject("articles", list);
      mav.setViewName("guestbook/list");
      return mav;
   }

   @GetMapping("/modify")
   public ModelAndView modify(@RequestParam("articleno") int articleNo) throws Exception {
      ModelAndView mav = new ModelAndView();
      GuestBookDto guestBookDto = guestBookService.getArticle(articleNo);
      System.out.println(guestBookDto);
      mav.addObject("article", guestBookDto);
      mav.setViewName("guestbook/modify");
      return mav;
   }

   @PostMapping("/modify")
   public @ResponseBody ResponseEntity<Map<String, String>> modify(GuestBookDto guestBookDto, Model model, RedirectAttributes redirectAttributes)
         throws Exception {
      guestBookService.updateArticle(guestBookDto);
      Map<String, String> map = new HashMap<String, String>();
       map.put("url","/guestbook/list");
      System.out.println("ㅎㅇㅎㅇ");
      redirectAttributes.addFlashAttribute("msg", "글 수정 성공!!!");
      return new ResponseEntity<Map<String, String>>(map,HttpStatus.OK);
   }

   @GetMapping("/delete")
   public String delete(@RequestParam("articleno") int articleNo, Model model, RedirectAttributes redirectAttributes)
         throws Exception {
      guestBookService.deleteArticle(articleNo);
      redirectAttributes.addFlashAttribute("msg", "글 삭제 성공!!!");
      return "redirect:/guestbook/list";
   }
   
}