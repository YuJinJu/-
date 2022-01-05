package com.ssafy.happyhouse.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.SecurityAlgorithm;
import com.ssafy.happyhouse.model.service.MemberService;

@Controller
@RequestMapping(path = "/user")
public class MemberController {

   private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
   SecurityAlgorithm sc = new SecurityAlgorithm();
   
   @Autowired
   private MemberService memberService;

   @GetMapping("/register")
   public String register() {
      return "user/join";
   }

   @GetMapping("/idcheck")
//   @ResponseBody
   public @ResponseBody ResponseEntity<Map<String, Integer>> idCheck(@RequestParam("ckid") String checkId) throws Exception {
      System.out.println("@GetMapping(\"/idcheck\")");
      int cnt = memberService.idCheck(checkId);
      Map<String, Integer> map = new HashMap<String, Integer>();
      map.put("idcount",cnt);
      return new ResponseEntity<Map<String, Integer>>(map,HttpStatus.OK);
   }

   @PostMapping("/register")
   public @ResponseBody ResponseEntity<Map<String, String>> register( MemberDto memberDto, Model model) throws Exception {
      System.out.println("@PostMapping(\"/register\")");
      logger.debug("memberDto info : {}", memberDto);
      memberDto.setUserPwd(sc.createHash(memberDto.getUserPwd()));
      System.out.println(memberDto.getUserPwd());
      memberService.registerMember(memberDto);
      Map<String, String> map = new HashMap<String, String>();
      map.put("url","/user/login");
      return new ResponseEntity<Map<String, String>>(map,HttpStatus.OK);
   }

   @GetMapping("/login")
   public String login() {
      return "user/login";
   }

   @PostMapping("/login")
   public @ResponseBody ResponseEntity<Map<String, String>> login(@RequestParam Map<String, String> map, Model model, HttpSession session,
                  HttpServletResponse response) throws Exception {
      logger.debug("map : {}", map.get("userId"));
      Map<String, String> cmap = new HashMap<String, String>();
      cmap.put("userPwd", sc.createHash(map.get("userPwd")));
      cmap.put("userId", map.get("userId"));
      MemberDto memberDto = memberService.login(cmap);
      //memberDto.setUserPwd(sc.createHash(map.get("userPwd")));
      //System.out.println("로그인 맵 : "+ cmap);
      //System.out.println("dd "+ map);
      if (memberDto != null) {
         session.setAttribute("userinfo", memberDto);

         Cookie cookie = new Cookie("ssafy_id", map.get("userId"));
         cookie.setPath("/");
         if ("saveok".equals(map.get("idsave"))) {
            cookie.setMaxAge(60 * 60 * 24 * 365 * 40);
         } else {
            cookie.setMaxAge(0);
         }
         response.addCookie(cookie);
         map.clear();
         map.put("url","/");
         return new ResponseEntity<Map<String, String>>(map,HttpStatus.OK);
      } else {
         model.addAttribute("msg", "아이디 또는 비밀번호 확인 후 다시 로그인하세요!");
         map.clear();
         map.put("url","/user/login");
         return new ResponseEntity<Map<String, String>>(map,HttpStatus.OK);
      }
   }

   @GetMapping("/logout")
   public String logout(HttpSession session) {
      session.invalidate();
      return "redirect:/";
   }

   @GetMapping("/list")
   public String list() {
      return "user/list";
   }

}